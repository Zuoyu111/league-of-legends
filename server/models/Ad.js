const mongoose = require("mongoose");

//广告位的schema
const schema = new mongoose.Schema({
  name: { type: String },   //广告位名称
  items: [{                 //广告
    image: { type: String },
    url: { type: String }
  }]

});

module.exports = mongoose.model("Ad", schema);
