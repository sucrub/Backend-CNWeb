require("dotenv").config();
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  login,
} = require("../services/authService");

const refreshTokenSecret = process.env.JWT_REFRESH_KEY;
let refreshTokens = [];

const handleLoginUser = async (req, res) => {
  try {
    const data = req.body;
    const loginData = await login(data);
    const accessToken = generateAccessToken(data.username);
    const refreshToken = generateRefreshToken(data.username);
    refreshTokens.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // Set it to true for secure HTTPS connection
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({
      message: "OK",
      data: loginData,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleRefreshToken = (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new Error("Refresh token not found");
    }

    if (!refreshTokens.includes(refreshToken)) {
      throw new Error("Invalid refresh token");
    }

    jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
      if (err) {
        throw new Error("Invalid refresh token");
      }

      const accessToken = generateAccessToken(user.username);
      res.status(200).json({
        accessToken,
      });
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  handleLoginUser,
  handleRefreshToken,
};
