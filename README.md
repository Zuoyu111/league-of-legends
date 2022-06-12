# 全栈项目 
    Node.js + Vue.js 全栈开发王者荣耀手机端官网以及管理后台
本项目来自[bilibili全栈之颠](https://space.bilibili.com/341919508)的视频学习项目，干货满满，收获满满
### 一
    工具安装和环境搭建nodejs,npm,moogodb
### 二，管理后台
    1.基于Element UI的后台管理基础界面搭建
    2.分类管理
      a. 创建分类
      b. 修改分类
      c. 分类列表  
      d. 子分类
    3.通用CRUD接口 
      a. 动态获取接口地址并通过 inflection获取modele名并在请求对象上挂在Model属性
      b. 将请求资源封装成中间件  

```javascript
 //动态获取接口地址
 app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)

//获取资源的中间件
module.exports = (options) => {
  return async (req, res, next) => {
    //路由通过inflection得到model的名字 然后引入model资源
    const modelName = require("inflection").classify(req.params.resource);
    req.Model = require(`../models/${modelName}`);
    next();
  };
};
```
    4.装备管理(CURD)
    5.装备管理涉及文件上传(图片上传) => 使用(multer)实现图片上传
    6.英雄管理(CURD)
    7.技能编辑
    8.文章管理
    9.富文本编辑器(vue2-editor) 
      a.富文本将图片转成base64比较占用内存
      b.通过调用handleImageAdded实现富文本图片上传
    10.广告位管理(CURD)
    11.管理员账号管理(使用bcrypt进行加密)
    12.登录页面
    13.登录接口(jwt,jsonwebtoken)
    14.服务端登录验证
      a.用户是否存在
      b.密码是否正确
      c.密码正确返回token
    15.客户端路由限制,路由守卫(beforeEach,meta)
    16.文件上传的登录校验(el-upload,headers)

### 三，移动端网站
    1.使用SASS完成工具样式
    2.样式重置
    3.网站色彩和字体定义(colors,text)
    4.首页顶部轮播图(vue swiper)
    5.使用精灵图
    6.使用字体图片(阿里iconfont)
    7.封装卡片组件(card)
    8.封装列表卡片组件(cardList)
    9.首页新闻资讯-数据录入
    10.首页新闻资讯-数据接口
    11.首页新闻资讯-界面展示
    12.首页英雄列表-提取官网数据
    13.首页英雄列表-录入数据
    14.首页英雄列表-界面展示
    15.新闻详情页
    16.英雄详情页
    
