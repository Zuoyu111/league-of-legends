<template>
  <div>
    <swiper  :options="swiperOptions">
      <swiper-slide v-for="item in swiperData" :key="item._id">
        <img class="w-100" :src="item.image" alt="">
      </swiper-slide>

      <div class="swiper-pagination pagination-home  text-right px-3 pb-1"  slot="pagination"></div>
    </swiper>
  <!--   end of swiper-->
    <div class="nav-icons bg-white mt-3 text-grey text-center  pt-3">
      <div class="d-flex flex-warp">
        <div class="nav-item mb-3">
          <i class="sprite sprite-news"></i>
          <div class="py-2 fs-sm">爆料站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="py-2 fs-sm">故事站</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-store"></i>
          <div class="py-2 fs-sm">周边商城</div>
        </div>
        <div class="nav-item mb-3">
          <i class="sprite sprite-experience"></i>
          <div class="py-2 fs-sm">体验服</div>
        </div>


       <template v-if="isShow">
         <div class="nav-item mb-3">
           <i class="sprite sprite-noob"></i>
           <div class="py-2 fs-sm">新人专区</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-glory"></i>
           <div class="py-2 fs-sm">荣耀·传承</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-community"></i>
           <div class="py-2 fs-sm">王者社区</div>
         </div>
         <div class="nav-item mb-3">
           <i class="sprite sprite-campsite"></i>
           <div class="py-2 fs-sm">王者营地</div>
         </div>
       </template>




      </div>
      <div class="bg-light py-2 fs-sm ">
        <i class="sprite sprite-arrow-up mr-1" :class="{'sprite-arrow-up-reverse':!isShow}"></i>
        <span @click="isShow = !isShow">
          <span v-show="!isShow">展开</span>
          <span v-show="isShow">收起</span>
        </span>
      </div>
    </div>

  <!--  end of icons-->


    <list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <template  #items="{category}">
        <div @click="toArticleDetail(items._id)" class="py-2 fs-lg d-flex" v-for="items in category.newsList" :key="items.name">

          <span class="text-dot">[{{items.categoryName}}]</span>
          <span class="mx-2">|</span>
          <span class="flex-1 text-dark-1 line-1 pr-2">{{items.title}}</span>
          <span class="text-grey fs-sm">{{items.createdAt | date}}</span>
        </div>
      </template>

    </list-card>
    <!-- end of   新闻资讯-->
    <list-card icon="card-hero" title="英雄列表" :categories="HeroCats">
      <template #items="{category}">
        <div class="d-flex flex-warp" style="margin: 0 -0.5rem">
          <div @click="toHeroDetail(hero._id)" class="p-2 text-center"
               style="width: 20%"
               v-for="hero in category.heroList" :key="hero.name">
            <img class="w-100" style="border-radius: 6px" :src="hero.avatar" alt="">
            <div>{{ hero.name }}</div>
          </div>
        </div>
      </template>

    </list-card>


  </div>
</template>

<script>
import dayjs from 'dayjs'
import 'animate.css'

import MCard from "@/components/Card";
import ListCard from "@/components/ListCard";


export default {
  name: "Home",
  components: {
    MCard,
    ListCard
  },
  filters: {
    date( val ) {
      return dayjs(val).format("MM/DD")
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: '.pagination-home'
        },
        loop: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        }
        // Some Swiper option/callback...
      },
      newsCats: [],
      HeroCats: [],
      swiperData: [],
      isShow: false
    }
  },
  created() {
    this.fetchNewsCats()   //获取新闻分类数据
    this.fetchHeroesCats()  //获取英雄分类数据
    this.fetchSwiperData()  //获取首页轮播图
  },
  methods: {
    //跳转至文章详情
    toArticleDetail(id) {
      this.$router.push({
        path: '/article/'+id
      })
    },
    //跳转至英雄详情
    toHeroDetail(id) {
      this.$router.push({
        path: '/heroes/' + id
      })
    },
    async fetchSwiperData() {
      const res = await this.$http('home/swiper')
      console.log(res.data,444)
      this.swiperData = res.data[0].items
    },
    //获取新闻分类
    async fetchNewsCats() {
      const res = await this.$http('news/list')
      this.newsCats = res.data
    },
    //获取英雄分类
    async fetchHeroesCats() {
      const res = await this.$http('hero/list')
      this.HeroCats = res.data
    }
  }
}
</script>

<style  lang="scss">
@import "../scss/variables";

  .sprite-arrow-up-reverse {
    transform: rotateX(180deg);
  }
  .swiper-pagination {
    .swiper-pagination-bullet {
      opacity: 1;
      border-radius: 0.1538rem;
      background-color: map-get($colors,'white');
      &.swiper-pagination-bullet-active {
        background-color: map-get($colors,'dot');
      }
    }
  }
  .nav-icons {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;
    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;
      &:nth-child(4n) {
        border-right: none;
      }
    }
  }
</style>