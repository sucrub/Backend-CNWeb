var DataTypes = require("sequelize").DataTypes;
var _items = require("./items");
var _itemspecific = require("./itemspecific");
var _orderdetail = require("./orderdetail");
var _orders = require("./orders");
var _rates = require("./rates");
var _sellers = require("./sellers");
var _sequelizemeta = require("./sequelizemeta");
var _tagitem = require("./tagitem");
var _tags = require("./tags");
var _users = require("./users");

function initModels(sequelize) {
  var items = _items(sequelize, DataTypes);
  var itemspecific = _itemspecific(sequelize, DataTypes);
  var orderdetail = _orderdetail(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var rates = _rates(sequelize, DataTypes);
  var sellers = _sellers(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var tagitem = _tagitem(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  items.belongsToMany(orders, {
    as: "order_id_orders",
    through: orderdetail,
    foreignKey: "item_id",
    otherKey: "order_id",
  });
  items.belongsToMany(tags, {
    as: "tag_id_tags",
    through: tagitem,
    foreignKey: "item_id",
    otherKey: "tag_id",
  });
  items.belongsToMany(users, {
    as: "user_id_users",
    through: rates,
    foreignKey: "item_id",
    otherKey: "user_id",
  });
  orders.belongsToMany(items, {
    as: "item_id_items",
    through: orderdetail,
    foreignKey: "order_id",
    otherKey: "item_id",
  });
  tags.belongsToMany(items, {
    as: "item_id_items_tagitems",
    through: tagitem,
    foreignKey: "tag_id",
    otherKey: "item_id",
  });
  users.belongsToMany(items, {
    as: "item_id_items_rates",
    through: rates,
    foreignKey: "user_id",
    otherKey: "item_id",
  });
  itemspecific.belongsTo(items, { as: "origin", foreignKey: "origin_id" });
  items.hasMany(itemspecific, { as: "itemspecifics", foreignKey: "origin_id" });
  orderdetail.belongsTo(items, { as: "item", foreignKey: "item_id" });
  items.hasMany(orderdetail, { as: "orderdetails", foreignKey: "item_id" });
  rates.belongsTo(itemspecific, { as: "itemspecifics", foreignKey: "item_id" });
  itemspecific.hasMany(rates, { as: "rates", foreignKey: "item_id" });
  tagitem.belongsTo(items, { as: "item", foreignKey: "item_id" });
  items.hasMany(tagitem, { as: "tagitems", foreignKey: "item_id" });
  orderdetail.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(orderdetail, { as: "orderdetails", foreignKey: "order_id" });
  items.belongsTo(sellers, { as: "seller", foreignKey: "seller_id" });
  sellers.hasMany(items, { as: "items", foreignKey: "seller_id" });
  tagitem.belongsTo(tags, { as: "tag", foreignKey: "tag_id" });
  tags.hasMany(tagitem, { as: "tagitems", foreignKey: "tag_id" });
  orders.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(orders, { as: "orders", foreignKey: "user_id" });
  rates.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(rates, { as: "rates", foreignKey: "user_id" });

  return {
    items,
    itemspecific,
    orderdetail,
    orders,
    rates,
    sellers,
    sequelizemeta,
    tagitem,
    tags,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
