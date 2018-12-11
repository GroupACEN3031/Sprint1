const router = require("express").Router();
const BidsController = require("../../controllers/BidsController");

router.route("/")
    .get(BidsController.list)
    .put(BidsController.create)
    .delete(BidsController.delete)
    .post(BidsController.update);


router.route('/:id')
    .get(BidsController.getById);


module.exports = router;