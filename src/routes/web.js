const express = require("express");
const router = express.Router();
const {
  handleGetAllUser,
  handleGetUserById,
  handleGetUserByUsername,
  handleCreateUser,
  handleUpdateUser,
  handleUpdateUserPassword,
} = require("../controllers/userController");
const {
  handleCreateSeller,
  handleGetAllSeller,
  handleGetSellerById,
  handleGetSellerByNamePrefix,
  handleUpdateSeller,
  handleUpdatePasswordSeller,
} = require("../controllers/sellerController");
const {
  handleRequestRefreshToken,
  handleLoginUser,
  handleRefreshToken,
} = require("../controllers/authController");
const {
  handleGetAllItem,
  handleGetItemBySellerId,
  handleCreateItem,
  handleUpdateItem,
  handleDeleteItem,
  handleGetItemById,
  handleCreateItemSpecific,
  handleGetItemSpecificByOriginId,
  handleUpdateItemSpecific,
  handleDeleteItemSpecific,
  handleCreateItemV2,
} = require("../controllers/itemController");
const {
  handleCreateOrder,
  handleGetOrderById,
  handleGetOrderByUserId,
  handleGetOrderBySellerId,
} = require("../controllers/orderController");

const initRouters = (app) => {
  router.get("/user/get-all-user", handleGetAllUser); // okok
  router.get("/user/get-user-by-id/:id", handleGetUserById); // okok
  router.get("/user/get-user-by-username/:username", handleGetUserByUsername); // okok
  router.post("/user/create-user", handleCreateUser); // okok
  router.post("/user/update-user", handleUpdateUser); // okok
  router.post("/user/update-password", handleUpdateUserPassword); // okok

  router.get("/seller/get-all-seller", handleGetAllSeller); // okok
  router.get("/seller/get-seller-by-id/:id", handleGetSellerById); // okok
  router.get(
    "/seller/get-seller-by-name-prefix/:prefix",
    handleGetSellerByNamePrefix
  ); // okok
  router.post("/seller/create-seller", handleCreateSeller); // okok
  router.post("/seller/update-seller", handleUpdateSeller); // okok
  router.post("/seller/update-password", handleUpdatePasswordSeller); // okok

  router.get("/item/get-all-item", handleGetAllItem); // okok
  router.get("/item/get-item-by-seller-id/:seller_id", handleGetItemBySellerId); // okok
  router.get("item/get-item-by-prefix/:prefix");
  router.get("/item/get-item-by-id/:id", handleGetItemById); // okok
  router.post("/item/create-item", handleCreateItem); // okok
  router.post("/item/update-item", handleUpdateItem); // okok
  router.delete("/item/delete-item/:id", handleDeleteItem); // okok
  router.get("/item/get-item-by-tag");

  //create items specific
  router.post("/item/create-item-specific", handleCreateItemSpecific); // okok
  router.get(
    "/item/get-item-specific-by-origin-id/:origin_id",
    handleGetItemSpecificByOriginId
  ); // okok
  router.post("/item/update-specific-item", handleUpdateItemSpecific); // okok
  router.delete("/item/delete-specific-item/:id", handleDeleteItemSpecific); // okok

  //update create item
  router.post("/item/create-item-v2", handleCreateItemV2); // ok

  //create order
  router.get("/order/get-order-by-id/:id", handleGetOrderById); // ok
  router.get("/order/get-order-by-user-id/:user_id", handleGetOrderByUserId); // ok
  router.post("/order/create-order", handleCreateOrder); // ok
  router.get(
    "/order/get-order-by-seller-id/:seller_id",
    handleGetOrderBySellerId
  ); // ok

  router.get("");
  router.post("/auth/login", handleLoginUser); // ok
  router.post("/auth/refresh-token", handleRefreshToken); // ok
  // quen mat khau

  return app.use("/", router);
};

module.exports = initRouters;
