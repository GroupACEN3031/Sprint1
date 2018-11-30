const router = require("express").Router();
const TeamsController = require("../../controllers/TeamsController");

router.route("/")
    .get(TeamsController.list)
    .put(TeamsController.create)
    .delete(TeamsController.delete)
    .post(TeamsController.update);


router.route('/:id')
    .get(TeamsController.getById);

module.exports = router;
