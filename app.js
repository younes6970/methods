const app = require("express")();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methods = require("./methods");
const PORT = 5000;
const URLS = ["/login/simple", "/login/pro"];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "*");
    return res.status(200).json();
  }
  next();
});

app.use((req, res, next) => {
  const {
    headers: { authorization },
    url,
  } = req;
  const isToken = methods.handleToken(authorization);
  if (URLS.includes(url)) {
    next();
  } else if (isToken) {
    next();
  } else {
    res.status(402).json({ msg: "کاربر فعال نیست" });
  }
});
app.use(require("./routes"));
app.use((req, res) => {
  res.status(404).json({ msg: "not found 404" });
});
app.use((error, req, res, next) => {
  if (res.headerSet) {
    return next(error);
  }
  res.status(error.code || 500).json({ msg: error.message || "Error" });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/methods", {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT);
    console.log("connection", PORT);
  })
  .catch((err) => {
    console.log("err is =>", err);
  });
