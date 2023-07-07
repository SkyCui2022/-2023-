<template>
  <van-row class="card margintop10" @click="toDetail">
    <van-col span="24">
      <van-row align="center" justify="space-between">
        <van-col class="font14 black"> {{ Key + 1 }}.{{ Name }} </van-col>
        <van-col
          ><i class="yan5 yan5-zuzhijiagou_zuijinjiancha"></i>
          {{ timeFormat(LTime, DateFMT.YMDHm).slice(5) }}</van-col
        >
      </van-row>
      <van-row align="center" justify="space-between" class="mt5">
        <van-col>
          <van-row>
            <van-col span="24"
              ><strong class="font17">{{ Times }}</strong></van-col
            >
            <van-col span="24">检查次数</van-col>
          </van-row>
        </van-col>
        <van-col>
          <van-row>
            <van-col span="24" class="red"
              ><strong class="font17">{{ Err }}</strong></van-col
            >
            <van-col span="24">发现隐患</van-col>
          </van-row>
        </van-col>
        <van-col>
          <van-row>
            <van-col span="24" class="orange"
              ><strong class="font17">{{ Unfix }}</strong></van-col
            >
            <van-col span="24">暂未整改</van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { timeFormat } from "../api/lib";
import { DateFMT } from "@ctsy/common";

const props = defineProps({
  OID: {
    type: Number,
    default: 0,
  },
  Key: {
    type: Number,
    default: 0,
  },
  Name: {
    type: String,
    default: "",
  },
  LTime: {
    type: String || Date,
    default: "",
  },
  Times: {
    type: Number,
    default: 0,
  },
  Err: {
    type: Number,
    default: 0,
  },
  Unfix: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["toDetail"]);
function toDetail() {
  emits("toDetail");
}
</script>
<style lang="less" scoped></style>
