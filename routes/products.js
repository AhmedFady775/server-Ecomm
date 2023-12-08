const express = require("express");
const { authentication, authorization } = require("../middleware/auth.js");
const {
  addProduct,
  getProduct,
  removeProduct,
  editProduct,
  getProducts,
  getProductsPaged,
} = require("../controllers/products.js");

const router = express.Router();

router.get("/allproducts", getProducts);
router.get("/", getProductsPaged);
router.post("/create", addProduct);
router.get("/:id", getProduct);
router.delete("/:id", authentication, authorization(["ADMIN"]), removeProduct);
router.put("/:id", authentication, authorization(["ADMIN"]), editProduct);

module.exports = router;
