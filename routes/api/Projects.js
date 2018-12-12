const router = require("express").Router();
const ProjectsController = require("../../controllers/ProjectsController");

router.route("/")
  .get(ProjectsController.list)
  .put(ProjectsController.create)
  .delete(ProjectsController.delete);


router.route('/:id')
    .get(ProjectsController.getById);

router.route('/comments')
    .put(ProjectsController.addComment)
    .delete(ProjectsController.deleteComment);

router.route('/comments/:id')
    .get(ProjectsController.getCommentsByProjectID);


router.route('/files')
    .put(ProjectsController.addFile)
    .delete(ProjectsController.deleteFile);

router.route('/files/:id')
    .get(ProjectsController.getFilesByProjectID);

module.exports = router;
