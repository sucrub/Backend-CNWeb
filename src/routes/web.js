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
} = require("../controllers/itemController");

const initRouters = (app) => {
  router.get("/user/get-all-user", handleGetAllUser); // ok
  router.get("/user/get-user-by-id", handleGetUserById); // ok
  router.get("/user/get-user-by-username", handleGetUserByUsername); // ok
  router.post("/user/create-user", handleCreateUser); // ok
  router.post("/user/update-user", handleUpdateUser); // ok
  router.post("/user/update-password", handleUpdateUserPassword); // ok

  router.get("/seller/get-all-seller", handleGetAllSeller); // ok
  router.get("/seller/get-seller-by-id", handleGetSellerById); // ok
  router.get("/seller/get-seller-by-name-prefix", handleGetSellerByNamePrefix); // ok
  router.post("/seller/create-seller", handleCreateSeller); // ok
  router.post("/seller/update-seller", handleUpdateSeller); // ok
  router.post("/seller/update-password", handleUpdatePasswordSeller); // ok

  router.get("/item/get-all-item", handleGetAllItem); // ok
  router.get("/item/get-item-by-seller-id", handleGetItemBySellerId); // ok
  router.get("/item/get-item-by-id", handleGetItemById); // ok
  router.post("/item/create-item", handleCreateItem); // ok
  router.post("/item/update-item", handleUpdateItem); // ok
  router.delete("/item/delete-item", handleDeleteItem); // ok
  router.get("/item/get-item-by-tag");

  //create items specific
  router.post("/item/create-item-specific", handleCreateItemSpecific); // ok
  router.get(
    "/item/get-item-specific-by-origin-id",
    handleGetItemSpecificByOriginId
  ); // ok
  //create order

  router.post("/auth/login-user", handleLoginUser);

  return app.use("/", router);
};

module.exports = initRouters;
