module.exports = app => {

  //引入mongoose 并进行配置
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/lol',{
    useNewUrlParser: true
  })

  // require('require-all')(__dirname + '/../models')
  require('require-all')(__dirname + '/../models')
}