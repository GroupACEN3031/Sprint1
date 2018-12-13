const router = require("express").Router();
const ProjectRoute = require("./Projects");
const UsersRoute = require("./Users");
const TeamsRoute = require("./Teams");
const BidsRoute = require("./Bid");
const FeaturesRoute = require("./Feature");
const EmailsRoute = require("./Email");


router.use("/projects", ProjectRoute);
router.use("/users", UsersRoute);
router.use("/teams", TeamsRoute);
router.use("/bids", BidsRoute);
router.use("/features", FeaturesRoute);
router.use("/emails", EmailsRoute);


module.exports = router;