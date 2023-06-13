const {
  getCartByUserId,
  addCart,
  deleteCart,
} = require("../services/cartService");

const handleGetCart = async (req, res) => {
  try {
    const id = req.params;
    const cart = await getCartByUserId(id);
    res.status(200).json({
      message: "OK",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleAddCart = async (req, res) => {
  try {
    const data = req.body;
    const cart = await addCart(data);
    res.status(200).json({
      message: "OK",
      data: cart,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleDeleteCart = async (req, res) => {
  try {
    const data = req.body;
    const result = await deleteCart(data);
    res.status(200).json({
      message: "OK",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  handleGetCart,
  handleAddCart,
  handleDeleteCart,
};
