<template>
  <van-row class="foot">
    <van-row class="block">
      <van-col @click="show" span="5" class="font14 spacing3">
        <span class="blue">
          <i class="iconfont icon-xuanxiang"></i>
          {{ props.Active + 1 }}
        </span>
        /{{ props.QusetionsLen }}
      </van-col>
      <van-col
        @click="props.Status ? again() : submit()"
        span="5"
        :class="`font14  spacing3 ${!props.UnAnswerd ? 'full' : 'gray'}`"
      >
        <i class="iconfont icon-shijuan"></i>
        {{ props.Status ? '再考一次' : '交卷' }}
      </van-col>
      <van-col span="13">
        <van-row>
          <van-col
            @click="up"
            span="12"
            class="back_blue_small white font15 up"
          >
            <van-icon name="arrow-left" />
            上一题
          </van-col>
          <van-col @click="next" span="12" class="back_blue white font15 next">
            下一题
            <van-icon name="arrow" />
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </van-row>
</template>
<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

interface Props {
  ModelValue: boolean
  Active: number
  QusetionsLen: number
  Status: number
  UnAnswerd: number
}

const props = withDefaults(defineProps<Props>(), {
  ModelValue: false,
  Active: 0,
  QuestionsLen: 0,
  Status: 0,
  UnAnswerd: 0,
})

const emits = defineEmits(['show', 'submit', 'next', 'up', 'again'])

function show() {
  emits('show')
}
function submit() {
  emits('submit')
}
function next() {
  emits('next')
}
function up() {
  emits('up')
}
function again() {
  emits('again')
}
</script>
<style scoped lang="less"></style>
