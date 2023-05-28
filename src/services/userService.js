const db = require("../models/index");
const bcrypt = require("bcrypt");

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
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
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
        if (data.first_name) user.first_name = data.first_name;
        if (data.last_name) user.last_name = data.last_name;
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
        if (user.password === data.old_password) {
          if (data.new_password === data.confirm_password) {
            user.password = data.new_password;
            await user.save();
            resolve("Change password successfully");
          } else throw new Error("Password did not match");
        } else throw new Error("Old password did not correct");
      } else throw new Error("User did not exist");
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
};
