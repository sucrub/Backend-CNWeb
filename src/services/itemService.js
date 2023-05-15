const db = require("../models/index");

const createItem = (name, description, seller_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newItem = await db.items.create({
        name,
        description,
        seller_id,
        rate: 0,
        number_of_rating: 0,
      });
      resolve(newItem);
    } catch (error) {
      reject(error);
    }
  });
};

const updateItem = (id, name, description) => {
  return new Promise(async (resolve, reject) => {
    try {
      const item = await db.items.findOne({
        where: { id: id },
      });
      if (item) {
        if (name) item.name = name;
        if (description) item.description = description;
        await item.save();
        let updatedItem = await db.items.findOne({
          where: { id: id },
        });
        resolve(updatedItem);
      } else throw new Error("Item did not existed");
    } catch (error) {
      reject(error);
    }
  });
};

const deleteItem = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteItem = await db.items.findOne({
        where: { id: id },
      });
      if (deleteItem) {
        await db.items.destroy({
          where: { id: id },
        });
        resolve("Deleted successfully");
      } else throw new Error("Item did not existed");
    } catch (error) {
      reject(error);
    }
  });
};

const getAllItem = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = "";
      items = await db.items.findAll({
        raw: true,
      });
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
};

const getItemBySellerId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = "";
      items = await db.items.findAll({
        where: {
          seller_id: id,
        },
        raw: true,
      });
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllItem,
  getItemBySellerId,
  createItem,
  updateItem,
  deleteItem,
};
