const db = require("../models/index");

const getCartByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = "";
      cart = await db.carts.findAll({
        where: { user_id: id },
      });
      resolve(cart);
    } catch (error) {
      reject(error);
    }
  });
};

const addCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await db.carts.create({
        item_id: data.item_id,
        user_id: data.user_id,
        quantity: data.quantity,
      });
      resolve(cart);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = await db.carts.destroy({
        where: {
          item_id: data.item_id,
          user_id: data.user_id,
        },
      });
      resolve("Success");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getCartByUserId,
  addCart,
  deleteCart,
};
