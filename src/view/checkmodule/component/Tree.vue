<template>
  <div>
    <template v-for="(v, k) in Lists" :key="k">
      <van-row class="block">
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
                      ? 'yan5-anquanpeixuntubiao_liebiaoxialasanjiao'
                      : 'yan5-anquanpeixuntubiao_biaoqianshouqisanjiao'
                  }`"
                ></i>
                <span class="font14">{{ v.Name }}</span
                >&nbsp;
                <strong>[{{ v.children.length }}]</strong>
              </van-col>
            </van-row>
            <van-row v-if="ChangeList[v[IDkey]]" class="margin10_top">
              <van-col span="24">
                <Tree
                  :Lists="v.children"
                  :ID="ID"
                  :IDkey="IDkey"
                  @toDetail="toDetail"
                ></Tree>
              </van-col>
            </van-row>
          </van-col>
        </template>
        <template v-else>
          <van-col
            span="24"
            class="card margin10_top block"
            @click.stop="toDetail(v)"
          >
            <van-row>
              <van-col span="24" class="left">
                {{ k + 1 }}.{{ v.Name }}</van-col
              >
            </van-row>
            <van-row class="line padding_10_0">
              <van-col>检查项:{{ v.ItemNum }}</van-col>
            </van-row>

            <van-row
              align="center"
              justify="space-between"
              class="padding_10_0"
            >
              <van-col class="font12">
                <i class="yan5 yan5-zuzhijiagou_zuijinjiancha"></i
                >{{ timeFormat(v.LTime, DateFMT.YMDHm) }}&nbsp;&nbsp;{{
                  yStore.UserMap[v.LUID]?.Name
                }}
                <i
                  :class="`yan5 ${
                    yStore.UserMap[v.LUID]?.Sex
                      ? 'yan5-jianchabiao-_nv-xianxing red'
                      : 'yan5-jianchabiao-_nan-xianxing blue'
                  }`"
                ></i>
              </van-col>
              <van-col v-if="v.Unfix"> 未整改{{ v.Unfix }} </van-col>
            </van-row>
          </van-col>
        </template>
      </van-row>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { DateFMT } from "@ctsy/common";
import { useStore } from "../store";
import { timeFormat } from "../api/lib";

const yStore = useStore();
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
const Emits = defineEmits(["toDetail"]);

const ChangeList = ref<{ [index: number]: boolean }>({});
const change = (n: number) => {
  ChangeList.value[n] = !ChangeList.value[n];
};

const toDetail = (d: any) => {
  d ? Emits("toDetail", d) : Emits("toDetail", d[Props.ID]);
};
</script>

<style lang="less" scoped>
hr {
  color: #eaebee;
  background-color: #eaebee;
}
.line {
  border-bottom: 1px solid #eaebee;
}
</style>
