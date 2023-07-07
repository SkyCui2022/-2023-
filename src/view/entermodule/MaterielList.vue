<template>
    <van-row class="backblueb">
        <van-col span="22" offset="1">
            <Goback :ModelValue="{ Title: '物料清单档案', Name: '测试' }"></Goback>
        </van-col>
    </van-row>
    <van-row class="height">
        <van-col span="24">
            <van-row>
                <van-col span="22" offset="1">
                    <van-row>
                        <van-col class="margin1510 font15">危险化学品 </van-col>
                    </van-row>
                    <van-row class="card whiteback " @click="router.push('/materildetail')">
                        <van-col span="24">
                            <van-row align="center" justify="space-between" gutter="6">
                                <van-col><van-image :src="''" width="50" height="50"></van-image></van-col>
                                <van-col>
                                    <van-row align="center" justify="space-between">
                                        <van-col>1丙烯酸<van-tag>原料</van-tag><van-tag>易燃</van-tag>
                                            <van-tag>有毒</van-tag></van-col>
                                        <van-col><van-tag>危险化学品</van-tag></van-col>
                                    </van-row>
                                    <van-row>
                                        <van-col class="font12 grey">防护：防毒面罩、绝缘物品、防护眼罩、防护服</van-col>
                                    </van-row>
                                    <van-row>
                                        <van-col class="font12 grey">位置：生产车间建筑主体</van-col>
                                    </van-row>
                                </van-col>
                            </van-row>
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>
            <van-row class="block line_gray"></van-row>
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

const Height = computed(() => {
    let top = document.querySelector('.backblueb')
    return window.innerHeight - top?.clientHeight + 'px'
})
</script>
<style scoped lang='less'>
.height {
    min-height: v-bind(Height);
    background: #f7f9fc;
}
</style>