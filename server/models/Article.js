const mongoose = require("mongoose");

//文章的schema
const schema = new mongoose.Schema({
  title: { type: String },  //文章标题
  categories: [{ type: mongoose.Schema.Types.ObjectId,ref: 'Category'}],   //文章的上级分类 类型是Category
  body: { type: String }    //文章内容
},{
  timestamps: true        //加上创建时间字段
});

module.exports = mongoose.model("Article", schema);
