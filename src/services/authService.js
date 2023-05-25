const db = require("../models/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (username) => {
  return jwt.sign(
    {
      data: username,
    },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "3h" }
  );
};

const generateRefreshToken = (username) => {
  return jwt.sign(
    {
      data: username,
    },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "30d" }
  );
};

const verifyToken = (refreshToken) => {
  try {
    const data = jwt.verify(refreshToken, process.env.JWT_ACCESS_KEY);
    return data;
  } catch (err) {
    throw new Error("Token verification failed");
  }
};

const loginUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { username: data.username },
      });
      if (!user) throw new Error("User not existed");
      const isCorrectPassword = user.password === data.password;
      if (!isCorrectPassword) throw new Error("Wrong password");
      const dataUser = await db.users.findOne({
        where: { username: data.username },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      resolve(dataUser);
    } catch (error) {
      reject(error);
    }
  });
};

const login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let outputData = "";
      const user = await db.users.findOne({
        where: { username: data.username },
      });
      const seller = await db.sellers.findOne({
        where: { username: data.username },
      });
      if (user) {
        if (user.password === data.password) {
          const dataUser = await db.users.findOne({
            where: { username: data.username },
            attributes: {
              exclude: ["password"],
            },
            raw: true,
          });
          outputData = {
            dataUser,
            role: "user",
          };
          resolve(outputData);
        } else {
          throw new Error("Wrong username or password");
        }
      } else if (seller) {
        if (seller.password === data.password) {
          const dataSeller = await db.sellers.findOne({
            where: { username: data.username },
            attributes: {
              exclude: ["password"],
            },
            raw: true,
          });
          outputData = {
            dataSeller,
            role: "seller",
          };
          resolve(outputData);
        } else {
          throw new Error("Wrong username or password");
        }
      } else throw new Error("Wrong username or password");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  loginUser,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  login,
};
