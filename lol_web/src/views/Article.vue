<template>
  <div class="article-container">
    <div class="d-flex py-3 border-bottom">
      <div class="iconfont icon-menu ml-2"></div>
      <strong class="flex-1 line-1 mx-2 text-blue">
        {{detailData.title}}
      </strong>
      <div class="text-grey mr-2">
        {{detailData.updatedAt | data}}
      </div>
    </div>
    <div v-html="detailData.body" class="px-4 fs-lg detail-body"></div>

    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu"></i>
        <strong class="text-blue fs-lg ml-2">相关资讯</strong>
      </div>
     <div class="pt-2">
       <router-link
           class="mb-2"
           tag="div"
           v-for="item in detailData.related"
           :to="`/article/${item._id}`">

         {{item.title}}
       </router-link>
     </div>
    </div>

  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  name: "Article",
  props: ["id"],
  data() {
    return {
      detailData: {}
    }
  },
  created() {
    this.fetchDetail()
  },
  methods: {
    async fetchDetail() {
      const res = await this.$http.get('/articles/'+this.id)
      this.detailData = res.data
      console.log(this.detailData)
    }
  },
  watch: {
    id: 'fetchDetail'
  },
  filters: {
    data(val) {
      return dayjs(val).format("YYYY-MM-DD")
    }
  }

}
</script>

<style lang="scss">
  .detail-body {

    img {
      max-width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
</style>