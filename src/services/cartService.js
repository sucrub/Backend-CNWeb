const db = require("../models/index");

const getCartByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cart = await db.carts.findAll({
        where: { user_id: id },
      });

      const populatedCart = await Promise.all(
        cart.map(async (item) => {
          const itemSpecific = await db.itemspecific.findOne({
            where: { id: item.item_id },
          });

          const originItem = await db.items.findOne({
            where: { id: itemSpecific.origin_id },
          });

          // Extracting the required properties from itemSpecific
          const { price, img, origin_id } = itemSpecific;
          const { name } = originItem;

          // Creating a new object with the required properties
          const populatedItem = {
            ...item.dataValues,
            name,
            price,
            img,
            origin_id,
          };

          return populatedItem;
        })
      );

      resolve(populatedCart);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteAllCart = (user_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.carts.destroy({
        where: { user_id: user_id },
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

const addCart = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const existingCart = await db.carts.findOne({
        where: {
          item_id: data.item_id,
          user_id: data.user_id,
        },
      });

      const item = await db.itemspecific.findOne({
        where: { id: data.item_id },
      });

      const originitem = await db.items.findOne({
        where: {
          id: item.origin_id,
        },
      });

      if (existingCart) {
        // If the item exists in the cart, update the quantity
        existingCart.quantity += data.quantity;
        await existingCart.save();
        const result = {
          item_id: data.item_id,
          user_id: data.user_id,
          quantity: existingCart.quantity,
          name: originitem.name,
          price: item.price,
          img: item.img,
          origin_id: item.origin_id,
        };
        resolve(result);
      } else {
        // If the item doesn't exist in the cart, create a new entry
        const cart = await db.carts.create({
          item_id: data.item_id,
          user_id: data.user_id,
          quantity: data.quantity,
        });
        const result = {
          item_id: data.item_id,
          user_id: data.user_id,
          quantity: cart.quantity,
          name: item.name,
          price: item.price,
          img: item.img,
        };
        resolve(result);
      }
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
  deleteAllCart,
};
