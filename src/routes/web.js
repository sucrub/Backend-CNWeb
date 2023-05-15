const express = require("express");
const router = express.Router();
const {
  handleGetAllUser,
  handleGetUserById,
  handleGetUserByUsername,
  handleCreateUser,
} = require("../controllers/userController");
const {
  handleCreateSeller,
  handleGetAllSeller,
  handleGetSellerById,
  handleGetSellerByNamePrefix,
} = require("../controllers/sellerController");
const {
  handleLogin,
  handleRequestRefreshToken,
} = require("../controllers/authController");
const {
  handleGetAllItem,
  handleGetItemBySellerId,
  handleCreateItem,
  handleUpdateItem,
  handleDeleteItem,
} = require("../controllers/itemController");

const initRouters = (app) => {
  router.get("/user/get-all-user", handleGetAllUser); // ok
  router.get("/user/get-user-by-id", handleGetUserById); // ok
  router.get("/user/get-user-by-username", handleGetUserByUsername); // ok
  router.post("/user/create-user", handleCreateUser); // ok
  router.post("/user/update-user");

  router.get("/seller/get-all-seller", handleGetAllSeller); // ok
  router.get("/seller/get-seller-by-id", handleGetSellerById); // ok
  router.get("/seller/get-seller-by-name-prefix", handleGetSellerByNamePrefix); // ok
  router.post("/seller/create-seller", handleCreateSeller); // ok
  router.post("/seller/update-seller");

  router.get("/item/get-all-item", handleGetAllItem); // ok
  router.get("/item/get-item-by-seller-id", handleGetItemBySellerId); // ok
  router.post("/item/create-item", handleCreateItem); // ok
  router.post("/item/update-item", handleUpdateItem); // ok
  router.delete("/item/delete-item", handleDeleteItem);
  router.get("/item/get-item-by-tag");

  router.post("/auth/login", handleLogin); // ok

  return app.use("/", router);
};

module.exports = initRouters;
