const express = require('express')

const app = express()

app.set('secret','tdawg')

app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))


//引入admin路由同时将app传入
require('./routes/admin')(app)
require('./plugins/db')(app)
require('./routes/web')(app)

app.listen(3000,() => {
  console.log('localhost:3000');
})