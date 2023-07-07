<template>
  <van-row class="padding_17_0 font15" align="center" justify="space-between">
    <van-col>
      <strong class="fc141414 font15">{{ Title }}</strong>
    </van-col>
    <van-col>
      <slot name="value"
        ><span class="font500 font15">{{ Value }}</span></slot
      >
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { wait, word, timeFormat } from "../api/lib";
import { DateFMT } from "@ctsy/common";

const props = defineProps({
  Title: {
    type: String,
    default: "",
  },
  Value: {
    type: String,
    default: "",
  },
});
</script>
<style lang="less" scoped></style>
