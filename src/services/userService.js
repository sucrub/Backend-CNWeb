const db = require("../models/index");
const bcrypt = require("bcrypt");

const userRating = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const rating = await db.rates.create({
        user_id: data.user_id,
        item_id: data.item_id,
        rate: data.rate,
        comment: data.comment,
        title: data.title,
      });

      // Calculate the average rating for the item
      const itemRatings = await db.rates.findAll({
        where: {
          item_id: data.item_id,
        },
        attributes: [
          [db.Sequelize.fn("AVG", db.Sequelize.col("rate")), "average_rating"],
        ],
        raw: true,
      });

      const averageRating = itemRatings[0].average_rating || 0;

      // Update the item's rate with the calculated average rating
      const item = await db.items.findByPk(data.item_id);
      item.rate = averageRating;
      await item.save();

      resolve(rating);
    } catch (error) {
      reject(error);
    }
  });
};

const changeAvatarUser = (id, filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { id: id },
      });
      user.avatar = filePath;
      await user.save();
      resolve("OK");
    } catch (error) {
      reject(error);
    }
  });
};

const createUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingSeller = await db.sellers.findOne({
        where: { username: data.username },
      });

      const existingUser = await db.users.findOne({
        where: { username: data.username },
      });

      if (existingSeller || existingUser) {
        throw new Error("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = await db.users.create({
        username: data.username,
        password: hashedPassword,
        name: data.name,
        phone_number: data.phone_number,
        avatar: "http://localhost:8080/uploads/baseavatar.png",
      });

      resolve(newUser);
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { username: data.username },
      });
      if (user) {
        if (data.name) user.name = data.name;
        if (data.phone_number) user.phone_number = data.phone_number;
        await user.save();
        let updatedUser = await db.users.findOne({
          where: { username: data.username },
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
        resolve(updatedUser);
      } else throw new Error("User did not existed");
    } catch (error) {
      reject(error);
    }
  });
};

const updatePasswordUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.users.findOne({
        where: { username: data.username },
      });

      if (user) {
        const passwordMatch = await bcrypt.compare(
          data.old_password,
          user.password
        );

        if (passwordMatch) {
          if (data.new_password === data.confirm_password) {
            const hashedPassword = await bcrypt.hash(data.new_password, 10);
            user.password = hashedPassword;
            await user.save();
            resolve("Change password successfully");
          } else {
            throw new Error("Passwords do not match");
          }
        } else {
          throw new Error("Incorrect old password");
        }
      } else {
        throw new Error("User does not exist");
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      users = await db.users.findAll({
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      user = await db.users.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

const getUserByUsername = (username) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      user = await db.users.findOne({
        where: {
          username: username,
        },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllUser,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  updatePasswordUser,
  changeAvatarUser,
  userRating,
};
