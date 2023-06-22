const jwt = require("jsonwebtoken");
const db = require("../models/index");
require("dotenv").config();

const simppleMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    // Check if the user has an accessToken in the cookies
    const accessToken = req.cookies.accessToken;
    const username = req.body.username;
    const user_id = req.body.user_id;
    const data = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    if (username && username !== data.data) {
      throw new Error("Access token not found");
    }
    if (user_id) {
      const user = await db.users.findOne({
        where: { id: user_id },
      });
      if (user.username !== data.data) {
        throw new Error("Access token not found");
      }
    }
    // Perform additional authentication logic if needed
    // For example, verify the access token or decode its contents

    // If authentication is successful, proceed to the next middleware
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};

const authenticateSeller = async (req, res, next) => {
  try {
    // Check if the user has an accessToken in the cookies
    const accessToken = req.cookies.accessToken;
    const username = req.body.username;
    const seller_id = req.body.seller_id;
    const data = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY);
    if (!accessToken) {
      throw new Error("Access token not found");
    }
    if (username && username !== data.data) {
      throw new Error("Access token not found");
    }
    if (seller_id) {
      const seller = await db.sellers.findOne({
        where: { id: seller_id },
      });
      if (seller.username !== data.data) {
        throw new Error("Access token not found");
      }
    }
    // Perform additional authentication logic if needed
    // For example, verify the access token or decode its contents

    // If authentication is successful, proceed to the next middleware
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authentication failed",
    });
  }
};

module.exports = {
  authenticateUser,
  authenticateSeller,
  simppleMiddleware,
};
