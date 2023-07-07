<template>
    <van-row class="backblueb">
        <van-col span="22" offset="1">
            <Goback :ModelValue="{ Title: '建构筑物档案', Name: '测试' }"></Goback>
        </van-col>
    </van-row>
    <van-row class="bg">
        <van-col span="22" offset="1">
            <van-row @click="Show = !Show" class="margin1510">
                <van-col>生活类3 <i
                        :class="`iconfont ${Show ? 'icon-anquanpeixuntubiao_xiala-copy' : 'icon-anquanpeixuntubiao_jinru1'}`"></i></van-col>
            </van-row>
            <van-row class="card whiteback " v-if:show="Show" @click="toDetail">
                <van-col span="22" offset="1">
                    <van-row align="center" justify="space-between">
                        <van-col class="size50 blueback">
                            <i class="iconfont icon-qiyedangan_jianzhugouwu font37  blue lineheight50"></i>
                        </van-col>
                        <van-col span="19">
                            <van-row align="center" justify="space-between">
                                <van-col><span>1</span> <span class="font14 font_bold">生产车间建筑主体</span></van-col>
                                <van-col>钢混结构</van-col>
                            </van-row>
                            <van-row class="grey padding_6_0">
                                <van-col>耐火等级：一级 火灾危险性：甲</van-col>
                            </van-row>
                            <van-row class="grey">
                                <van-col>
                                    层数：26 总高度：38m 占地面积：2654㎡
                                </van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>
        </van-col>
    </van-row>
</template>
<script setup lang='ts'>
import { computed, defineComponent, ref, reactive, onMounted, watch } from 'vue';
import { SearchResult } from '@ctsy/api-sdk';
import { SearchWhere } from '@ctsy/api-sdk/dist/lib';
import Goback from '../component/goback.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const Show = ref(false)
const Height = computed(() => {
    let top = document.querySelector('.backblueb')
    return window.innerHeight - top?.clientHeight + 'px'
})
const toDetail = () => {
    router.push('/builddetail')
}

</script>
<style scoped lang='less'>
.blueback {
    background: #f0f8fe;
}

.lineheight50 {
    line-height: 50px;
}

.bg {
    min-height: v-bind(Height);
    background: #f7f9fc;
}
</style>