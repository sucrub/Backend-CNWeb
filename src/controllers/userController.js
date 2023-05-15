const {
  getAllUser,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
} = require("../services/userService");

const handleCreateUser = async (req, res) => {
  try {
    const { username, password, first_name, last_name, phone_number } =
      req.body;
    const newUser = await createUser(
      username,
      password,
      first_name,
      last_name,
      phone_number
    );
    res.status(200).json({
      message: "OK",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleUpdateUser = async (req, res) => {
  try {
    const { username, first_name, last_name, phone_number } = req.body;
    const updatedUser = await updateUser(
      username,
      first_name,
      last_name,
      phone_number
    );
    res.status(200).json({
      message: "OK",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetAllUser = async (req, res) => {
  try {
    const users = await getAllUser();
    res.status(200).json({
      message: "OK",
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

const handleGetUserById = async (req, res) => {
  try {
    const id = req.query.id;
    if (id) {
      const user = await getUserById(id);
      res.status(200).json({
        message: "OK",
        data: user,
      });
    } else {
      res.status(402).json({
        message: "Missing id",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

const handleGetUserByUsername = async (req, res) => {
  try {
    const username = req.query.username;
    if (username) {
      const user = await getUserByUsername(username);
      res.status(200).json({
        message: "OK",
        data: user,
      });
    } else {
      res.status(402).json({
        message: "Missing username",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

module.exports = {
  handleGetAllUser,
  handleGetUserById,
  handleGetUserByUsername,
  handleCreateUser,
  handleUpdateUser,
};
