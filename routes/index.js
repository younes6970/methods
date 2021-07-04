const router = require("express").Router()
const login = require("./loginRoutes");
const list = require("./listRouter");

router.use("/v1/web/login", login);
router.use("/v1/web/list", list);

module.exports = router;
