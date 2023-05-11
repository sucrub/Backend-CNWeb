const { getAllItem } = require("../services/itemService");

const handleGetAllItem = async (req, res) => {
  try {
    const items = await getAllItem;
    res.status(200).json({
      message: "OK",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

module.exports = {
  handleGetAllItem,
};
