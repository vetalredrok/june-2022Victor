const router = require('express').Router();

const { userController } = require("../controller");
const mdlwr = require("../middleware/user.middleware");

router.get('/', userController.getAllUsers);
router.post('/', mdlwr.isNewUserValid, mdlwr.isBodyValidCreate, mdlwr.userNormalizator, mdlwr.checkIsEmailUnique, userController.createUser);

router.get('/:userId', mdlwr.isUserIdValid,  mdlwr.getUserDynamically('userId', 'params', '_id'), userController.getUserById);
router.put(
    '/:userId',
    mdlwr.isUserIdValid,
    mdlwr.isEditUserValid,
    mdlwr.isBodyValidUpdate,
    mdlwr.userNormalizator,
    mdlwr.getUserDynamically('userId', 'params', '_id'),
    userController.updateUser)
;
router.delete('/:userId', mdlwr.isUserIdValid, userController.deleteUserById);

module.exports = router;
