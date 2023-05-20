const {
  getAllItem,
  getItemBySellerId,
  createItem,
  updateItem,
  deleteItem,
  getItemById,
  createItemSpecific,
  getItemSpecificByOriginId,
  updateItemSpecific,
  deleteItemSpecific,
} = require("../services/itemService");

const handleGetAllItem = async (req, res) => {
  try {
    const items = await getAllItem();
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

const handleGetItemBySellerId = async (req, res) => {
  try {
    const id = req.params.seller_id;
    const items = await getItemBySellerId(id);
    res.status(200).json({
      message: "OK",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetItemById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await getItemById(id);
    res.status(200).json({
      message: "OK",
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleCreateItem = async (req, res) => {
  try {
    const data = req.body;
    const newItem = await createItem(data);
    res.status(200).json({
      message: "OK",
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleUpdateItem = async (req, res) => {
  try {
    const data = req.body;
    const updatedItem = await updateItem(data);
    res.status(200).json({
      message: "OK",
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleDeleteItem = async (req, res) => {
  try {
    const id = req.params.id;
    const reply = await deleteItem(id);
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

const handleCreateItemSpecific = async (req, res) => {
  try {
    const data = req.body;
    const newItemSpecific = await createItemSpecific(data);
    res.status(200).json({
      message: "OK",
      data: newItemSpecific,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetItemSpecificByOriginId = async (req, res) => {
  try {
    const id = req.params.origin_id;
    const items = await getItemSpecificByOriginId(id);
    res.status(200).json({
      message: "OK",
      data: items,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleUpdateItemSpecific = async (req, res) => {
  try {
    const data = req.body;
    const updatedItem = await updateItemSpecific(data);
    res.status(200).json({
      message: "OK",
      data: updatedItem,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleDeleteItemSpecific = async (req, res) => {
  try {
    const id = req.params.id;
    const reply = await deleteItemSpecific(id);
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

module.exports = {
  handleGetAllItem,
  handleGetItemBySellerId,
  handleCreateItem,
  handleUpdateItem,
  handleDeleteItem,
  handleGetItemById,
  handleCreateItemSpecific,
  handleGetItemSpecificByOriginId,
  handleUpdateItemSpecific,
  handleDeleteItemSpecific,
};
