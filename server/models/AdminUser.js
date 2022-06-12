const mongoose = require("mongoose");

// 用户的schema
const schema = new mongoose.Schema({
  username: { type: String },   //用户名
  password: {                   //密码
    type: String,
    select: false,  //默认不查询出密码
    set(value) {
      //使用bcrypt进行密码加密 传入数字10 自动生成盐 加密强度为10
      return require('bcrypt').hashSync(value, 10)
    }
  }
});

module.exports = mongoose.model("AdminUser", schema);
