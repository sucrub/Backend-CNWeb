const db = require("../models/index");

/*
{
    user_id
    ship_adress
    order_detail: [
        {
            item_id
            quantity
        }
    ]
}
*/

const createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // create order
      let order = await db.orders.create({
        user_id: data.user_id,
        ship_address: data.ship_address,
        order_date: new Date(),
        price: 0,
      });
      const orderId = order.id;
      let orderDetails = [];
      let sumPrice = 0;
      //create order detail
      for (let detail of data.order_detail) {
        let orderDetail = await db.orderdetail.create({
          order_id: orderId,
          item_id: detail.item_id,
          quantity: detail.quantity,
        });
        let item = await db.itemspecific.findOne({
          where: { id: detail.item_id },
        });
        sumPrice += item.price * detail.quantity;
        orderDetails.push(orderDetail);
      }
      let updateOrder = await db.orders.findOne({
        where: { id: orderId },
      });
      updateOrder.price = sumPrice;
      await updateOrder.save();
      //put price in order
      const result = {
        updateOrder,
        orderDetails,
      };
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const getOrderById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.orders.findOne({
        where: { id: id },
      });
      if (order) {
        const orderId = order.id;
        let order_detail = "";
        order_detail = await db.orderdetail.findAll({
          where: { order_id: orderId },
        });
        const result = {
          order,
          order_detail,
        };
        resolve(result);
      } else throw new Error("Order did not exist");
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createOrder,
  getOrderById,
};
