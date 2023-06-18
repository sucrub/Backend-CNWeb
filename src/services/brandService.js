const db = require("../models/index");
const { Op } = require('sequelize');
const { getLeafCategories } = require("./categoryService")
const createBrand = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.brands.create({
        name: name,
      });
      resolve(brand);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllBrand = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const brands = await db.brands.findAll();
      // const brandNames = brands.map((brand) => brand.name);
      resolve(brands);
    } catch (error) {
      reject(error);
    }
  });
};

const getBrandByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const brand = await db.brands.findOne({
        where: { name: name },
      });
      resolve(brand);
    } catch (error) {
      reject(error);
    }
  });
};

const getBrandByCategoryId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await db.items.findAll({
        where: {
          category_id: id,
        },
        raw: true,
      });
      const itemIDs = items.map((item) => item.id);
      const brandItems = await db.branditem.findAll({
        where: {
          item_id: itemIDs,
        },
        raw: true,
      });
      const brandIDs = brandItems.map((brandItem) => brandItem.brand_id);
      const uniqueBrandIDs = [...new Set(brandIDs)];
      const brands = await db.brands.findAll({
        where: {
          id: uniqueBrandIDs,
        },
        raw: true,
      });
      const brandNames = brands.map((brand) => brand.name);
      const uniqueBrandNames = [...new Set(brandNames)];
      resolve(uniqueBrandNames);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await db.categories.findAll();
      resolve(categories);
    } catch (error) {
      reject(error);
    }
  });
};

const getCategoryById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const categories = await db.categories.findAll({
        where: { id: id },
      });
      resolve(categories);
    } catch (error) {
      reject(error);
    }
  });
};

const getBrandsByCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const leafCategories = await getLeafCategories(id);
      if (leafCategories.length === 0) {
        leafCategories.push(id);
      }
      const brandIds = await db.brand_category.findAll({
        attribute: ["brand_id"],
        where: { category_id: {[Op.in] : leafCategories }},
      });
      const brands = await db.brands.findAll({
        attribute: ["id", "name"],
        where: { id: {[Op.in] : brandIds.map(brandId => brandId.brand_id)}},
      });
      resolve(brands);
    } catch(error) {
      reject(error);
    }
  });
}
module.exports = {
  getAllBrand,
  getBrandByName,
  createBrand,
  getBrandByCategoryId,
  getBrandsByCategory,
  getAllCategory,
  getCategoryById,
};
