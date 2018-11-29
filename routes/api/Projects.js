const router = require("express").Router();
const ProjectsController = require("../../controllers/ProjectsController");

router.route("/")
  .get(ProjectsController.list)
  .post(ProjectsController.create)
  .delete(ProjectsController.delete);


router.route('/:id')
    .get(ProjectsController.getById);

module.exports = router;
