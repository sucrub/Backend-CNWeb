const db = require("../models/index");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

const changeAvatarSeller = (id, filePath) => {
  return new Promise(async (resolve, reject) => {
    try {
      const seller = await db.sellers.findOne({
        where: { id: id },
      });
      seller.img_url = filePath;
      await seller.save();
      resolve("OK");
    } catch (error) {
      reject(error);
    }
  });
};

const createSeller = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingSeller = await db.sellers.findOne({
        where: { username: data.username },
      });
      const existingUser = await db.users.findOne({
        where: { username: data.username },
      });
      if (existingSeller || existingUser) {
        throw new Error("Username already exists");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newSeller = await db.sellers.create({
        username: data.username,
        password: hashedPassword,
        name: data.name,
        phone_number: data.phone_number,
        img_url: "http://localhost:8080/uploads/baseavatar.png",
        followers: 0,
        number_of_products: 0,
        description: "",
        money: 0,
        sell_amount: 0,
      });

      resolve(newSeller);
    } catch (error) {
      reject(error);
    }
  });
};

const updateSeller = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let seller = await db.sellers.findOne({
        where: { username: data.username },
      });
      if (seller) {
        if (data.name) seller.name = data.name;
        if (data.address) seller.address = data.address;
        if (data.phone_number) seller.phone_number = data.phone_number;
        if (data.description) seller.description = data.description;
        await seller.save();
        let updatedSeller = await db.sellers.findOne({
          where: { username: data.username },
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

const updatePasswordSeller = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let seller = await db.sellers.findOne({
        where: { username: data.username },
      });
      if (seller) {
        const passwordMatch = await bcrypt.compare(
          data.old_password,
          seller.password
        );
        if (passwordMatch) {
          if (data.new_password === data.confirm_password) {
            const hashedPassword = await bcrypt.hash(data.new_password, 10);
            seller.password = hashedPassword;
            await seller.save();
            resolve("Password changed successfully");
          } else {
            throw new Error("New passwords do not match");
          }
        } else {
          throw new Error("Incorrect old password");
        }
      } else {
        throw new Error("Seller does not exist");
      }
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
      let seller = await db.sellers.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });

      const itemCount = await db.items.count({
        where: {
          seller_id: seller.id,
        },
      });

      seller.number_of_products = itemCount;

      resolve(seller);
    } catch (error) {
      reject(error);
    }
  });
};

const getSellerByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let seller = "";
      seller = await db.sellers.findOne({
        where: {
          name: name,
        },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });

      const itemCount = await db.items.count({
        where: {
          seller_id: seller.id,
        },
      });

      seller.number_of_products = itemCount;

      resolve(seller);
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

const getSellerByCategory = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const items = await db.items.findAll({
        where: {
          category_id: id,
        },
        raw: true,
      });
      const sellerIDs = items.map((item) => item.seller_id);
      const uniquesellerIDs = [...new Set(sellerIDs)];
      const sellers = await db.sellers.findAll({
        where: {
          id: uniquesellerIDs,
        },
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
      const uniqueSeller = [...new Set(sellers)];
      resolve(uniqueSeller);
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
  changeAvatarSeller,
  getSellerByName,
  getSellerByCategory,
};
