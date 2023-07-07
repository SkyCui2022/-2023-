<template>
    <van-row class="bg block">
        <van-col span="24">
            <van-sticky>
                <van-row class="block ownblue ">
                    <van-col span="22" offset="1">
                        <GoBack :ModelValue="{ Title: '企业档案', Name: Enter.Simple }"></GoBack>
                    </van-col>
                </van-row>
            </van-sticky>
            <van-row class="ownlineblue">
                <van-row class="block border"></van-row>
                <van-row class="block margin" @click="router.push('/enterbase')">
                    <van-col span="22" offset="1" class="left white  ">
                        <span class="font15 font_bold">基本情况</span> <i class="iconfont icon-anquanpeixuntubiao_jinru1"></i>
                    </van-col>
                </van-row>
                <van-row class="block">
                    <van-col span="22" offset="1">
                        <van-row class="card whiteback">
                            <van-col span="22" offset="1">
                                <van-row class="block" align="center" justify="space-between">
                                    <van-col>
                                        <van-image :src="Enter.Logo" width="16" height="16"></van-image><span
                                            class="font15 font_bold">{{ Enter.Name
                                            }}</span>
                                    </van-col>
                                    <van-col> 子涛</van-col>
                                </van-row>
                                <van-row>
                                    <van-col class="orange">
                                        粉尘涉爆、有限空间
                                    </van-col>
                                </van-row>
                                <van-row class="block" align="center" justify="space-around">
                                    <van-col>
                                        <van-row>
                                            <van-col span="24" class="font18 font_bold">{{ Enter.Staff }}</van-col>
                                            <van-col span="24" class="grey">从业人数</van-col>
                                        </van-row>
                                    </van-col>
                                    <van-col>
                                        <van-row>
                                            <van-col span="24" class="font18 font_bold">{{ Enter.Area }}</van-col>
                                            <van-col span="24" class="grey">占地面积 m² </van-col>
                                        </van-row>
                                    </van-col>
                                    <van-col>
                                        <van-row>
                                            <van-col span="24" class="font18 font_bold">
                                                {{ Enter.Yearly }}
                                            </van-col>
                                            <van-col span="24" class="grey">年产值 W</van-col>
                                        </van-row>
                                    </van-col>
                                </van-row>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
                <van-row class="block margin">
                    <van-col span="22" offset="1" class="left white  ">
                        <span class="font15 font_bold">服务档案</span> <i class="iconfont icon-anquanpeixuntubiao_jinru1"></i>
                    </van-col>
                </van-row>
                <van-row>
                    <van-col span="22" offset="1">
                        <van-row gutter="10">
                            <van-col span="12">
                                <van-row class="card whiteback">
                                    <van-col span="22" offset="1">
                                        <van-row align="center" justify="space-between">
                                            <van-col><strong class="font14">安全管家服务</strong></van-col>
                                            <van-col class="blue">服务中</van-col>
                                        </van-row>
                                    </van-col>
                                    <van-col span="22" offset="1">
                                        <van-row align="center" justify="space-between" class="grey">
                                            <van-col>2022.12.30</van-col>
                                            <van-col>-</van-col>
                                            <van-col>2024.01.01</van-col>
                                        </van-row>
                                    </van-col>
                                </van-row>
                            </van-col>
                            <van-col span="12">
                                <van-row class="card whiteback">
                                    <van-col span="22" offset="1">
                                        <van-row align="center" justify="space-between">
                                            <van-col><strong class="font14">安全管家服务</strong></van-col>
                                            <van-col class="blue">服务中</van-col>
                                        </van-row>
                                    </van-col>
                                    <van-col span="22" offset="1">
                                        <van-row align="center" justify="space-between" class="grey">
                                            <van-col>2022.12.30</van-col>
                                            <van-col>-</van-col>
                                            <van-col>2024.01.01</van-col>
                                        </van-row>
                                    </van-col>
                                </van-row>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
                <van-row class="block margin10_top">
                    <van-col span="22" offset="1">
                        <van-row class="map block" align="center">
                            <van-col span="22" offset="1">
                                <van-row class="block " align="center" justify="space-between">
                                    <van-col class="font14"><i class="iconfont icon-qiyedangan_dingwei-daitouying red"></i>
                                        <span class="font_bold font14"> {{
                                            Enter.Addr
                                        }}</span></van-col>
                                    <van-col @click="goMap" class="font12">查看地图 <i
                                            class="iconfont icon-anquanpeixuntubiao_jinru1 font12"></i></van-col>
                                </van-row>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </van-row>
        </van-col>
    </van-row>
    <van-row class="back_white">
        <van-row class="block">
            <van-col offset="1" class="font15">
                <strong>台账档案</strong>
            </van-col>
        </van-row>
        <van-row class="borderline block"></van-row>
        <van-row class="block" align="center">
            <van-col span="6">
                <van-row class="padding_10_0 rightline" @click="router.push('/buildlist')">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_jianzhugouwu blue size29"></i></van-col>
                    <van-col span="24">建构筑物</van-col>
                </van-row>
            </van-col>
            <van-col span="6">
                <van-row class="padding_10_0 rightline">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_gongyiliucheng blue size29"></i></van-col>
                    <van-col span="24">工艺流程</van-col>
                </van-row>
            </van-col>
            <van-col span="6">
                <van-row class="padding_10_0 rightline">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_weixianzuoye blue size29"></i></van-col>
                    <van-col span="24">危险作业</van-col>
                </van-row>
            </van-col>
            <van-col span="6">
                <van-row class="padding_10_0" @click="router.push('materiellist')">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_wuliao blue size29"></i></van-col>
                    <van-col span="24">物料清单</van-col>
                </van-row>
            </van-col>
        </van-row>
        <van-row class="borderline block"></van-row>
        <van-row class="block" align="center">
            <van-col span="6">
                <van-row class="padding_10_0 rightline">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_qiyeshebei blue size29"></i></van-col>
                    <van-col span="24">企业设备</van-col>
                </van-row>
            </van-col>
            <van-col span="6">
                <van-row class="padding_10_0 rightline">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_jiancebaogao blue size29"></i></van-col>
                    <van-col span="24">检测报告</van-col>
                </van-row>
            </van-col>
            <van-col span="6">
                <van-row class="padding_10_0 rightline">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_zhiyebing blue size29"></i></van-col>
                    <van-col span="24">&nbsp;&nbsp;职业病&nbsp;&nbsp;</van-col>
                </van-row>
            </van-col>
            <van-col span="6">
                <van-row class="padding_10_0">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_yingjiwuzhi blue size29"></i></van-col>
                    <van-col span="24">应急物资</van-col>
                </van-row>
            </van-col>
        </van-row>
        <van-row class="borderline block"></van-row>
        <van-row class="block" align="center">
            <van-col span="6">
                <van-row class="padding_10_0 rightline" align="center">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_zhoubianhuanjing blue size29"></i></van-col>
                    <van-col span="24">周边环境</van-col>
                </van-row>
            </van-col>
            <van-col span="6">
                <van-row class="padding_10_0 rightline" align="center">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_xianchangzhaopian blue size29"></i></van-col>
                    <van-col span="24">现场照片</van-col>
                </van-row>
            </van-col>
            <van-col span="6">
                <van-row class="padding_10_0 rightline">
                    <van-col span="18" offset="1" class="right blue">1</van-col>
                    <van-col span="24"><i class="iconfont icon-qiyedangan_xiangmuguidang blue size29"></i></van-col>
                    <van-col span="24">项目归档</van-col>
                </van-row>
            </van-col>
            <van-col span="6">
                <van-row>
                    <van-col span="24"></van-col>
                    <van-col span="24"></van-col>
                </van-row>
            </van-col>
        </van-row>
        <van-row class="ownline "></van-row>
        <van-row class="block">
            <van-col span="22" offset="1" class="left font15 margin10_bottom">
                <strong>证照档案</strong>
            </van-col>
        </van-row>
        <van-row class="block">
            <van-col span="22" offset="1">
                <van-row class="card whiteback">
                    <van-col span="22" offset="1">
                        <van-row align="center" justify="space-between">
                            <van-col>
                                <van-image :src="''" width="50" height="50"></van-image>
                            </van-col>
                            <van-col span="18">
                                <van-row align="center" justify="space-between">
                                    <van-col>1经营许可证</van-col>
                                    <van-col>已过期</van-col>
                                </van-row>
                                <van-row>
                                    <van-col class="left"> 到期时间：2023-02-14</van-col>
                                </van-row>
                                <van-row justify="space-between">
                                    <van-col>说明：母公司经营许可证电子版</van-col>
                                    <van-col><i class="iconfont icon-denglu_zhengyan"></i></van-col>
                                </van-row>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
        <van-row class="ownline"></van-row>
        <van-row class="block">
            <van-col span="22" offset="1" class="left font15 margin10_bottom">
                <strong>图纸档案</strong>
            </van-col>
        </van-row>
        <van-row class="block">
            <van-col span="22" offset="1">
                <van-row class="card whiteback">
                    <van-col span="22" offset="1">
                        <van-row align="center" justify="space-between">
                            <van-col>
                                <van-image :src="''" width="50" height="50"></van-image>
                            </van-col>
                            <van-col span="18">
                                <van-row align="center" justify="space-between">
                                    <van-col>1平面布局图</van-col>
                                    <van-col>6张</van-col>
                                </van-row>
                                <van-row>
                                    <van-col class="left"> 制图时间：2023-02-14</van-col>
                                </van-row>
                                <van-row justify="space-between">
                                    <van-col>说明：厂区总彩平图</van-col>
                                    <van-col><i class="iconfont icon-denglu_zhengyan"></i></van-col>
                                </van-row>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
        <van-row class="ownline"></van-row>

        <van-row class="block">
            <van-col span="22" offset="1" class="left font15 margin10_bottom">
                <strong>重点管控</strong>
            </van-col>
        </van-row>
        <van-row class="block">
            <van-col span="22" offset="1">
                <van-row class="card whiteback">
                    <van-col span="22" offset="1">
                        <van-row align="center" justify="space-between">
                            <van-col>
                                <van-image :src="''" width="50" height="50"></van-image>
                            </van-col>
                            <van-col span="18">
                                <van-row align="center" justify="space-between">
                                    <van-col>1经营许可证</van-col>
                                    <van-col>已过期</van-col>
                                </van-row>
                                <van-row>
                                    <van-col class="left"> 到期时间：2023-02-14</van-col>
                                </van-row>
                                <van-row justify="space-between">
                                    <van-col>说明：母公司经营许可证电子版</van-col>
                                    <van-col><i class="iconfont icon-denglu_zhengyan"></i></van-col>
                                </van-row>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </van-col>
        </van-row>
    </van-row>
</template>
<script setup lang='ts'>
import { computed, defineComponent, ref, reactive, onMounted, watch } from 'vue';
import { SearchResult } from '@ctsy/api-sdk';
import { SearchWhere } from '@ctsy/api-sdk/dist/lib';
import GoBack from '../component/goback.vue';
import { EnterApi, EntityEnterprises } from '@yakj/sdk/sdk/sdk'
import { wait } from '../api/lib';
import { useRouter } from 'vue-router';

const router = useRouter()
const Enter = ref(new EntityEnterprises())

const goMap = () => {
    router.push({
        path: '/address',
        query: {
            Lat: Enter.value.Lat,
            Lng: Enter.value.Lng
        }
    })
}

onMounted(async () => {
    Enter.value = await wait(EnterApi.getByEID(159))
})
</script>
<style scoped lang='less'>
* {
    box-sizing: border-box;
}

.bg {
    height: 420px;
    background: linear-gradient(180deg, #007aff 0%, #f7f9fc 100%);
}

.border {
    height: 0;
    border-bottom: 1px solid #469fff;
}

.margin {
    margin: 15px 0 11px 0;
}

.whiteback {
    background: white;
    border-radius: 4px;
    box-shadow: 0px 0px 3px rgba(116, 126, 167, 0.2);
}

.map {
    height: 68px;
    background: #ffffff;
    border-radius: 6px;
    background: url('https://f.tansuyun.cn/api/yan/2023-04-03/企业档案-地图底图.jpg');
    background-size: 100% 100%;
}

.rightline {
    border-right: 1px solid #eaebee;
}

.borderline {
    border-bottom: 1px solid #e8e8e8;
    margin: 13px 0;
}

.ownline {
    width: 100%;
    height: 5px;
    background: #eaebee;
    margin: 13px 0;
}

.ownblue {
    background: #007aff;
}

.ownlineblue {
    background: linear-gradient(178.17deg, #007aff 0%, #f7f9fc 100%);
}
</style>