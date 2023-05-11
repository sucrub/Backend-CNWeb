const db = require("../models/index");

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

const createItem = () => {};

module.exports = {
  getAllItem,
};
