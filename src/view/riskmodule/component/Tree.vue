<template>
  <van-row class="block">
    <van-col span="24" v-for="(v, k) in Props.Lists" :key="v">
      <van-row class="block" v-if="!v[ID]">
        <van-col span="22" offset="1" class="margin10_top">
          <van-row class="block">
            <van-col
              @click="change(v[IDkey])"
              :class="`left ${ChangeList[v[IDkey]] ? 'fc1b6ffe' : ''}`"
            >
              <i
                :class="`yan5 ${
                  ChangeList[v.DID]
                    ? 'yan5-anquanpeixuntubiao_biaoqianxialasanjiao font12'
                    : 'yan5-anquanpeixuntubiao_biaoqianshouqisanjiao font12'
                }`"
              ></i>
              <span class="font14">{{ v.Name }}</span
              >&nbsp;
              <strong>[{{ v.children?.length }}]</strong>
            </van-col>
          </van-row>
          <van-row v-if="ChangeList[v[IDkey]]" class="margin10_top block">
            <Tree :Lists="v.children"></Tree>
          </van-row>
        </van-col>
      </van-row>
      <van-row v-else>
        <van-col span="24" class="card margin10_top" @click="toDetail(v)">
          <van-row class="block" align="center" justify="center">
            <van-col span="24">
              <van-row class="block">
                <van-col span="24">
                  <van-row align="center" justify="space-between">
                    <van-col>
                      <strong class="font15 fc141414"
                        >{{ k + 1 }}.{{ v.Name }}</strong
                      >
                      &nbsp;
                      <span class="fc666666 font13">{{ v.No }}</span>
                      <span v-if="v.Unfix" class="red font12">
                        <i class="yan5 yan5-zuzhijiagou_yichang-xianxing"></i>
                        {{ v.Unfix }}
                      </span>
                    </van-col>
                    <van-col
                      :class="`pt1 pb1 pl3 pr3 ${
                        v.Level == 3 ? 'fc141414' : 'fcffffff'
                      } bc${ShowMapRiskColor[v.Level]
                        .replace('#', '')
                        .toLocaleLowerCase()} `"
                    >
                      {{ ShowMapRiskLevel[v.Level].slice(0, 2) }}
                    </van-col>
                  </van-row>
                </van-col>
                <van-col span="24" class="mt10">
                  <van-row align="center" justify="space-between" class="grey">
                    <van-col class="font13"
                      >责任人:{{ yStore.UserMap[v.MUID]?.Name }}&nbsp;</van-col
                    >
                    <span v-if="v.Freq"
                      >巡检频次：每{{ v.Cycle ? v.Cycle : ""
                      }}{{ ShowMapCycleUnit[v.CycleUnit] }}{{ v.Freq }}次</span
                    >
                  </van-row>
                </van-col>
                <van-col
                  v-if="timeFormat(v.LTime, DateFMT.YMDHm) != '未开始'"
                  span="24"
                  class="mt10 height1 bceaebee"
                ></van-col>
                <van-col
                  v-if="timeFormat(v.LTime, DateFMT.YMDHm) != '未开始'"
                  span="24"
                  class="mt10"
                >
                  <van-row align="center" justify="space-between">
                    <van-col class="font12 flexbetween" span="12">
                      <i class="yan5 yan5-zuzhijiagou_zuijinjiancha font13"></i>
                      <span class="font13 fc434343">{{
                        timeFormat(v.LTime, DateFMT.YMDHm)
                      }}</span>
                      &nbsp;
                      <span class="font13">{{
                        yStore.UserMap[v.LUID]?.Name
                      }}</span>
                      <i
                        :class="`yan5 ${
                          yStore.UserMap[v.LUID]?.Sex
                            ? 'yan5-jianchabiao-_nan-xianxing fc1b6ffe font12'
                            : 'yan5-jianchabiao-_nv-xianxing fcff0000 font12'
                        }`"
                      ></i>
                    </van-col>
                    <van-col class="flexaround" span="10">
                      <span>有隐患{{ v.LUnfix }}</span
                      >&nbsp;<span>已整改{{ v.LFixed }}</span>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </van-col>
            <van-col span="24"></van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
import {
  ShowMapRiskColor,
  ShowMapRiskLevel,
  ShowMapCycleUnit,
} from "@yakj/sdk/sdk/maps";
import { DateFMT, format_date } from "@ctsy/common";
import { timeFormat } from "../api/lib";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../store";
import Tree from "./Tree.vue";

const router = useRouter();
const route = useRoute();
const yStore = useStore();
const Props = defineProps({
  Lists: {
    type: Array<any>,
    default: () => [],
  },
  IDkey: {
    type: String,
    default: "DID",
  },
  ID: {
    type: String,
    default: "RiskID",
  },
});

const ChangeList = ref<{ [index: number]: boolean }>({});
const change = (n: number) => {
  ChangeList.value[n] = !ChangeList.value[n];
};

let EID = 0;
const toDetail = (d: any) => {
  router.push(`/page/${EID}/${d.RiskID}`);
};
onMounted(() => {
  EID = Number(route.params.EID);
});
</script>

<style lang="less">
.pt1 {
  padding-top: 1px;
}
.pb1 {
  padding-bottom: 1;
}
.pl3 {
  padding-left: 3px;
}
.pr3 {
  padding-right: 3px;
}
.height1 {
  border-bottom: 1px solid #eaebee;
}
</style>
