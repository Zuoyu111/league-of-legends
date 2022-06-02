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
        <i class="sprite sprite-arrow-up mr-1"></i>
        <span>收起</span>
      </div>
    </div>

  <!--  end of icons-->



    <list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2" v-for="items in category.newsList">

          <span>[{{items.categoryName}}]</span>
          <span>|</span>
          <span>{{items.title}}</span>
          <span>{{items.date}}</span>
        </div>
      </template>

    </list-card>


    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>
    <p>sfs</p>

  </div>
</template>

<script>
import MCard from "@/components/Card";
import ListCard from "@/components/ListCard";
export default {
  name: "Home",
  components: {
    MCard,
    ListCard
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
      newsCats: [
        {
          name: '热门',
          newsList: new Array(5).fill({}).map(v => (
              {
                categoryName: '公告',
                title: '三街工作室|共创装备即将上线体验服！',
                date: '06/01'
              }
          ))
        },
        {
          name: '新闻',
          newsList: new Array(5).fill({}).map(v => (
              {
                categoryName: '公告',
                title: '三街工作室|共创装备即将上线体验服！',
                date: '06/01'
              }
          ))
        },
        {
          name: '公告',
          newsList: new Array(5).fill({}).map(v => (
              {
                categoryName: '公告',
                title: '三街工作室|共创装备即将上线体验服！',
                date: '06/01'
              }
          ))
        },
        {
          name: '公告',
          newsList: new Array(5).fill({}).map(v => (
              {
                categoryName: '公告',
                title: '三街工作室|共创装备即将上线体验服！',
                date: '06/01'
              }
          ))
        },
        {
          name: '公告',
          newsList: new Array(5).fill({}).map(v => (
              {
                categoryName: '公告',
                title: '三街工作室|共创装备即将上线体验服！',
                date: '06/01'
              }
          ))
        },
      ]
    }
  }
}
</script>

<style  lang="scss">
@import "../scss/variables";
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