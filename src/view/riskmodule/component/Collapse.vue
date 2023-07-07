<template>
  <van-row align="center" justify="space-between" class="padding17 borderline">
    <van-col class="font15 fc1b6fff" @click="show(Key)"
      >{{ Title }}
      <i
        :class="`yan5 ${
          Show
            ? 'yan5-anquanpeixuntubiao_xiala-copy'
            : 'yan5-anquanpeixuntubiao_jinru1'
        }`"
      ></i
    ></van-col>
    <van-col class="font15"> </van-col>
    <van-row class="block margin10_top" v-if:show="Show">
      <template v-if="Text.length">
        <van-col span="24" class="left">
          <span>{{ Text }}</span>
        </van-col></template
      >
      <template v-if="Imgs.length">
        <template v-for="(v, k) in Imgs" :key="k">
          <van-col span="3" offset="1" @click="showImagePreview(Imgs, k)">
            <van-image :src="v" width="100%"></van-image>
          </van-col>
        </template>
      </template>
    </van-row>
  </van-row>
</template>
<script lang="ts" setup>
import { showImagePreview } from "vant";
import { ref } from "vue";

const props = defineProps({
  Title: {
    type: String,
    default: "",
  },
  Text: {
    type: String,
    default: "",
  },
  Imgs: {
    type: Array<string>,
    default: () => [],
  },
  Key: {
    type: Number,
    default: -1,
  },
  Show: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["show"]);

function show(n: number) {
  emits("show", n);
}
</script>
<style lang="less" scoped></style>
