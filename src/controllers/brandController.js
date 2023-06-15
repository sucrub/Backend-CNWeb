const {
  getAllBrand,
  getBrandByName,
  getBrandByCategoryId,
  getAllCategory,
  getCategoryById,
} = require("../services/brandService");

const handleGetAllBrand = async (req, res) => {
  try {
    const brands = await getAllBrand();
    res.status(200).json({
      message: "OK",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetBrandByName = async (req, res) => {
  try {
    const { name } = req.body;
    const brand = await getBrandByName(name);
    res.status(200).json({
      message: "OK",
      data: brand,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetBrandByCategory = async (req, res) => {
  try {
    const id = req.params.category_id;
    const brands = await getBrandByCategoryId(id);
    res.status(200).json({
      message: "OK",
      data: brands,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetAllCategory = async (req, res) => {
  try {
    const categories = await getAllCategory();
    res.status(200).json({
      message: "OK",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const handleGetCategoryById = async (req, res) => {
  try {
    const id = req.params.category_id;
    const categories = await getCategoryById(id);
    res.status(200).json({
      message: "OK",
      data: categories,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  handleGetAllBrand,
  handleGetBrandByName,
  handleGetBrandByCategory,
  handleGetAllCategory,
  handleGetCategoryById,
};
