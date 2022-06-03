module.exports = app => {
  const router = require('express').Router()

  //引用模型
  //方法一：
  // const Article = require('../../models/Article')
  //方法二
  const mongoose = require('mongoose')
  const Article = mongoose.model('Article')
  const Category = mongoose.model('Category')

  router.get('/news/init',async(req,res) => {
    const parent = await Category.findOne().where({
      name: '资讯分类'
    })


    const cats = await Category.find().where({
      parent: parent
    }).lean()  //获取纯json
    const newsTitles = ['蔡小姬探班手记|所有等待，终将重逢——时之恋人星元皮肤海报设计故事', '三街工作室|共创装备即将上线体验服！', '宫本武藏英雄品质升级对应的皮肤调整进展【老亚瑟的答疑时间】', '【项羽-职棒王牌】局外展示场景方案票选结果公布', '项羽职棒王牌&amp;赵云嘻哈天王皮肤优化计划及进展【老亚瑟的答疑时间】', '6月1日全服不停机更新公告', '6月1日战令返场礼包异常说明', '5月31日体验服停机更新公告', '5月30日体验服停机更新公告', '5月27日体验服停机更新公告', '鸿运抽奖，抽六次送一次活动开启公告', '【项羽-职棒王牌】局外展示场景方案票选结果公布', '夏日好礼派送！SNK英雄、皮肤等你签收！', '【项羽-职棒王牌】局外展示场景方案票选活动开启', '【QQ福利】活动页面购买520皮肤抽Q币免单活动', '第八届王者荣耀高校联赛落下战幕！四川托普信息技术职业学院夺得总冠军', '女子公开赛北京分站赛落下帷幕，恭喜NOVA勇夺固定战队区冠军', '电竞舞台共建活动火热进行中，王者荣耀官方高校社团联盟开启全新招募', '“Buff”加持荣耀出征，全国大赛大区决赛即将开幕', '助威王者荣耀高校联赛，电竞舞台共建活动五月热浪来袭']

    const newsList = newsTitles.map(item => {
      const randomCats = cats.slice(0).sort((a,b) => Math.random() - 0.5)
      return {
        categories: randomCats.slice(0,2),
        title: item
      }
    })
    await Article.deleteMany({})
    await Article.insertMany(newsList)

    res.send(newsList)
  })




  router.get('/news/list',async(req,res) => {


    //关联查询
    // const parent = await Category.findOne({
    //   name: '资讯分类'
    // }).populate({
    //   path: 'children',
    //   populate: {
    //     path: 'newsList'
    //   }
    // }).lean()

    //聚合查询
    const parent = await Category.findOne({
      name: '资讯分类'
    })

    const cats = await  Category.aggregate([
      { $match: { parent: parent._id } }, // => 类似where查询
      {
        $lookup: { // => join连接查询
          from: 'articles',  // 关联表|集合
          localField: '_id',  //本地键
          foreignField: 'categories', //外键
          as: 'newsList' //
        }
      },
      {
        // 添加一个字段 =》 在这里是修改字段newsList返回5个item
        $addFields: {
          newsList: { $slice: ['$newsList', 5] }
        }
      }
    ])

    const subCats = cats.map(v => v._id)
    cats.unshift({
      name: '热门',
      newsList: await Article.find().where({
        categories: { $in: subCats }
      }).populate('categories').limit(5).lean()
    })

    cats.map(cat => {
      cat.newsList.map(news => {
        news.categoryName = (cat.name === '热门')
          ? news.categories[0].name : cat.name
        return news
      })
      return cat
    })

    res.send(cats)
  })


  app.use('/web/api',router)
}