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
};
