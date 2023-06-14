const { getAllBrand, getBrandByName } = require("../services/brandService");

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

module.exports = {
  handleGetAllBrand,
  handleGetBrandByName,
};
