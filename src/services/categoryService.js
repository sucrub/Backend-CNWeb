const db = require("../models/index");

const getSubcategories = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let subcategories = await db.categories.findAll({
        attributes: ["id", "name"],
        where: { parent_id: id },
      });
      resolve(subcategories);
    } catch (error) {
      reject(error);
    }
  });
};
const getLeafCategories = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let leafCategories = await db.leaf_categories.findAll({
                attributes: ["leaf_category_id"],
                where: {category_id: id}
            });
            leafCategories = leafCategories.map(leafCategory => leafCategory.leaf_category_id);
            resolve(leafCategories);
        } catch (err) {
            reject(err);
        }
    });
}
module.exports = {getSubcategories, getLeafCategories};

