const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userControllers");
const authController = require("../Controllers/authControllers");

router.get("/all", userController.getAll);
router.post("/create", userController.createUser);
router.post("/login", authController.login);
router.patch("/update/:id", userController.updateUserById);
router.delete("/delete/:id", userController.deleteUserById);

module.exports = router;