const jwt = require("jsonwebtoken");
const handleError = (errors) => {
  return errors.array()[0].msg;
};
const handleToken = (authorization) => {
  const token = authorization?.split(" ")[1] ?? false;
  const decoded = jwt.decode(token);
  return decoded?.isUser || false;
};

const isEnglish = (value , textError) =>{
  const onlyEnglish = new RegExp("^\\s*([0-9a-zA-Z]*)\\s*$");
  const isValue = onlyEnglish.test(value);
  if (!isValue) {
    return Promise.reject(textError);
  }
  return isValue;
}
exports.handleError = handleError;
exports.handleToken = handleToken;
exports.isEnglish = isEnglish
