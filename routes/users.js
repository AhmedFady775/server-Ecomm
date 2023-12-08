const express = require("express");
const { authentication, authorization } = require("../middleware/auth.js");
const {
  getUser,
  getUsers,
  editUser,
  RemoveUser,
} = require("../controllers/user.js");

const router = express.Router();

router.get("/", authentication, authorization(["ADMIN"]), getUsers);
router.get("/:id", authentication, getUser);
router.put("/edit", authentication, editUser);
router.delete("/:id", authentication, RemoveUser);

module.exports = router;
