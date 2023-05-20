const db = require("../models/index");

const createItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newItem = await db.items.create({
        name: data.name,
        description: data.description,
        seller_id: data.seller_id,
        rate: 0,
        number_of_rating: 0,
      });
      resolve(newItem);
    } catch (error) {
      reject(error);
    }
  });
};

const updateItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const item = await db.items.findOne({
        where: { id: data.id },
      });
      if (item) {
        if (data.name) item.name = data.name;
        if (data.description) item.description = data.description;
        await item.save();
        let updatedItem = await db.items.findOne({
          where: { id: data.id },
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

const getItemById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.items.findOne({
        where: { id: id },
        raw: true,
      });
      resolve(item);
    } catch (error) {
      reject(error);
    }
  });
};

const createItemSpecific = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let originItem = await db.items.findOne({
        where: { id: data.origin_id },
      });
      if (originItem) {
        const newItemSpecific = db.itemspecific.create({
          origin_id: data.origin_id,
          name: data.name,
          price: data.price,
          number_sold: 0,
        });
        resolve(newItemSpecific);
      } else throw new Error("Origin item did not existed");
    } catch (error) {
      reject(error);
    }
  });
};

const getItemSpecificByOriginId = (origin_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let items = "";
      items = await db.itemspecific.findAll({
        where: { origin_id: origin_id },
      });
      resolve(items);
    } catch (error) {
      reject(error);
    }
  });
};

const updateItemSpecific = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = "";
      item = await db.itemspecific.findOne({
        where: { id: data.id },
      });
      if (item) {
        if (data.name) item.name = data.name;
        if (data.price) item.price = data.price;
        await item.save();
        let updatedItem = await db.itemspecific.findOne({
          where: { id: data.id },
        });
        resolve(updatedItem);
      } else throw new Error("Item did not existed");
    } catch (error) {
      reject(error);
    }
  });
};

const deleteItemSpecific = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let item = await db.itemspecific.findOne({
        where: { id: id },
      });
      if (item) {
        await db.itemspecific.destroy({
          where: { id: id },
        });
        resolve("Delete successfully");
      } else throw new Error("Item did not exist");
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
  getItemById,
  createItemSpecific,
  getItemSpecificByOriginId,
  updateItemSpecific,
  deleteItemSpecific,
};
