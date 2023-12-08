const express = require("express");
const {
  getOrder,
  getOrders,
  addOrder,
  getMyOrders,
  summary,
} = require("../controllers/order.js");
const { authentication, authorization } = require("../middleware/auth.js");

const router = express.Router();

router.get("/summary", authentication, authorization(["ADMIN"]), summary);
router.get("/", authentication, authorization(["ADMIN"]), getOrders);
router.get("/mine", authentication, getMyOrders);
router.post("/create", authentication, addOrder);
router.get("/:id", authentication, getOrder);

module.exports = router;
