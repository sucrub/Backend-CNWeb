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
var _brands = require("./brands");
var _branditem = require("./branditem");
var _carts = require("./carts");

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
  var branditem = _branditem(sequelize, DataTypes);
  var brands = _brands(sequelize, DataTypes);
  var carts = _carts(sequelize, DataTypes);

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
  items.belongsToMany(brands, {
    as: "brand_id_brands",
    through: branditem,
    foreignKey: "item_id",
    otherKey: "brand_id",
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
  brands.belongsToMany(items, {
    as: "item_id_items_branditems",
    through: branditem,
    foreignKey: "brand_id",
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
  orderdetail.belongsTo(itemspecific, {
    as: "itemspecifics",
    foreignKey: "item_id",
  });
  itemspecific.hasMany(orderdetail, {
    as: "orderdetails",
    foreignKey: "item_id",
  });
  carts.belongsTo(itemspecific, {
    as: "itemspecifics",
    foreignKey: "item_id",
  });
  itemspecific.hasMany(carts, {
    as: "carts",
    foreignKey: "item_id",
  });
  rates.belongsTo(itemspecific, { as: "itemspecifics", foreignKey: "item_id" });
  itemspecific.hasMany(rates, { as: "rates", foreignKey: "item_id" });
  tagitem.belongsTo(items, { as: "item", foreignKey: "item_id" });
  branditem.belongsTo(items, { as: "item", foreignKey: "item_id" });
  items.hasMany(tagitem, { as: "tagitems", foreignKey: "item_id" });
  items.hasMany(branditem, { as: "branditems", foreignKey: "item_id" });
  orderdetail.belongsTo(orders, { as: "order", foreignKey: "order_id" });
  orders.hasMany(orderdetail, { as: "orderdetails", foreignKey: "order_id" });
  carts.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(carts, { as: "carts", foreignKey: "user_id" });
  items.belongsTo(sellers, { as: "seller", foreignKey: "seller_id" });
  sellers.hasMany(items, { as: "items", foreignKey: "seller_id" });
  tagitem.belongsTo(tags, { as: "tag", foreignKey: "tag_id" });
  branditem.belongsTo(brands, { as: "brand", foreignKey: "brand_id" });
  tags.hasMany(tagitem, { as: "tagitems", foreignKey: "tag_id" });
  brands.hasMany(branditem, { as: "branditems", foreignKey: "brand_id" });
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
    branditem,
    brands,
    carts,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
