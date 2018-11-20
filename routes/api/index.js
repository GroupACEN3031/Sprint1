const router = require("express").Router();
const ProjectRoute = require("./Projects");
router.use("/projects", ProjectRoute);
module.exports = router;