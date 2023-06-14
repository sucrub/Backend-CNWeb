const db = require("../models/index");

const createOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // create order
      let order = await db.orders.create({
        user_id: data.user_id,
        ship_address: data.ship_address,
        order_date: new Date().toLocaleString("en-US", {
          timeZone: "Asia/Ho_Chi_Minh",
        }),
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
          status: "pending",
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
      let items = await db.items.findAll({
        where: { seller_id: id },
      });

      let listItemspecific = [];
      let itemspecific = "";

      for (let item of items) {
        itemspecific = await db.itemspecific.findAll({
          where: { origin_id: item.id },
        });
        listItemspecific.push(...itemspecific.map((spec) => spec.dataValues));
      }

      let listOrderDetail = [];
      let orderdetail = "";

      for (let itemspec of listItemspecific) {
        orderdetail = await db.orderdetail.findAll({
          where: { item_id: itemspec.id },
        });

        for (let detail of orderdetail) {
          const orderDetailData = {
            item_id: detail.item_id,
            order_id: detail.order_id,
            quantity: detail.quantity,
            status: detail.status,
            itemspecific_name: itemspec.name, // Add the item-specific name to the result
          };
          listOrderDetail.push(orderDetailData);
        }
      }

      resolve(listOrderDetail);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createOrder,
  getOrderById,
  getOrderByUserId,
  getOrderyBySellerId,
};
