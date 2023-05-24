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
        order_date: new Date(
          currentTime.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        ),
        price: 0,
        status: "pending",
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

const getOrderByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = "";
      orders = await db.orders.findAll({
        where: { user_id: id },
      });
      let output = [];
      for (let order of orders) {
        let orderDetails = await db.orderdetail.findAll({
          where: { order_id: order.id },
        });
        let result = {
          order,
          orderDetails,
        };
        output.push(result);
      }
      resolve(output);
    } catch (error) {
      reject(error);
    }
  });
};

const getOrderyBySellerId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // tim items
      let items = await db.items.findAll({
        where: { seller_id: id },
      });
      // tim itemspecific
      let itemspecific = "";
      for (let item of items) {
        itemspecific = await db.itemspecific.findAll({
          where: { origin_id: item.id },
        });
      }
      // order itemspecific la 1 don hang rieng de duyet luon :v
      let orderdetail = "";
      for (let itemspec of itemspecific) {
        orderdetail = await db.orderdetail.findAll({
          where: { item_id: itemspec.id },
        });
      }
      resolve(orderdetail);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createOrder,
  getOrderById,
  getOrderByUserId,
};
