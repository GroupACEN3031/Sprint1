const router = require("express").Router();
const ProjectRoute = require("./Projects");
const UsersRoute = require("./Users");
const TeamsRoute = require("./Teams");


router.use("/projects", ProjectRoute);
router.use("/users", UsersRoute);
router.use("/teams", TeamsRoute);


module.exports = router;