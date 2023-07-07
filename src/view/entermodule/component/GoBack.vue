<template>
    <van-row align="center" justify="space-between" class="margin_20_0">
        <van-col @click="router.go(-1)" class="white"><i
                class="iconfont icon-anquanpeixuntubiao_fanhui"></i>&nbsp;&nbsp;<span class="font20">{{
                    ModelValue.Title
                }}</span></van-col>
        <van-col class="white_small"><van-icon name="location-o" />&nbsp;&nbsp;{{ ModelValue.Name }}</van-col>
    </van-row>
</template>
<script setup lang='ts'>
import { computed, defineComponent, ref, reactive, onMounted, watch } from 'vue';
import { SearchResult } from '@ctsy/api-sdk';
import { SearchWhere } from '@ctsy/api-sdk/dist/lib';
import { useRouter } from 'vue-router'

const router = useRouter()

interface Props {
    ModelValue: {
        Title: string,
        Name: String
    }
}

const props = withDefaults(defineProps<Props>(), {
    ModelValue: () => {
        return {
            Title: '',
            Name: ''
        }
    }
})
</script>
<style scoped lang='less'></style>