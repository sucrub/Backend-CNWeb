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

const updateSeller = (username, name, address, phone_number, description) => {
  return new Promise(async (resolve, reject) => {
    try {
      let seller = await db.sellers.findOne({
        where: { username: username },
      });
      if (seller) {
        if (name) seller.name = name;
        if (address) seller.address = address;
        if (phone_number) seller.phone_number = phone_number;
        if (description) seller.description = description;
        await seller.save();
        let updatedSeller = await db.sellers.findOne({
          where: { username: username },
          attributes: {
            exclude: ["password"],
          },
          raw: true,
        });
        resolve(updatedSeller);
      } else throw new Error("Seller did not existed");
    } catch (error) {
      reject(error);
    }
  });
};

const updatePasswordSeller = (
  username,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let seller = await db.sellers.findOne({
        where: { username: username },
      });
      if (seller) {
        if (seller.password === oldPassword) {
          if (newPassword === confirmPassword) {
            seller.password = newPassword;
            seller.save();
            resolve("Change successfully");
          } else throw new Error("Password did not match");
        } else throw new Error("Old password wrong");
      } else throw new Error("Seller did not exist");
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
  updateSeller,
  updatePasswordSeller,
};
