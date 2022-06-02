<template>
  <m-card :title="title" :icon="icon">
    <div class="nav jc-between">
      <div class="nav-item" v-for="(item,index) in categories" :class="{active : active === index}">
        <div @click="active = index" class="nav-link">
          {{ item.name }}
        </div>
      </div>

    </div>

    <div class="pt-3">
      <swiper>
        <swiper-slide v-for="category in categories">
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