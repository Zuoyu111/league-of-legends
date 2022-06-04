const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },       //英雄名
  avatar: { type: String },     //英雄头像
  background_img: { type: String },     //英雄详情背景图
  title: { type: String },       //英雄称号
  categories: [{ type: mongoose.Schema.Types.ObjectId,ref: 'Category' }], //英雄类型
  scores: {
    difficult: { type: Number },//操作难度评分
    skills: { type: Number },   //技能评分
    attack: { type: Number },  //攻击力评分
    survive: { type: Number }   //生存评分
  },
  skills: [{
    icon: { type: String },     //技能图标
    cdTime:{ type: String },    //技能冷却值
    cost: { type: String },
    name: { type: String },     //技能名
    desc: { type: String },     //技能描述
    tips: { type: String },     //技能小提示
  }],
  items1: [{ type: mongoose.Schema.Types.ObjectId,ref: 'Item' }], //顺风出装
  items2: [{ type: mongoose.Schema.Types.ObjectId,ref: 'Item' }], //逆风出装
  usageTips: { type: String },                                  //使用技巧
  battleTips: { type: String },                                 //对抗技巧            
  teamTips: { type: String },                                   //团战思路            
  partners: [{
      hero: { type: mongoose.Schema.Types.ObjectId,ref: 'Hero'},//最佳搭档    
      desc: { type: String }                                    //描述
  }]

});

module.exports = mongoose.model("Hero", schema,'heroes');
