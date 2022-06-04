<template>
  <div>
    <swiper  :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/image/1.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/image/1.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/image/1.jpg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home  text-right px-3 pb-1"  slot="pagination"></div>
    </swiper>
  <!--   end of swiper-->
    <div class="nav-icons bg-white mt-3 text-grey text-center  pt-3">
      <div class="d-flex flex-warp">
        <div class="nav-item mb-3" v-for="item in 10">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm ">
        <i class="sprite sprite-arrow-up mr-1 sprite-arrow-up-reverse"></i>
        <span >收起</span>
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

    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchHeroesCats()
  },
  methods: {
    toArticleDetail(id) {
      this.$router.push({
        path: '/article/'+id
      })
    },
    toHeroDetail(id) {
      this.$router.push({
        path: '/heroes/' + id
      })
    },
    async fetchNewsCats() {
      const res = await this.$http('news/list')
      this.newsCats = res.data
    },
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