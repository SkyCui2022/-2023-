<template>
    <div class="map" ref="baiduRef"></div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'

import useMap from '../hooks/BaiduMap'

const { initMap, baiduRef, point, map } = useMap()

onMounted(() => {
    initMap()
})
</script>
<style lang="scss" scoped>
.map {
    width: 100%;
    height: 400px
}
</style>
