<template>
  <m-card :title="title" :icon="icon">
    <div class="nav jc-between">
      <div class="nav-item" v-for="(item,index) in categories" :class="{active : active === index}" :key="index">
        <div @click="$refs.home_swiper.$swiper.slideTo(index)" class="nav-link">
          {{ item.name }}
        </div>
      </div>

    </div>

    <div class="pt-3">
      <swiper ref="home_swiper"
              :options="{ autoHeight: true }"
      @slide-change="() => {active = $refs.home_swiper.$swiper.activeIndex}">
        <swiper-slide v-for="category in categories" :key="category.name">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
import MCard from "@/components/Card";

export default {
  name: "ListCard",
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    categories: {
      type: Array,
      required: true
    }
  },
  components: {
    MCard
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>