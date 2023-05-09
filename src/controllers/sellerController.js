const {
  createSeller,
  getAllSeller,
  getSellerById,
  getSellerByNamePrefix,
} = require("../services/sellerService");

const handleCreateSeller = async (req, res) => {
  try {
    const { username, password, name, address, phone_number } = req.body;
    const newSeller = await createSeller(
      username,
      password,
      name,
      address,
      phone_number
    );
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
    const id = req.query.id;
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

const handleGetSellerByNamePrefix = async (req, res) => {
  try {
    const prefix = req.query.prefix;
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
};
