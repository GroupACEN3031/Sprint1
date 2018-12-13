const router = require("express").Router();
const Email = require("../../controllers/EmailsController");

router.route("/")
    .put(Email.create);

module.exports = router;