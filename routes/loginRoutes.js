const router = require("express").Router();
const { body } = require("express-validator");
const {isEnglish} = require("../methods")
const loginControl = require("../controller/loginControl");
const textError = "نام کاربری یا رمز عبور اشتباه است.";
const validatorSimple = [
  body("username").not().isEmpty().trim().withMessage(textError),
  body("password").not().isEmpty().trim().withMessage(textError),
];
const validatorPro = [
  body("username")
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 4, max: 14 })
    .withMessage(textError)
    .custom((value) => {
      return isEnglish(value , textError)
    }),
  body("password")
    .trim()
    .custom((value) => {
      const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/;
      const isPassword = pass.test(value);
      if (!isPassword) {
        return Promise.reject(textError);
      }
      return true;
    }),
];

router.post("/simple", ...validatorSimple, loginControl.simple);
router.post("/pro", ...validatorPro, loginControl.pro);

module.exports = router;
