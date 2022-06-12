const mongoose = require("mongoose");


//物品的schema
const schema = new mongoose.Schema({
  name: { type: String },   //名称
  icon: { type: String },   //图标
});

module.exports = mongoose.model("Item", schema);
