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
  createItemV2,
  itemImage,
  getItemByTagId,
  getItemByBrandId,
  getItemInRange,
  getItemFilter,
  getItemsByName,
  getRate,
  getItemByCategory,
  getItemRecommendations,
} = require("../services/itemService");

const handleGetRate = async (req, res) => {
  try {
    const id = req.params.item_id;
    const rates = await getRate(id);
    res.status(200).json({
      message: "OK",
      data: rates,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

const handleItemImage = async (req, res) => {
  try {
    const id = req.params.id;
    const images = req.files; // Array of uploaded image files
    const imagePath = [];
    for (let image of images) {
      let path = "http://localhost:8080/" + image.path;
      imagePath.push(path);
    }
    const result = await itemImage(id, imagePath);

    // Process the images as needed
    // For example, you can save the file paths in a database or perform other operations

    res.status(200).json({
      message: "OK",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

const handleCreateItemV2 = async (req, res) => {
  try {
    const data = req.body;
    const item = await createItemV2(data);
    res.status(200).json({
      message: "OK",
      data: item,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error",
    });
  }
};

const handleGetItemByCategory = async (req, res) => {
  try {
    const id = req.params.category_id;
    const items = await getItemByCategory(id);
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

const handleGetAllItem = async (req, res) => {
  try {
    const items = await getAllItem();
    res.status(200).json({
      message: "OK",
      data: items,
    });
  } catch (error) {
    console.log("Line 102 - error", error);
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

const handleGetItemByTagId = async (req, res) => {
  try {
    const id = req.params.id;
    const items = await getItemByTagId(id);
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

const handleGetItemByBrandId = async (req, res) => {
  try {
    const id = req.params.id;
    const items = await getItemByBrandId(id);
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

const handleGetItemInRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.body;
    const items = await getItemInRange(minPrice, maxPrice);
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

const handleGetItemFilter = async (req, res) => {
  try {
    const dataFilter = req.body;
    const items = await getItemFilter(dataFilter);
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

const handleSearchItems = async (req, res) => {
  try {
    const searchText = req.query.searchTerm; // Assuming the text is sent in the request body
    // Call a function to retrieve items by name matching the search text
    const items = await getItemsByName(searchText);

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
const handleGetItemRecommendation = async (req, res) => {
  try {
    const result = await getItemRecommendations();
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
  handleCreateItemV2,
  handleItemImage,
  handleGetItemByTagId,
  handleGetItemByBrandId,
  handleGetItemInRange,
  handleGetItemFilter,
  handleSearchItems,
  handleGetRate,
  handleGetItemByCategory,
  handleGetItemRecommendation,
};
