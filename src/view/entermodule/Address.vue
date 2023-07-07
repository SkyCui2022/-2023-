<template>
    <van-row class="backblueb">
        <van-col span="22" offset="1">
            <Goback :ModelValue="{ Title: '地理位置', Name: Enter.Simple }"></Goback>
        </van-col>
    </van-row>
    <BaiduMap />
</template>
<script setup lang='ts'>
import { computed, defineComponent, ref, reactive, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import Goback from '../component/goback.vue';
import { EnterApi, EntityEnterprises } from '@yakj/sdk/sdk/sdk'
import BaiduMap from '../component/BaiduMap.vue'
import useMap from '../hooks/BaiduMap'

const route = useRoute()
const Enter = ref(new EntityEnterprises())
const Lng = ref(0)
const Lat = ref(0)
const { addMarker, initMap } = useMap()
onMounted(() => {
    Lng.value = Number(route.query.Lng)
    Lat.value = Number(route.query.Lat)
    initMap(Lng.value, Lat.value)
    addMarker(Lng.value, Lat.value)
})
</script>
<style scoped lang='less'>
.map {
    width: 100%;
    height: 400px;
}
</style>