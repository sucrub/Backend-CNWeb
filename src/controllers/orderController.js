const {
  createOrder,
  getOrderById,
  getOrderByUserId,
} = require("../services/orderService");

const handleCreateOrder = async (req, res) => {
  try {
    const data = req.body;
    const order = await createOrder(data);
    res.status(200).json({
      message: "OK",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await getOrderById(id);
    res.status(200).json({
      message: "OK",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetOrderByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const result = await getOrderByUserId(user_id);
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
  handleCreateOrder,
  handleGetOrderById,
  handleGetOrderByUserId,
};
