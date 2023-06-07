const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const {
  handleGetAllUser,
  handleGetUserById,
  handleGetUserByUsername,
  handleCreateUser,
  handleUpdateUser,
  handleUpdateUserPassword,
  handlePicture,
  handleChangeAvatarUser,
  handleUserRating,
} = require("../controllers/userController");
const {
  handleCreateSeller,
  handleGetAllSeller,
  handleGetSellerById,
  handleGetSellerByNamePrefix,
  handleUpdateSeller,
  handleUpdatePasswordSeller,
  handleChangeAvatarSeller,
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
  handleItemImage,
} = require("../controllers/itemController");
const {
  handleCreateOrder,
  handleGetOrderById,
  handleGetOrderByUserId,
  handleGetOrderBySellerId,
} = require("../controllers/orderController");
const {
  handleGetAllBrand,
  handleGetBrandByName,
} = require("../controllers/brandController");

// Set up the storage engine
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    const originalName = file.originalname;
    const extension = originalName.substring(originalName.lastIndexOf("."));
    const timestamp = Date.now();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const uniqueFilename =
      originalName.replace(extension, "") +
      "-" +
      timestamp +
      "-" +
      randomDigits +
      extension;
    cb(null, uniqueFilename);
  },
});

// Set up the multer middleware
const upload = multer({ storage });

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
  // tao bang brand
  router.get("/item/get-item-by-tag");
  //get brand by tag @@

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

  router.post("/auth/login", handleLoginUser); // ok
  router.post("/auth/refresh-token", handleRefreshToken); // ok
  // quen mat khau

  //brand
  router.get("/brand/get-all-brand", handleGetAllBrand);
  router.get("/brand/get-brand-by-name", handleGetBrandByName);
  //rate
  router.post("/rate/create-rating", handleUserRating); // ok

  router.post("/upload", upload.single("image"), handlePicture);
  router.post(
    "/user/change-avatar/:id",
    upload.single("image"),
    handleChangeAvatarUser
  ); // ok
  router.post(
    "/seller/change-avatar/:id",
    upload.single("image"),
    handleChangeAvatarSeller
  ); // ok
  router.post(
    "/item/item-picture/:id",
    upload.array("image", 100),
    handleItemImage
  ); // ok

  return app.use("/", router);
};

module.exports = initRouters;
