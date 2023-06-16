const { getSubcategories } = require("../services/categoryService");
async function handleGetSubcategories(req, res){
  try {
    const id = req.params.category_id;
    const subcategories = await getSubcategories(id);
    res.status(200).json({
      message: "OK",
      data: subcategories,
    });
  } catch (err) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = {handleGetSubcategories};
