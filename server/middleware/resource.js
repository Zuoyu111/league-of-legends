//获取资源的中间件
module.exports = (options) => {
  return async (req, res, next) => {
    //路由通过inflection得到model的名字 然后引入model资源
    const modelName = require("inflection").classify(req.params.resource);
    req.Model = require(`../models/${modelName}`);
    next();
  };
};
