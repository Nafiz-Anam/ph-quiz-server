const router = require("express").Router();
const UserController = require("../../controller/userController");
const checkAdminToken = require("../../middleware/tokenManager/checkAdminToken");
const checkPermission = require("../../middleware/tokenManager/checkPermission");
const userValidation = require("../../middleware/validations/userValidation");

router.get("/", checkAdminToken, userValidation.list, UserController.list);
router.get(
    "/:userId",
    checkPermission,
    userValidation.details,
    UserController.details
);
router.put(
    "/:userId",
    checkPermission,
    userValidation.update,
    UserController.update
);
router.delete(
    "/:userId",
    checkAdminToken,
    userValidation.delete,
    UserController.delete
);
router.put(
    "/:userId/change-password",
    checkPermission,
    userValidation.changePassword,
    UserController.changePassword
);

module.exports = router;
