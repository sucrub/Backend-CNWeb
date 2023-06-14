const {
  createSeller,
  getAllSeller,
  getSellerById,
  getSellerByNamePrefix,
  updateSeller,
  updatePasswordSeller,
  changeAvatarSeller,
  getSellerByName,
} = require("../services/sellerService");

const handleChangeAvatarSeller = async (req, res) => {
  try {
    const id = req.params.id;
    if (!req.file) throw new Error("No file");
    else {
      let filePath = "http://localhost:8080/" + req.file.path;
      filePath = filePath.replace(/\\/g, "/");
      await changeAvatarSeller(id, filePath);
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

const handleCreateSeller = async (req, res) => {
  try {
    const data = req.body;
    const newSeller = await createSeller(data);
    res.status(200).json({
      message: "OK",
      data: newSeller,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleUpdateSeller = async (req, res) => {
  try {
    const data = req.body;
    const updatedSeller = await updateSeller(data);
    res.status(200).json({
      message: "OK",
      data: updatedSeller,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleUpdatePasswordSeller = async (req, res) => {
  try {
    const data = req.body;
    const message = await updatePasswordSeller(data);
    res.status(200).json({
      message: "OK",
      data: message,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetAllSeller = async (req, res) => {
  try {
    const sellers = await getAllSeller();
    res.status(200).json({
      message: "OK",
      data: sellers,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetSellerById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const seller = await getSellerById(id);
      res.status(200).json({
        message: "OK",
        data: seller,
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

const handleGetSellerByName = async (req, res) => {
  try {
    const name = req.params.name;
    if (name) {
      const seller = await getSellerByName(name);
      res.status(200).json({
        message: "OK",
        data: seller,
      });
    } else {
      res.status(402).json({
        message: "Missing name",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

const handleGetSellerByNamePrefix = async (req, res) => {
  try {
    const prefix = req.params.prefix;
    if (prefix) {
      const sellers = await getSellerByNamePrefix(prefix);
      res.status(200).json({
        message: "OK",
        data: sellers,
      });
    } else {
      res.status(402).json({
        message: "No prefix",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  handleCreateSeller,
  handleGetAllSeller,
  handleGetSellerById,
  handleGetSellerByNamePrefix,
  handleUpdateSeller,
  handleUpdatePasswordSeller,
  handleChangeAvatarSeller,
  handleGetSellerByName,
};
