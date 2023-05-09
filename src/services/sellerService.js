const db = require("../models/index");
const { Op } = require("sequelize");

const createSeller = (username, password, name, address, phone_number) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingSeller = await db.sellers.findOne({
        where: { username: username },
      });
      if (existingSeller) {
        throw new Error("Seller existed");
      }
      const newSeller = await db.sellers.create({
        username,
        password,
        name,
        address,
        phone_number,
        img_url: "",
        followers: 0,
        number_of_products: 0,
        description: "",
      });
      resolve(newSeller);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllSeller = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let sellers = "";
      sellers = await db.sellers.findAll({
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      resolve(sellers);
    } catch (error) {
      reject(error);
    }
  });
};

const getSellerById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let seller = "";
      seller = await db.sellers.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      resolve(seller);
    } catch (error) {
      reject(error);
    }
  });
};

const getSellerByNamePrefix = (prefix) => {
  return new Promise(async (resolve, reject) => {
    try {
      let seller = "";
      seller = await db.sellers.findAll({
        where: {
          name: {
            [Op.like]: `${prefix}%`,
          },
        },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      resolve(seller);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createSeller,
  getAllSeller,
  getSellerById,
  getSellerByNamePrefix,
};
