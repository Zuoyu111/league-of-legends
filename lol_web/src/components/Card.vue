<template>
  <div class="card p-3 mt-3 bg-white">

    <div class="card-header d-flex pb-3">

      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2 ai-center">{{ title }}</div>
      <i class="iconfont icon-menu"></i>
    </div>
    <div class="card-body pt-3">
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "Card",
  props: ['title','icon']
}
</script>

<style scoped lang="scss">
@import "../scss/style.scss";
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;

}
</style>