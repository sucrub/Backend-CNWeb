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
  handleGetSellerByName,
  handleGetSellerByCategory,
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
  handleGetItemByTagId,
  handleGetItemByBrandId,
  handleGetItemInRange,
  handleGetItemFilter,
  handleSearchItems,
  handleGetRate,
  handleGetItemByCategory,
  handleGetItemRecommendation,
} = require("../controllers/itemController");
const {
  handleCreateOrder,
  handleGetOrderById,
  handleGetOrderByUserId,
  handleGetOrderBySellerId,
  handleChangeOrderStatus,
} = require("../controllers/orderController");
const {
  handleGetAllBrand,
  handleGetBrandByName,
  handleGetBrandByCategory,
  handleGetAllCategory,
  handleGetCategoryById,
  handleGetBrandsByCategory,
} = require("../controllers/brandController");
const {
  handleGetCart,
  handleAddCart,
  handleDeleteCart,
} = require("../controllers/cartController");
const { handleGetSubcategories } = require("../controllers/categoryController");
const {
  authenticateUser,
  authenticateSeller,
  simppleMiddleware,
} = require("../middlewares/auth");
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

const upload = multer({ storage });

const initRouters = (app) => {
  // AUTH
  router.post("/auth/login", handleLoginUser); // DONE
  router.post("/auth/refresh-token", handleRefreshToken); // DONE

  // RATE
  router.post("/rate/create-rating", authenticateUser, handleUserRating); // DONE
  router.get("/rate/get-rate/:item_id", handleGetRate); // DONE

  // USER
  router.post(
    "/user/change-avatar/:id",
    upload.single("image"),
    handleChangeAvatarUser
  ); // DONE
  router.get("/user/get-all-user", handleGetAllUser); // DONE
  router.get("/user/get-user-by-id/:id", handleGetUserById); // DONE
  router.get("/user/get-user-by-username/:username", handleGetUserByUsername); // DONE
  router.post("/user/create-user", handleCreateUser); // DONE
  router.post("/user/update-user", authenticateUser, handleUpdateUser); // DONE
  router.post(
    "/user/update-password",
    authenticateUser,
    handleUpdateUserPassword
  ); // DONE

  // SELLER
  router.get(
    "/seller/get-seller-by-category/:category_id",
    handleGetSellerByCategory
  ); // DONE
  router.get("/seller/get-all-seller", handleGetAllSeller); // DONE
  router.get("/seller/get-seller-by-id/:id", handleGetSellerById); // DONE
  router.get("/seller/get-seller-by-name/:name", handleGetSellerByName); // DONE
  router.get(
    "/seller/get-seller-by-name-prefix/:prefix",
    handleGetSellerByNamePrefix
  ); // DONE
  router.post("/seller/update-seller", authenticateSeller, handleUpdateSeller); // DONE
  router.post(
    "/seller/update-password",
    authenticateSeller,
    handleUpdatePasswordSeller
  ); // DONE
  router.post(
    "/seller/change-avatar/:id",
    upload.single("image"),
    handleChangeAvatarSeller
  ); // DONE

  // BRAND
  router.get(
    "/brand/get-brand-by-category/:category_id",
    handleGetBrandByCategory
  ); // DONE
  router.get("/brand/get-all-brand", handleGetAllBrand); //DONE
  router.get(
    "/brand/get-brands-by-category/:category_id",
    handleGetBrandsByCategory
  );

  // CATEGORY
  router.get("/category/get-all-category", handleGetAllCategory); // DONE
  router.get(
    "/category/get-category-by-id/:category_id",
    handleGetCategoryById
  );
  router.get(
    "/category/get-subcategories/:category_id",
    handleGetSubcategories
  );

  // ITEM
  router.get("/item/get-item-by-seller-id/:seller_id", handleGetItemBySellerId); // DONE
  router.get("/item/get-all-item", handleGetAllItem); // DONE
  router.get(
    "/item/get-item-by-category/:category_id",
    handleGetItemByCategory
  ); // DONE
  router.get("/item/get-item-filter", handleGetItemFilter); // DONE
  router.post("/item/create-item-v2", authenticateSeller, handleCreateItemV2); // DONE
  router.post(
    "/item/item-picture/:id",
    upload.array("image", 100),
    handleItemImage
  ); // DONE
  router.post(
    "/item/create-item-specific",
    simppleMiddleware,
    handleCreateItemSpecific
  ); // DONE
  router.get(
    "/item/get-item-specific-by-origin-id/:origin_id",
    handleGetItemSpecificByOriginId
  ); // DONE
  router.post(
    "/item/update-specific-item",
    simppleMiddleware,
    handleUpdateItemSpecific
  ); // DONE
  router.delete(
    "/item/delete-specific-item/:id",
    simppleMiddleware,
    handleDeleteItemSpecific
  ); // DONE
  router.get("/item/search-item", handleSearchItems); // DONE
  router.get("/item/get-item-by-id/:id", handleGetItemById); // DONE
  router.post("/item/update-item", simppleMiddleware, handleUpdateItem); // DONE
  router.get("/item/get-item-by-brand-id/:id", handleGetItemByBrandId); // DONE
  router.get("/item/get-item-in-range", handleGetItemInRange); // DONE
  router.delete("/item/delete-item/:id", simppleMiddleware, handleDeleteItem); // DONE
  router.get("/item/get-item-recommendation", handleGetItemRecommendation); // DONE
  router.get;
  //ORDER
  router.post("/order/create-order", authenticateUser, handleCreateOrder); // DONE
  router.get("/order/get-order-by-id/:id", handleGetOrderById); // DONE
  router.get("/order/get-order-by-user-id/:user_id", handleGetOrderByUserId); // DONE
  router.get(
    "/order/get-order-by-seller-id/:seller_id",
    handleGetOrderBySellerId
  ); // DONE
  router.post(
    "/order/change-status",
    simppleMiddleware,
    handleChangeOrderStatus
  ); // DONE

  //CART
  router.get("/cart/get-cart/:id", handleGetCart);
  router.post("/cart/add-cart", authenticateUser, handleAddCart);
  router.delete("/cart/delete-cart", authenticateUser, handleDeleteCart);

  ///////////////////////////////////////////////////////////////////////
  //TEST API, NO NEED TO USE
  router.post("/item/create-item", handleCreateItem); // okok
  router.get("/item/get-item-by-tag-id/:id", handleGetItemByTagId); // okok
  router.get("/brand/get-brand-by-name", handleGetBrandByName); // dont need to use
  router.post("/upload", upload.single("image"), handlePicture); // test api

  return app.use("/", router);
};

module.exports = initRouters;
