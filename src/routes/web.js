const express = require("express");
const router = express.Router();

const initRouters = (app) => {
  router.get("/", (req, res) => {
    res.send("Hello");
  });
  router.get("/user/get-all-user");
  router.get("user/get-user-by-id");

  router.get("seller/get-all/seller");
  router.get("seller/get-seller-by-id");

  router.get("item/get-all-item");
  return app.use("/", router);
};

module.exports = initRouters;
