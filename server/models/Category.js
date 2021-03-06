const mongoose = require("mongoose");

//分类的schema
const schema = new mongoose.Schema({
  name: { type: String },   //分类名
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },   //父级分类 类型是本身
});


//虚拟字段（virtual）
// ref => 关联的模型
// justOne: false 只查询一条数据
// localField: 内建，schema对应的模型
// justOne: false 只查询一条数据

//创建关联自己的子级分类字段
schema.virtual('children',{
  localField: '_id',
  foreignField: 'parent',
  justOne: false,
  ref: 'Category'
})


//创建关联自己的子级的关联新闻列表字段
schema.virtual('newsList',{
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

module.exports = mongoose.model("Category", schema);
