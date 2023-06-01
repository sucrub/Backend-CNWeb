const {
  getAllUser,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  updatePasswordUser,
  changeAvatarUser,
} = require("../services/userService");

const handlePicture = async (req, res) => {
  try {
    console.log(req.file, req.file.path);
    if (!req.file) throw new Error("No file");
    else {
      const filePath = req.file.path;
      res.status(200).json({ path: filePath });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleChangeAvatarUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.file) throw new Error("No file");
    else {
      const filePath = req.file.path;
      await changeAvatarUser(id, filePath);
      res.status(200).json({
        message: "OK",
        data: filePath,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleCreateUser = async (req, res) => {
  try {
    const data = req.body;
    const newUser = await createUser(data);
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
    const data = req.body;
    const updatedUser = await updateUser(data);
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

const handleUpdateUserPassword = async (req, res) => {
  try {
    const data = req.body;
    const reply = await updatePasswordUser(data);
    res.status(200).json({
      message: "OK",
      data: reply,
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
    const id = req.params.id;
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
    const username = req.params.username;
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
  handleUpdateUserPassword,
  handlePicture,
  handleChangeAvatarUser,
};
