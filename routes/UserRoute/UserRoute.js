const router = require("express").Router();
const UserController = require("../../controller/userController");
const checkPermission = require("../../middleware/tokenmanager/checkPermission");

// Get a single user by ID
router.get("/details/:userId", checkPermission, UserController.details);

module.exports = router;
