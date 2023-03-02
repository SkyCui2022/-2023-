<template>
  <van-col span="22" offset="1">
    <span class="font14 bold">
      &nbsp;{{ props.k + 1 }}.&nbsp;&nbsp;{{ props.v.Name }}
    </span>
    &nbsp;
    <van-tag plain type="primary">
      {{ props.Type }}
    </van-tag>
  </van-col>
  <template v-if="props.v.Type == 0">
    <van-col
      class="font14 margin_10_top"
      span="22"
      offset="1"
      v-for="(item, index) in props.v.Items"
      :key="index"
    >
      <i
        :class="`iconfont icon-${
          props.AnswerList[props.k].PIIDs.includes(item.PIID)
            ? item.Right
              ? 'zhengque font16 green'
              : 'cuowu font16 red'
            : 'weixuanzhong'
        }`"
      ></i>
      {{ item.Name }}
    </van-col>
  </template>
  <template v-if="props.v.Type == 1">
    <van-col
      class="font14 margin_10_top"
      span="22"
      offset="1"
      v-for="(item, index) in props.v.Items"
      :key="index"
    >
      <i
        :class="`iconfont icon-${
          props.AnswerList[props.k].PIIDs.includes(item.PIID)
            ? item.Right
              ? 'zhengque font16 green'
              : 'cuowu font16 red'
            : 'weixuanzhong'
        }`"
      ></i>
      {{ item.Name }}
    </van-col>
  </template>
  <template
    v-for="(item, index) in props.v.Items"
    :key="index"
    v-if="props.v.Type == 2"
  >
    <van-col class="font14 margin_10_top" span="22" offset="1">
      <i
        :class="`iconfont icon-${
          AnswerList[props.k].PIIDs.includes(item.PIID)
            ? item.Right
              ? 'zhengque font16 green'
              : 'cuowu font16 red'
            : 'weixuanzhong'
        }`"
      ></i>
      正确
    </van-col>
    <van-col class="font14 margin_10_top" span="22" offset="1">
      <i
        :class="`iconfont icon-${
          props.AnswerList[props.k].PIIDs.includes(item.PIID)
            ? item.Right
              ? 'zhengque font16 green'
              : 'cuowu font16 red'
            : 'weixuanzhong'
        }`"
      ></i>
      错误
    </van-col>
  </template>
  <template v-if="v.Type == 3">
    <van-col span="22" offset="1">
      {{ props.AnswerList[props.k].Answer }}
    </van-col>
  </template>
  <van-row class="block margin_10_top">
    <van-col span="22" offset="1" class="back_gray blue padding_6_9 font14">
      正确答案：
      <template v-for="(d, i) in props.v.Items" :key="i">
        {{ d.Right == 1 ? `${d.Name}` : '' }}{{ v.Type == 1 ? '; ' : '' }}
      </template>
    </van-col>
  </van-row>
  <van-row class="margin_10_top" v-if="props.v.Memo">考题解析</van-row>
  <van-row>
    <van-col>{{ props.v.Memo }}</van-col>
  </van-row>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, onMounted, ref } from 'vue'
import { EntityPaperQuestion } from '@yakj/sdk/sdk/sdk'

interface Props {
  v: EntityPaperQuestion
  k: number
  Type: string
  AnswerList: { [index: string]: any }[]
}
const props = withDefaults(defineProps<Props>(), {
  v: () => {
    return new EntityPaperQuestion()
  },
  k: 0,
  Type: '',
  AnswerList: () => [],
})
</script>
<style scoped lang="less"></style>
