const db = require("../models/index");

const getCartByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const cart = "";
      cart = await db.cart.findAll({
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
      const cart = await db.cart.create({
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
      const cart = await db.cart.destroy({
        item_id: data.item_id,
        user_id: data.user_id,
      });
      resolve(cart);
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
