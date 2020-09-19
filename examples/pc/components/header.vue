<template>
  <header
    class="page-header"
    :style="
      $route.name === 'index' ? 'box-shadow:none' : 'box-shadow:0 10px 60px 0 rgba(29,29,31,0.07)'
    "
  >
    <div class="header-container">
      <a href="https://github.com/Eamonnzhang/vue-cards" target="__blank">
        <!-- <vue-cards-icon name="cards" :size="50"></vue-cards-icon> -->
        <span class="name">easyele-ui</span>
      </a>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style type="text/scss" lang="scss">
.page-header {
  position: relative !important;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 80px;
  background-color: #fff;
  opacity: 0.98;
  box-shadow: 0 10px 60px 0 rgba(29, 29, 31, 0.07);
  transition: all 0.3s;
  .header-container {
    width: 90%;
    margin: 0 auto;
    a {
      display: flex;
      height: 80px;
      align-items: center;
    }
    .name {
      margin-left: 5px;
      font-size: 20px;
      color: #628cf5;
    }
    .icon {
      width: 100px;
    }
  }
}
</style>
