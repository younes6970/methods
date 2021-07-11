const values = require("../data");
const { validationResult } = require("express-validator");
const { handleError } = require("../methods");
const listQuery = (req, res) => {
  const {
    query: { page: currentPage },
  } = req;
  const pages = Math.ceil(values.length / 10);
  const next = 10 * +currentPage;
  const pageNext = Math.ceil(values.length - next) > 0;
  const pagePrev = +currentPage > 1;
  const indexFirst = +currentPage === 1 ? 0 : next - 10;
  const value = values.slice(indexFirst, next);
  const data = {
    pagePrev,
    currentPage: +currentPage,
    pages,
    pageNext,
    data: value,
  };
  return res.status(200).json(data);
};
const listParams = (req, res) => {
  const {
    params: { page: currentPage },
  } = req;
  const pages = Math.ceil(values.length / 10);
  const next = 10 * +currentPage;
  const pageNext = Math.ceil(values.length - next) > 0;
  const pagePrev = +currentPage > 1;
  const indexFirst = +currentPage === 1 ? 0 : next - 10;
  const value = values.slice(indexFirst, next);
  const data = {
    pagePrev,
    currentPage: +currentPage,
    pages,
    pageNext,
    data: value,
  };
  return res.status(200).json(data);
};

const listUser = (req, res) => {
  const {
    query: { id },
  } = req;
  const data = values.find((value) => +value.id === +id);
  if (!!data) {
    return res.status(200).json(data);
  } else {
    const massage = "همچین کاربری وجود ندارذ.";
    const statusCode = 400;
    return res.status(400).json({ errors: { massage, statusCode } });
  }
};
const listUserParams = (req ,res) =>{
    const {
        params: { id },
    } = req;
    const data = values.find((value) => +value.id === +id);
    if (!!data) {
        return res.status(200).json(data);
    } else {
        const massage = "همچین کاربری وجود ندارذ.";
        const statusCode = 400;
        return res.status(400).json({ errors: { massage, statusCode } });
    }
}
const listPost = (req, res) => {
  const {
    body: { id, name },
  } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const massage = handleError(errors);
    const statusCode = 400;
    return res.status(statusCode).json({ errors: { massage, statusCode } });
  }
  if (!!id) {
    //upDate post
    return +id > 0 && +id <= 25
      ? res.status(200).json({
          data: { massage: ` ایتم مورد نظر با نام ${name} آپدیت شد ` },
          status: "success",
          http: "post",
        })
      : res.status(400).jsonp({
          errors: {
            massage: "کاربری با همچین ای دی یافت نشد.",
          },
          status: "error",
        });
  } else {
    //new post
    return +id === 0
      ? res.status(400).jsonp({
          errors: {
            massage: "کاربری با همچین ای دی یافت نشد.",
          },
          status: "error",
        })
      : res.status(201).json({
          data: { msg: ` ایتم جدبد با نام ${name} درست شد ` },
          status: "success",
        });
  }
};
const listPut = (req, res) => {
  const {
    body: { id, name },
  } = req;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const massage = handleError(errors);
    const statusCode = 400;
    return res.status(statusCode).json({ errors: { massage, statusCode } });
  }
  return +id > 0 && +id <= 25
    ? res.status(205).json({
        data: { massage: ` ایتم مورد نظر با نام ${name} آپدیت شد ` },
        status: "success",
        http: "put",
      })
    : res.status(400).jsonp({
        errors: {
          massage: "کاربری با همچین ای دی یافت نشد.",
        },
        status: "error",
      });
};
const listDeleteData = (req, res) => {
  const {
    body: { id },
  } = req;
  return +id > 0 && +id <= 25
    ? res.status(200).json({
        data: { massage: ` ایتم مورد نظر با ای دی${id} پاک شد ` },
        status: "success",
      })
    : res.status(400).jsonp({
        errors: {
          massage: "کاربری با همچین ای دی یافت نشد.",
        },
        status: "error",
      });
};
const listDeleteQuery = (req, res) => {
  const {
    params: { id },
  } = req;
  return +id > 0 && +id <= 25
    ? res.status(200).json({
        data: { massage: ` ایتم مورد نظر با ای دی ${id} پاک شد ` },
        status: "success",
      })
    : res.status(400).jsonp({
        errors: {
          massage: "کاربری با همچین ای دی یافت نشد.",
        },
        status: "error",
      });
};
exports.listQuery = listQuery;
exports.listParams = listParams;
exports.listPost = listPost;
exports.listPut = listPut;
exports.listDeleteData = listDeleteData;
exports.listDeleteQuery = listDeleteQuery;
exports.listUser = listUser;
exports.listUserParams = listUserParams
