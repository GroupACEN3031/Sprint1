const router = require("express").Router();
const ProjectRoute = require("./Projects");
const UsersRoute = require("./Users");
const TeamsRoute = require("./Teams");
const BidsRoute = require("./Bid");


router.use("/projects", ProjectRoute);
router.use("/users", UsersRoute);
router.use("/teams", TeamsRoute);
router.use("/bids", BidsRoute);


module.exports = router;