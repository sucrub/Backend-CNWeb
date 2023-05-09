const {
  login,
  generateAccessToken,
  generateRefreshToken,
} = require("../services/authService");

let listRefreshTokens = [];

const handleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const loginData = await login(username, password);
    const accessToken = generateAccessToken(username);
    const refreshToken = generateRefreshToken(username);
    listRefreshTokens.push(refreshToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({
      message: "OK",
      data: loginData,
      accessToken,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  handleLogin,
};
