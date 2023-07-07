<template>
  <van-row align="center" justify="space-between">
    <van-col class="white font20" @click="router.go(-1)"
      ><i class="yan5 yan5-anquanpeixuntubiao_fanhui"></i>
      {{ props.Name }}</van-col
    >
    <van-col class="small_white font13"
      ><van-icon name="location-o" />&nbsp;{{
        yStore.Enter.Simple || yStore.Enter.Name
      }}</van-col
    >
  </van-row>
</template>
<script setup lang="ts">
import {
  computed,
  defineComponent,
  ref,
  reactive,
  onMounted,
  watch,
} from "vue";
import { SearchResult } from "@ctsy/api-sdk";
import { SearchWhere } from "@ctsy/api-sdk/dist/lib";
import { useRouter } from "vue-router";
import { useStore } from "../store";

const yStore = useStore();
const router = useRouter();

const props = defineProps({
  Name: {
    default: "返回",
    type: String,
  },
});
</script>
<style scoped lang="less">
.white {
  color: white;
}

.small_white {
  color: #acd5fd;
}

* {
  margin: 10px 0;
}
</style>
