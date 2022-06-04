<template>
  <div class="hero-container">

    <div class="top-bar bg-black py-2 px-4 text-white d-flex ai-center text-light-1" >
      <img src="../assets/logo.png" alt="" height="30" style="border-radius:2px;">
      <div class="mx-3 d-flex flex-1">
        <span class="mr-2">王者荣耀</span>
        <span>攻略站</span>
      </div>
      <router-link tag="div" to="/">更多英雄 &gt;</router-link>
    </div>

    <div class="top" :style="{'background-image':`url(${showData.background_img})`}">

      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{ showData.title }}</div>
        <h2 class="my-2">{{ showData.name }}</h2>
        <div class="my-1 fs-sm">{{ Typename }}</div>

        <div class="d-flex jc-between ">
          <div class="scores d-flex ai-center" v-if="showData.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{showData.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue">{{showData.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{showData.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{showData.scores.survive}}</span>
          </div>
          <router-link tag="span" class="text-grey fs-sm" to="/">皮肤：2 &gt;</router-link>
        </div>

      </div>

    </div>


  </div>
</template>

<script>
export default {
  name: "Hero",
  props: ["id"],
  data() {
    return {
      showData: {}
    }
  },
  methods: {
    async fetchHeroDetail() {
      const res = await this.$http('/heroes/'+this.id)
      this.showData = res.data
      console.log(res.data);
    }
  },
  created() {
    this.fetchHeroDetail()
  },
  computed: {
    Typename() {
      return this.showData.categories.map(type => type.name).join('/')
    }
  }
}
</script>

<style lang="scss">

  .hero-container {
    .top-bar {
      position: sticky;
      top: 0;
      z-index: 999;
    }
    .top {
      height: 50vw;
      background: #fff no-repeat top center;
      background-size: auto 100%;
    }
    .info {
      background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
    }
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255,255,255,.2);
      }
    }
  }

</style>