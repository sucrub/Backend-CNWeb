const db = require("./models");
const sequelize = db.sequelize;
const bcrypt = require("bcrypt");

const user = [
  {
    username: "user1",
    password: "123456",
    name: "User",
    phone_number: "123456789",
  },
  {
    username: "user2",
    password: "123456",
    name: "User",
    phone_number: "123456789",
  },
  {
    username: "user3",
    password: "123456",
    name: "User",
    phone_number: "123456789",
  },
];

const seller = [
  {
    username: "seller1",
    password: "123456",
    name: "Shop 1",
    address: "Address 1",
    img_url: "",
    phone_number: "123456789",
    followers: 0,
    number_of_products: 0,
    description: "Description 1",
    money: 0,
    sell_amount: 0,
  },
  {
    username: "seller2",
    password: "123456",
    name: "Shop 2",
    address: "Address 2",
    img_url: "",
    phone_number: "123456789",
    followers: 0,
    number_of_products: 0,
    description: "Description 2",
    money: 0,
    sell_amount: 0,
  },
  {
    username: "seller3",
    password: "123456",
    name: "Shop 3",
    address: "Address 3",
    img_url: "",
    phone_number: "123456789",
    followers: 0,
    number_of_products: 0,
    description: "Description 3",
    money: 0,
    sell_amount: 0,
  },
];

const item = [
  {
    name: "Fan",
    description: "fan",
    seller_id: 1,
    rate: 0,
    number_of_rating: 0,
  },
  {
    name: "Tivi",
    description: "tivi",
    seller_id: 1,
    rate: 0,
    number_of_rating: 0,
  },
  {
    name: "Watch",
    description: "watch",
    seller_id: 1,
    rate: 0,
    number_of_rating: 0,
  },
];

const itemspecific = [
  {
    origin_id: 1,
    name: "Fan A",
    price: "10000",
  },
  {
    origin_id: 1,
    name: "Fan B",
    price: "20000",
  },
  {
    origin_id: 1,
    name: "Fan C",
    price: "30000",
  },
  {
    origin_id: 1,
    name: "Tivi A",
    price: "10000",
  },
  {
    origin_id: 1,
    name: "Tivi B",
    price: "20000",
  },
  {
    origin_id: 1,
    name: "Tivi C",
    price: "30000",
  },
  {
    origin_id: 1,
    name: "Watch A",
    price: "10000",
  },
  {
    origin_id: 1,
    name: "Watch B",
    price: "20000",
  },
  {
    origin_id: 1,
    name: "Watch C",
    price: "30000",
  },
];

const order = [
  {
    user_id: 1,
    price: 30000,
    ship_address: "Address 1",
  },
  {
    user_id: 2,
    price: 30000,
    ship_address: "Address 2",
  },
  {
    user_id: 3,
    price: 30000,
    ship_address: "Address 3",
  },
];

const order_detail = [
  {
    item_id: 1,
    order_id: 1,
    quantity: 1,
    status: "pending",
  },
  {
    item_id: 2,
    order_id: 1,
    quantity: 1,
    status: "pending",
  },
  {
    item_id: 1,
    order_id: 2,
    quantity: 1,
    status: "pending",
  },
  {
    item_id: 2,
    order_id: 2,
    quantity: 1,
    status: "pending",
  },
  {
    item_id: 1,
    order_id: 3,
    quantity: 1,
    status: "pending",
  },
  {
    item_id: 2,
    order_id: 3,
    quantity: 1,
    status: "pending",
  },
];

const tag = [
  {
    name: "Điện tử",
  },
  {
    name: "Thời trang",
  },
  {
    name: "Bếp",
  },
  {
    name: "Điện",
  },
  {
    name: "Gia dụng",
  },
  {
    name: "Gia đình",
  },
];

async function populate() {
  console.log(
    "Will rewrite the MySQL example database, adding some dummy data."
  );

  await sequelize.sync({ force: true });

  // Bulk create users with bcrypt-hashed passwords
  const hashedUsers = await Promise.all(
    user.map(async (userData) => {
      return {
        ...userData,
        password: await bcrypt.hash(userData.password, 10),
      };
    })
  );
  await sequelize.models.users.bulkCreate(hashedUsers);

  const hashSellers = await Promise.all(
    seller.map(async (sellerData) => {
      return {
        ...sellerData,
        password: await bcrypt.hash(sellerData.password, 10),
      };
    })
  );
  await sequelize.models.sellers.bulkCreate(hashSellers);

  await sequelize.models.items.bulkCreate(item);
  await sequelize.models.itemspecific.bulkCreate(itemspecific);
  await sequelize.models.orders.bulkCreate(order);
  await sequelize.models.orderdetail.bulkCreate(order_detail);
  await sequelize.models.tags.bulkCreate(tag);

  console.log("Dummy data population completed.");
}

populate().catch(console.error);
