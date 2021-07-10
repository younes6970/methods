const router = require("express").Router();
const { body } = require("express-validator");
const { isEnglish } = require("../methods");
const listControl = require("../controller/listControl");
const textError = "اطلاعات درست وارذ نشده است.";
const validatorList = [
  body("username")
    .not()
    .isEmpty()
    .trim()
    .withMessage(textError)
    .isLength({ min: 4, max: 15 })
    .withMessage(textError)
    .custom((value) => {
      return isEnglish(value, textError);
    }),
  body("name").not().isEmpty().trim().isLength({ max: 30 }),
  body("code")
    .trim()
    .isNumeric()
    .withMessage(textError)
    .isLength({ min: 4, max: 4 })
    .withMessage(textError),
  body("age")
    .trim()
    .isNumeric()
    .withMessage(textError)
    .isLength({ min: 2, max: 3 })
    .withMessage(textError),
];

router.get("/user", listControl.listUser);
router.get("/user/:id", listControl.listUserParams);
router.get("/", listControl.listQuery);
router.get("/:page", listControl.listParams);
router.post("/", ...validatorList, listControl.listPost);
router.put("/", ...validatorList, listControl.listPut);
router.delete("/", listControl.listDeleteData);
router.delete("/:id", listControl.listDeleteQuery);

module.exports = router;
