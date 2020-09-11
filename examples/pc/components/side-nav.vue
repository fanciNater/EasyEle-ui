<template>
  <div class="side-nav">
    <div v-for="title in Object.keys(data)" :key="title" class="group-container">
      <p class="side-nav-title">
        {{ title }}
      </p>
      <div v-for="nav in data[title]" :key="nav.name" class="side-nav-items">
        <template v-if="nav.desc">
          <router-link
            v-if="nav.name"
            :class="$route.name === nav.name ? 'active' : ''"
            :to="{ name: nav.name }"
          >
            {{ nav.desc }}
          </router-link
          >
          <p v-else class="side-nav-group">
            {{ nav.desc }}
          </p>
          <div v-for="item in nav.items" :key="item.name">
            <router-link
              :to="{ name: item.name }"
              :class="$route.name === item.name ? 'active' : ''"
              class="slid-nav-component"
            >
              <span class="en-name">{{ item.desc }}</span>
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import navConf from '../../nav.config.json'
export default {
  data() {
    return {
      data: navConf
    }
  }
}
</script>
<style lang="scss">
.side-nav {
  z-index: 99;
  display: inline-block;
  padding: 0;
  margin: 32px 0;
  color: #3f536e;
  background-color: #fff;
  .group-container {
    margin-bottom: 32px;
  }
  .side-nav-title {
    padding: 0 24px 8px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    color: #628cf5;
    text-transform: uppercase;
    opacity: 0.8;
  }
  .side-nav-items {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.8;
    a {
      position: relative;
      display: block;
      padding: 8px 24px;
      font-weight: normal;
      line-height: 1.5;
      color: #3f536e;
      cursor: pointer;
    }
    .side-nav-group {
      position: relative;
      display: block;
      padding: 6px 0 6px 24px;
      font-weight: bold;
      color: #2c405a;
    }
    .slid-nav-component {
      position: relative;
      display: block;
      padding: 6px 24px 6px 32px;
      font-size: 14px;
      color: #616367;
    }
    .active {
      font-weight: bold;
      color: #628cf5;
    }
  }
}
</style>
