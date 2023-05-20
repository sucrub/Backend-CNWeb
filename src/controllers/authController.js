const {
  loginUser,
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} = require("../services/authService");

let listRefreshTokens = [];

const handleLoginUser = async (req, res) => {
  try {
    const data = req.body;
    const loginData = await loginUser(data);
    const accessToken = generateAccessToken(data.username);
    const refreshToken = generateRefreshToken(data.username);
    listRefreshTokens.push(refreshToken);
    console.log(listRefreshTokens);
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

const handleRequestRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    res.status(401).json({ message: "Not authenticated" });
  }

  if (!listRefreshTokens.includes(refreshToken)) {
    return res.status(403).json("Token invalid");
  }

  try {
    const data = verifyToken(refreshToken);
    listRefreshTokens = listRefreshTokens.filter(
      (token) => token !== refreshToken
    );
    const user = data.user;
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    listRefreshTokens.push(newRefreshToken);
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    return res.status(500).json({ message: "Error refreshing tokens" });
  }
};

const handleLogout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    listRefreshTokens = listRefreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json({
      message: "Log out",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  handleLoginUser,
  handleLogout,
  handleRequestRefreshToken,
};
