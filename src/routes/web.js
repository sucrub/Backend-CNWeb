const express = require("express");
const router = express.Router();
const {
  handleGetAllUser,
  handleGetUserById,
  handleGetUserByUsername,
  handleCreateUser,
} = require("../controllers/userController");

const initRouters = (app) => {
  router.get("/user/get-all-user", handleGetAllUser); // ok
  router.get("/user/get-user-by-id", handleGetUserById); // ok
  router.get("/user/get-user-by-username", handleGetUserByUsername); // ok
  router.post("/user/create-user", handleCreateUser); // ok

  router.get("/seller/get-all/seller");
  router.get("/seller/get-seller-by-id");

  router.get("item/get-all-item");

  return app.use("/", router);
};

module.exports = initRouters;
