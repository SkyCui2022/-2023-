<template>
    <van-sticky>
        <van-row class="backblueb">
            <van-col span="22" offset="1">
                <Goback :ModelValue="{ Title: '基本信息', Name: Enter.Simple }"></Goback>
            </van-col>
        </van-row>
    </van-sticky>
    <van-row class="position_relative">
        <van-image :src="Enter.Img" width="100%" height="200"></van-image>
        <van-row class="position_absolute block height38">
            <van-col span="24">{{ Enter.Name }}</van-col>
        </van-row>
    </van-row>
    <van-row>
        <van-col span="22" offset="1">
            <van-row @click="Show = !Show" class="padding1613" align="center" justify="space-between">
                <van-col>企业简介</van-col>
                <van-col><i
                        :class="`iconfont ${Show ? 'icon-anquanpeixuntubiao_xiala-copy' : 'icon-anquanpeixuntubiao_jinru1'}`"></i></van-col>
            </van-row>
            <van-row v-if:show="Show">
                <vam-col span="24" class="left">
                    {{ Enter.Memo }}
                </vam-col>
            </van-row>
            <van-row class="padding1613" align="center" justify="space-between">
                <van-col>企业LOGO</van-col>
                <van-col>
                    <van-image :src="Enter.Logo" width="40" height="40"></van-image>
                </van-col>
            </van-row>
            <van-row class="padding1613 borderline" align="center" justify="space-between">
                <van-col>从业人数</van-col>
                <van-col>{{ Enter.Staff }}人</van-col>
            </van-row>
            <van-row class="padding1613 borderline" align="center" justify="space-between">
                <van-col>占地面积</van-col>
                <van-col>{{ Enter.Area }}人</van-col>
            </van-row>
            <van-row class="padding1613 borderline" align="center" justify="space-between">
                <van-col>年产值</van-col>
                <van-col>{{ Enter.Yearly }}人</van-col>
            </van-row>
            <van-row class="padding1613 borderline" align="center" justify="space-between">
                <van-col>企业简称</van-col>
                <van-col>{{ Enter.Simple }}人</van-col>
            </van-row>
            <van-row class="padding1613 borderline" align="center" justify="space-between">
                <van-col>所属行业</van-col>
                <van-col>{{ Enter.Staff }}人</van-col>
            </van-row>
            <van-row class="padding1613 borderline" align="center" justify="space-between">
                <van-col>产品列表</van-col>
                <van-col>{{ Enter.Staff }}人</van-col>
            </van-row>
            <van-row class="padding1613 block borderline" align="center" justify="space-between">
                <van-col>企业照片</van-col>
                <van-col></van-col>
                <van-row class="block">
                    <template v-for="(v, k) in Enter.Img" :key="k">
                        <van-image :src="v" @click="showImagePreview(Enter.Img, k)"></van-image>
                    </template>
                </van-row>
            </van-row>
        </van-col>
    </van-row>
</template>
<script setup lang='ts'>
import { computed, defineComponent, ref, reactive, onMounted, watch } from 'vue';
import { SearchResult } from '@ctsy/api-sdk';
import { SearchWhere } from '@ctsy/api-sdk/dist/lib';
import Goback from '../component/goback.vue';
import { EnterApi, EntityEnterprises } from '@yakj/sdk/sdk/sdk'
import { wait } from '../api/lib';
import { showImagePreview } from 'vant';

const Enter = ref(new EntityEnterprises)
const Show = ref(false)

onMounted(async () => {
    Enter.value = await wait(EnterApi.getByEID(159))
})
</script>
<style scoped lang='less'>
.height38 {
    height: 38px;
    line-height: 38px;
    background: rgba(255, 255, 255, 0.75);
}

.padding1613 {
    padding: 16px 0 13px 0;
}
</style>