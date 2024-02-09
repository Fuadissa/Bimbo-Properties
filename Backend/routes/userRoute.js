const express = require("express");
const {
  adminLogin,
  admin,
  adminRegister,
} = require("../controllers/userController");
const authenticateUser = require("../utils/authenticateUser");

const router = express.Router();

router.post("/register", adminRegister);
// router.delete("/deleteuser", deleteBlog);
router.post("/login", adminLogin);
router.get("/adminPanel", authenticateUser, admin);

module.exports = router;
