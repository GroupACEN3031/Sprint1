const router = require("express").Router();
const UsersController = require("../../controllers/UsersController");

router.route("/")
    .get(UsersController.list)
    .put(UsersController.create)
    .delete(UsersController.delete)
    .post(UsersController.update);

router.route('/:id')
    .get(UsersController.getById);

module.exports = router;