const db = require("../models/index");

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

module.exports = {
  getAllBrand,
  getBrandByName,
  createBrand,
};
