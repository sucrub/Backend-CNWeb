var DataTypes = require("sequelize").DataTypes;
var _item-picture = require("./item-picture");
var _item-specific = require("./item-specific");
var _items = require("./items");
var _order-detail = require("./order-detail");
var _orders = require("./orders");
var _rates = require("./rates");
var _sellers = require("./sellers");
var _sequelizemeta = require("./sequelizemeta");
var _tag-item = require("./tag-item");
var _tags = require("./tags");
var _users = require("./users");

function initModels(sequelize) {
  var item-picture = _item-picture(sequelize, DataTypes);
  var item-specific = _item-specific(sequelize, DataTypes);
  var items = _items(sequelize, DataTypes);
  var order-detail = _order-detail(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var rates = _rates(sequelize, DataTypes);
  var sellers = _sellers(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var tag-item = _tag-item(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  items.belongsToMany(orders, { as: 'order_id_orders', through: order-detail, foreignKey: "item_id", otherKey: "order_id" });
  items.belongsToMany(tags, { as: 'tag_id_tags', through: tag-item, foreignKey: "item_id", otherKey: "tag_id" });
  items.belongsToMany(users, { as: 'user_id_users', through: rates, foreignKey: "item_id", otherKey: "user_id" });
  orders.belongsToMany(items, { as: 'item_id_items', through: order-detail, foreignKey: "order_id", otherKey: "item_id" });
  tags.belongsToMany(items, { as: 'item_id_items_tag-items', through: tag-item, foreignKey: "tag_id", otherKey: "item_id" });
  users.belongsToMany(items, { as: 'item_id_items_rates', through: rates, foreignKey: "user_id", otherKey: "item_id" });
  item-picture.belongsTo(item-specific, { as: "item_specific", foreignKey: "item_specific_id"});
  item-specific.hasMany(item-picture, { as: "item-pictures", foreignKey: "item_specific_id"});
  item-specific.belongsTo(items, { as: "origin", foreignKey: "origin_id"});
  items.hasMany(item-specific, { as: "item-specifics", foreignKey: "origin_id"});
  order-detail.belongsTo(items, { as: "item", foreignKey: "item_id"});
  items.hasMany(order-detail, { as: "order-details", foreignKey: "item_id"});
  rates.belongsTo(items, { as: "item", foreignKey: "item_id"});
  items.hasMany(rates, { as: "rates", foreignKey: "item_id"});
  tag-item.belongsTo(items, { as: "item", foreignKey: "item_id"});
  items.hasMany(tag-item, { as: "tag-items", foreignKey: "item_id"});
  order-detail.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order-detail, { as: "order-details", foreignKey: "order_id"});
  items.belongsTo(sellers, { as: "seller", foreignKey: "seller_id"});
  sellers.hasMany(items, { as: "items", foreignKey: "seller_id"});
  tag-item.belongsTo(tags, { as: "tag", foreignKey: "tag_id"});
  tags.hasMany(tag-item, { as: "tag-items", foreignKey: "tag_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  rates.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(rates, { as: "rates", foreignKey: "user_id"});

  return {
    item-picture,
    item-specific,
    items,
    order-detail,
    orders,
    rates,
    sellers,
    sequelizemeta,
    tag-item,
    tags,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
