const router = require("express").Router();
const TeamsController = require("../../controllers/TeamsController");

router.route("/")
    .get(TeamsController.list)
    .put(TeamsController.create)
    .delete(TeamsController.delete)
    .post(TeamsController.update);

module.exports = router;
