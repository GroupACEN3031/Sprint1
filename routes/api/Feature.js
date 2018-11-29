const router = require("express").Router();
const Features = require("../../controllers/FeaturesController");

router.route("/")
    .get(Features.list)
    .put(Features.create)
    .post(Features.update)
    .delete(Features.delete);

router.route('/:id')
    .get(Features.getById);

router.route('/project/:id')
    .get(Features.getByProjectID);

module.exports = router;