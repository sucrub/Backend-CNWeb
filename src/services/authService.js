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

const loginUser = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.users.findOne({
        where: { username: username },
      });
      if (!user) throw new Error("User not existed");
      const isCorrectPassword = user.password === password;
      if (!isCorrectPassword) throw new Error("Wrong password");
      const data = await db.users.findOne({
        where: { username: username },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      resolve(data);
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
};
