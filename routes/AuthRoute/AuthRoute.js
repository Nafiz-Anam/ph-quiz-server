const router = require("express").Router();
const authController = require("../../controller/authController");
const authValidation = require("../../middleware/validations/authValidation");

// auth routes
router.post("/register", authValidation.register, authController.registration);

router.post("/login", authValidation.login, authController.login);

module.exports = router;
