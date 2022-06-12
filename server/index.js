const express = require('express')

const app = express()

app.set('secret','tdawg')

//引入cors处理跨域问题
app.use(require('cors')())

//从流中读取主体并转化为json
app.use(express.json())

//开放/uploads目录
app.use('/uploads',express.static(__dirname + '/uploads'))


//引入admin路由同时将app传入
require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/web')(app)

app.listen(3000,() => {
  console.log('localhost:3000');
})