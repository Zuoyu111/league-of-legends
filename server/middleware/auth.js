module.exports = (options) => {
  const assert = require("http-assert");
  const AdminUser = require("../models/AdminUser");
  const jwt = require("jsonwebtoken")

  return async (req, res, next) => {
    const token = String(req.headers.authorization || "")
      .split(" ")
      .pop();
    console.log(token,444)
    assert(token, 401, "请先登录");
    const { id } = jwt.verify(token, req.app.get("secret"));
    assert(id, 401, "请先登录");
    req.user = await AdminUser.findById(id);
    assert(req.user, 401, "请先登录");
    console.log(req.user);

    await next();
  };
};
