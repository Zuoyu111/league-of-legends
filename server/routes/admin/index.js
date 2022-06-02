
//返回一个函数 app传入直接可以调用
// const Category = require("../../models/Categroy");
module.exports = app => {
  const express = require('express')
  const AdminUser = require("../../models/AdminUser");
  const assert = require("http-assert");
  
  
  
  const router = express.Router({
    mergeParams: true  //合并路由参数
  })
  // const Category = require('../../models/Categroy')


  //创建资源
  router.post('/',async (req,res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })


  //修改资源
  router.put('/:id',async (req,res) => {
    // return res.send(req.body)

    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })


  // 删除资源
  router.delete('/:id',async (req,res) => {
    const model = await req.Model.findOneAndDelete(req.params.id,req.body)
    res.send({
      success: true
    })
  })





  // 资源列表
  router.get('/', async (req,res) => {
      const queryOptions = {}
    if(req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })



  
  // 资源详情
  router.get('/:id',async (req,res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })


    //登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')

  app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)


  const multer = require('multer')

  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload',upload.single('file'), async(req,res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login',async (req,res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select('+password')
    // if( !user ) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    assert(user, 422, '用户不存在')

    // 2.校验密码
    const isValid = require('bcrypt').compareSync(password,user.password)
    // if( !isValid ) {
    //   return res.status(422).send({
    //     message: '密码错误'
    //   })
    // }
    assert(isValid, 422, '密码错误')

    // 3.返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({id: user._id}, app.get('secret'))
    res.send({token})
  })

  //错误处理
  app.use(async(err, req, res, next) => {
    console.log(err.message)
    res.status(err.status).send({
      message: err.message
    })
   
  })

}