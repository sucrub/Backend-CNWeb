const db = require("../models/index");

const createUser = (
  username,
  password,
  first_name,
  last_name,
  phone_number
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingUser = await db.users.findOne({
        where: { username: username },
      });
      if (existingUser) {
        throw new Error("User existed");
      }
      const newUser = await db.users.create({
        username,
        password,
        first_name,
        last_name,
        phone_number,
      });
      resolve(newUser);
    } catch (error) {
      reject(error);
    }
  });
};

const updateUser = (username, first_name, last_name, phone_number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { username: username },
      });
      if (user) {
        if (first_name) user.first_name = first_name;
        if (last_name) user.last_name = last_name;
        if (phone_number) user.phone_number = phone_number;
        await user.save();
        let updatedUser = await db.users.findOne({
          where: { username: username },
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
    const user = await db.users.findOne({
      where: { username: username },
    });
  });
};

const updatePasswordUser = (
  username,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.users.findOne({
        where: { username: username },
      });
      if (user) {
        if (user.password === oldPassword) {
          if (newPassword === confirmPassword) {
            user.password = newPassword;
            user.save();
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
