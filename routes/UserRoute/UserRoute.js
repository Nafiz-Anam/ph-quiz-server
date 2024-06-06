const router = require("express").Router();
const UserController = require("../../controller/userController");
const checkAdminToken = require("../../middleware/tokenManager/checkAdminToken");
const checkPermission = require("../../middleware/tokenManager/checkPermission");

// Get a single user by ID
router.get("/", checkAdminToken, UserController.list);
router.get("/:userId", checkPermission, UserController.details);
router.put("/:userId", checkPermission, UserController.update);
router.delete("/:userId", checkAdminToken, UserController.delete);
router.put(
    "/:userId/change-password",
    checkPermission,
    UserController.changePassword
);

module.exports = router;
