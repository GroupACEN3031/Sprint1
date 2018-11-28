const router = require("express").Router();
const ProjectRoute = require("./Projects");
const UsersRoute = require("./Users");

router.use("/projects", ProjectRoute);
router.use("/users", UsersRoute);


module.exports = router;