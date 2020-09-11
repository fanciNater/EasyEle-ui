<template>
  <div id="app">
    <mainHeader />
    <div class="container">
      <sideNav class="nav" />
      <router-view class="view" />
    </div>
    <mainFooter />
    <mobile-frame v-if="isMobileShow" :show.sync="isMobileShow" />
  </div>
</template>

<script>
import mainHeader from './components/header.vue'
import mainFooter from './components/footer.vue'
import sideNav from './components/side-nav.vue'
import MobileFrame from './components/mobile-frame.vue'
import router from './router'
import Vue from 'vue'

export default {
  name: 'App',
  components: {
    mainHeader,
    sideNav,
    mainFooter,
    MobileFrame
  },
  data() {
    return {
      isMobileShow: false
    }
  },
  mounted() {
    if ('onhashchange' in window) {
      window.onhashchange = function(ev) {
        let name = window.location.hash.substring(2)
        router.push({ name })
      }
    }
  }
}
</script>
