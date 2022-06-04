<template>
  <div>
    <div class="topbar bg-black py-2 px-4 text-white d-flex ai-center" >
      <img src="../assets/logo.png" alt="" height="30" style="border-radius:2px;">
      <div class="mx-3 d-flex flex-column jc-between flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 py-2">
      <div class="nav jc-around nav-inverse text-white pb-1">

        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>

        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">IP新游</router-link>
        </div>

      </div>
    </div>
    <router-view :key="$route.path"></router-view>
  </div>
</template>
<script>
export default {
  
}
</script>

<style lang="scss">
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>