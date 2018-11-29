const router = require("express").Router();
const BidsController = require("../../controllers/BidsController");

router.route("/")
    .get(BidsController.list)
    .put(BidsController.create)
    .delete(BidsController.delete)
;

module.exports = router;