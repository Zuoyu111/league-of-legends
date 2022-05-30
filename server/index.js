const express = require('express')

const app = express()
app.use(require('cors')())
app.use(express.json())

//引入admin路由同时将app传入
require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000,() => {
  console.log('localhost:3000');
})