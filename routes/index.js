const router = require("express").Router()
const login = require("./loginRoutes");
const list = require("./listRouter");

router.use("/login", login);
router.use("/list", list);

module.exports = router;
