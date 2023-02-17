<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import router from './router'
import { useStore } from './store'
// import HelloWorld from './components/HelloWorld.vue'
function left() {
  const cur = router.currentRoute.value
  let back = cur.meta.back
  if (back !== false) {
    if ('string' == typeof back) {
      let r = back
      for (let k in cur.params) {
        //@ts-ignore
        r = r.replace(':' + k, cur.params[k])
      }
      return router.push(r)
    }
    router.back()
  }
}

const store = useStore()
</script>

<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
