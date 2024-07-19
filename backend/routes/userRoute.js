const express = require("express");
const {
  registerConroller,
  loginConroller,
  logoutConroller,
  otherusersConroller,
} = require("../controller/userController");
const Protected = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/register", registerConroller);
router.post("/login", loginConroller);
router.get("/logout", logoutConroller);
router.get("/otheruser", Protected, otherusersConroller);

module.exports = router;
