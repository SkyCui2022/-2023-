<template>
    <van-row class="backblueb">
        <van-col span="22" offset="1">
            <Goback :ModelValue="{ Title: '建构筑物详情', Name: '测试' }"></Goback>
            <van-row class="block margin20_bottom" align="center" justify="center">
                <van-col span="12" @click="BuildActive = 0">
                    <van-row align="center" justify="center" :class="BuildActive == 0 ? 'actived' : 'unactive'">
                        <van-col class="blueback"> <i class="iconfont icon-fengxiandian_jichuziliao size25"></i></van-col>
                        <van-col span="24" class="margin8_top">基础信息</van-col>
                    </van-row>
                </van-col>
                <van-col span="12" @click="BuildActive = 1">
                    <van-row align="center" justify="center" :class="BuildActive == 1 ? 'actived' : 'unactive'">
                        <van-col class="blueback"> <i class="iconfont icon-zuzhijiagou_gangweiguanshe size25"></i></van-col>
                        <van-col span="24" class="margin8_top">建筑关涉</van-col>
                    </van-row>
                </van-col>
            </van-row>
        </van-col>
    </van-row>
    <van-row class="height">
        <van-col span="24">
            <template v-if="BuildActive == 0">
                <van-col span="22" offset="1">
                    <van-row align="center" justify="space-between" class="padding_14_0">
                        <van-col class="font15 ">建筑名称</van-col>
                        <van-col class="font15 ">生产车间建筑主体</van-col>
                    </van-row>
                    <van-row align="center" justify="space-between" class="padding_14_0">
                        <van-col class="font15 ">建筑分类</van-col>
                        <van-col class="font15 ">生产类</van-col>
                    </van-row>
                    <van-row align="center" justify="space-between" class="padding_14_0">
                        <van-col class="font15 ">建筑结构</van-col>
                        <van-col class="font15 ">钢混结构</van-col>
                    </van-row>
                    <van-row align="center" justify="space-between" class="padding_14_0">
                        <van-col class="font15 ">耐火等级</van-col>
                        <van-col class="font15 ">一级</van-col>
                    </van-row>
                    <van-row align="center" justify="space-between" class="padding_14_0">
                        <van-col class="font15 ">火灾危险性</van-col>
                        <van-col class="font15 ">甲</van-col>
                    </van-row>
                    <van-row align="center" justify="space-between" class="padding_14_0">
                        <van-col class="font15 ">层数</van-col>
                        <van-col class="font15 ">26</van-col>
                    </van-row>
                    <van-row align="center" justify="space-between" class="padding_14_0">
                        <van-col class="font15 ">总高度</van-col>
                        <van-col class="font15 ">14m</van-col>
                    </van-row>
                    <van-row align="center" justify="space-between" class="padding_14_0">
                        <van-col class="font15 ">占地面积</van-col>
                        <van-col class="font15 ">540㎡</van-col>
                    </van-row>
                    <van-row align="center" justify="space-between" class="padding_14_0">
                        <van-col class="font15 ">建筑照片</van-col>
                        <van-col class="font15 "></van-col>
                        <van-row>
                            <template v-for="(v, k) in Imgs" :key="k">
                                <van-image :src="v" @click="showImagePreview(Imgs, k)"></van-image>
                            </template>
                        </van-row>
                    </van-row>
                    <van-row align="center" justify="space-between" class="padding_14_0">
                        <van-col class="font15 "><van-image :src="''" width="40" height="40"></van-image></van-col>
                        <van-col span="20">
                            <van-row align="center" justify="space-between">
                                <van-col>更新人：夏一欧</van-col>
                                <van-col class="font13 blue"><i class="iconfont icon-xiugaishijian"></i>&nbsp;2022-11-28
                                    18:24</van-col>
                            </van-row>
                            <van-row>
                                岗位：管理层-总经理
                            </van-row>
                        </van-col>
                    </van-row>
                </van-col>
            </template>
            <template v-if="BuildActive == 1">
                <van-col span="22" offset="1">
                    <van-row align="center" justify="space-between" class="margin1915">
                        <van-col class="font15">事故类型</van-col>
                        <van-row gutter="20" class="block">
                            <van-col class="tag blue" span="6">淹溺</van-col>
                            <van-col class="tag blue" span="6">透水</van-col>
                            <van-col class="tag blue" span="6">中毒窒息</van-col>
                            <van-col class="tag blue" span="6">容器爆照</van-col>
                            <van-col class="tag blue" span="6">触电</van-col>
                            <van-col class="tag blue" span="6">火灾</van-col>
                            <van-col class="tag blue" span="6">火药爆炸</van-col>
                            <van-col class="tag blue" span="6">锅炉爆炸</van-col>
                        </van-row>
                    </van-row>
                </van-col>
                <van-row class="line_gray block"></van-row>
                <van-col span="22" offset="1">
                    <van-row>
                        <van-col class="margin1510 font15">风险点 1</van-col>
                    </van-row>
                    <van-row class="card whiteback radius6">
                        <van-col span="22" offset="1">
                            <van-row align="center" justify="space-between" class="padding8_bottom borderline">
                                <van-col>
                                    <van-image :src="''" width="40" height="40"></van-image>
                                </van-col>
                                <van-col span="20">
                                    <van-row align="center" justify="space-between">
                                        <van-col>1原料简仓<van-tag>三级</van-tag></van-col>
                                        <van-col>未整改</van-col>
                                    </van-row>
                                    <van-row>
                                        <van-col class="left">责任人：周胜利&nbsp;15882784967</van-col>
                                    </van-row>
                                </van-col>
                            </van-row>
                            <van-row align="center" justify="space-between" class="padding8_top">
                                <van-col><i class="iconfont icon-zuzhijiagou_zuijinjiancha font12"><span
                                            class="font12">2022-12-31 08:14</span> <span class="font12">周胜利</span><i
                                            class="iconfont icon-jianchabiao-_nan-xianxing font12"></i></i></van-col>
                                <van-col>
                                    <van-row align="center">
                                        <van-col class="font13">有隐患1 &nbsp;</van-col>
                                        <van-col class="font13">已整改1</van-col>
                                    </van-row>
                                </van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </van-col>
                <van-row class="line_gray block"></van-row>
            </template>
        </van-col>
    </van-row>
</template>
<script setup lang='ts'>
import { computed, defineComponent, ref, reactive, onMounted, watch } from 'vue';
import { SearchResult } from '@ctsy/api-sdk';
import { SearchWhere } from '@ctsy/api-sdk/dist/lib';
import Goback from '../component/goback.vue';
import { showImagePreview } from 'vant';
const BuildActive = ref(0)
const Imgs = ref([])

const Height = computed(() => {
    let top = document.querySelector('.backblueb')
    return window.innerHeight - top?.clientHeight + 'px'
})
</script>
<style scoped lang='less'>
.blueback {
    width: 37px;
    height: 37px;
    line-height: 37px;
    background: #64a4fe;
    border-radius: 4px;
}

.padding_14_0 {
    padding: 14px 0;
    border-bottom: 1px solid #eaebee;
}

.margin1915 {
    margin: 19px 0 15px 0;
}

.height {
    min-height: v-bind(Height);
    background: #f7f9fc;
}

.tag {
    background: #eff4fc;
}
</style>