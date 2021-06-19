const { handleError } = require("../methods");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const simple = (req, res) => {
  const {
    body: { username },
  } = req;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const massage = handleError(errors);
    const statusCode = 400;
    return res
      .status(statusCode)
      .json({ errors: { massage }, status: "error" });
  }
  res
    .status(200)
    .json({ data: { message: `${username}تبریک به شما ` }, status: "success" });
};
const pro = (req, res) => {
  const {
    body: { username },
  } = req;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const massage = handleError(errors);
    const statusCode = 400;
    return res
      .status(statusCode)
      .json({ errors: { massage }, status: "error" });
  }
  const token = jwt.sign({ username, isUser: true, id: "you6970" }, "secret");
  res.status(200).json({ data: { token }, status: "success" });
};
exports.pro = pro;
exports.simple = simple;
