<template>
  <van-row v-for="(v, k) in props.ModelValue" :key="k" class="bottom_line block padding_10_15">
    <van-row justify="space-between" :class="
      v.Result
        ? 'bottom_line paddingbottom10 width100 block marginbottom10'
        : 'block'
    ">

      <van-col :class="v.Result ? 'red left' : 'left'">
        <i :class="`iconfont icon-${v.Result ? 'cuowu red' : 'zhengqve green'
          } font18`"></i> {{ k + 1 }}. {{ v.Name }}
      </van-col>
    </van-row>
    <van-row v-if="v.EMemo && v.Result" class="box_red radius4 red block marginbottom10">
      <van-field v-model="v.EMemo" autosize type="textarea" disabled></van-field>
    </van-row>
    <van-row v-if="v.EImgs" justify="space-between" class="block">
      <van-col>
        <template v-for="(d, i) in v.EImgs">
          <van-image :src="d" width="43" height="43" fit="fill" @click="ImagePreview(v.EImgs, i)"
            class="padding2"></van-image>
        </template>
      </van-col>
      <van-col span="5" v-if="v.Result">
        <van-button color="#EFF4FC" size="small" class="rectify" @click="toRectify">
          去整改>
        </van-button>
      </van-col>
    </van-row>
  </van-row>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue'
import { EntitySingleCheckDetailItem } from '@yakj/sdk/sdk/sdk'
import { ImagePreview } from 'vant'
interface Props {
  ModelValue: EntitySingleCheckDetailItem[] | any
}
const props = withDefaults(defineProps<Props>(), {
  ModelValue: () => [],
})

const emits = defineEmits(['toRectify'])

function toRectify() {
  emits('toRectify')
}
</script>
<style scoped lang="less">
.block {
  width: 100%;
}

.bottom_line {
  border-bottom: 1px solid #e8e8e8;
}

.padding_10_15 {
  padding: 10px 15px;
}

.bottom_line {
  border-bottom: 1px solid #e8e8e8;
}

.paddingbottom10 {
  padding-bottom: 10px;
}

.width100vw {
  width: 100vw;
}

.marginbottom10 {
  margin-bottom: 10px;
}

.box_red {
  border: 1px solid red;
}

.radius4 {
  border-radius: 4px;
}

.red {
  color: red;
}

.marginbottom10 {
  margin-bottom: 10px;
}

.rectify {
  /deep/.van-button__text {
    color: #1b6ffe;
  }
}

.green {
  color: #32c846;
}

.font18 {
  font-size: 18px;
}

.padding2 {
  padding: 0 2px;
}
</style>
