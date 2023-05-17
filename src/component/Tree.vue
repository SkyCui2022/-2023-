<template>
  <van-row>
    <template v-for="(v, k) in Lists" :key="k">
      <template v-if="!v[ID]">
        <van-col span="22" offset="1" class="margin10_top">
          <van-row class="block">
            <van-col
              @click="change(v[IDkey])"
              :class="`left ${ChangeList[v[IDkey]] ? 'blue' : ''}`"
            >
              <i
                :class="`yan5 ${
                  ChangeList[v.DID]
                    ? 'yan5-anquanpeixuntubiao_biaoqianxialasanjiao'
                    : 'yan5-anquanpeixuntubiao_biaoqianshouqisanjiao '
                }`"
              ></i>
              <span class="font14">{{ v.Name }}</span
              >&nbsp;
              <strong>[{{ v.children.length }}]</strong>
            </van-col>
          </van-row>
          <van-row v-if="ChangeList[v[IDkey]]" class="margin10_top">
            <Tree :Lists="v.children"></Tree>
          </van-row>
        </van-col>
      </template>
      <template v-else>
        <van-col span="24" class="card margin10_top" @click="toDetail(v)">
          <van-row class="block" align="center" justify="center">
            <van-col span="4">
              <van-image
                width="40"
                height="40"
                :src="v.Head"
                class="radius"
              ></van-image>
            </van-col>
            <van-col span="20">
              <van-row class="block">
                <van-col span="24">
                  <van-row align="center" justify="space-between">
                    <van-col>
                      <strong class="font15">{{ k + 1 }}.{{ v.Name }}</strong>
                      &nbsp;
                      <span class="grey font13">{{ v.Memo }}</span>
                      <span v-if="v.Error" class="red font12">
                        <i class="yan5 yan5-zuzhijiagou_yichang-xianxing"></i>
                        {{ v.Unfix }}
                      </span>
                    </van-col>
                    <van-col
                      :style="{
                        'background-color': `${ShowMapRiskColor[v.Level]}`,
                        padding: '1px 3px',
                        color: '#141414',
                      }"
                      >{{ ShowMapRiskLevel[v.Level] }}</van-col
                    >
                  </van-row>
                </van-col>
                <van-col span="24">
                  <van-row align="center" justify="space-between" class="grey">
                    <van-col class="font13"
                      >责任人:{{ yStore.UserMap[v.MUID]?.Name }}</van-col
                    >
                    <van-col class="font12"
                      ><i class="yan5 yan5-zuzhijiagou_zuijinjiancha"></i>
                      {{ format_date(v.LTime, DateFMT.YMDHm) }}&nbsp;{{
                        v.UUID
                      }}</van-col
                    >
                  </van-row>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </template>
    </template>
  </van-row>
</template>

<script lang="ts" setup>
import { ref, defineProps, onMounted } from "vue";
import { ShowMapRiskColor, ShowMapRiskLevel } from "@yakj/sdk/sdk/maps";
import { DateFMT, format_date } from "@ctsy/common";
import get_yan_store from "../store/yan";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const yStore = get_yan_store();
const Props = defineProps({
  Lists: {
    type: Array<any>,
    default: [],
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

<style lang="less"></style>
