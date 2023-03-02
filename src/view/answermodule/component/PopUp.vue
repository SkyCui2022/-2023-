<template>
  <van-popup
    v-model:show="props.ModelValue"
    position="bottom"
    :style="{ height: '80%' }"
  >
    <van-row class="padding_10_0 flexd_top block">
      <van-col @click="show" offset="1" class="spacing3">
        <span class="blue">
          <i class="iconfont icon-xuanxiang"></i>
          <span class="blue">{{ Active + 1 }}</span>
        </span>
        /{{ props.AnswerList.length }}
      </van-col>
      <van-col
        @click="props.Status ? again() : submit()"
        offset="2"
        :class="`${!props.UnAnswerd ? 'full' : 'gray'}`"
      >
        <i class="iconfont icon-shijuan"></i>
        {{ props.Status ? '再考一次' : '交卷' }}
      </van-col>
      <van-col @click="show" offset="10">
        <i class="iconfont icon-xiangxiazhanhang"></i>
      </van-col>
    </van-row>
    <van-row class="block padding_10_0">
      <van-col span="24">占位</van-col>
    </van-row>
    <van-row>
      <van-col
        v-for="(v, k) in props.AnswerList"
        :key="k"
        @click="edit_answer(k)"
        :class="props.Status?Err.some((i:any)=>v.PQID==i.PQID)?'false':'true':v.Answer!=''||v.PIIDs.length>0?'answerd':Active==k?'actived':'answer'"
      >
        {{ k + 1 }}
      </van-col>
    </van-row>
  </van-popup>
</template>
<script setup lang="ts">
import { defineEmits, defineProps, onMounted,ref } from 'vue'
import { store } from '@ctsy/common'

const Err=ref([] as any)

interface Props {
  ModelValue: boolean
  Active: number
  QusetionsLen: number
  AnswerList: { [index: string]: any }[]
  Status: number
  Flag: number[]
  UnAnswerd: number
}

const props = withDefaults(defineProps<Props>(), {
  ModelValue: false,
  Active: 0,
  QuestionsLen: 0,
  AnswerList: () => [],
  Status: 0,
  Flag: () => [],
  UnAnswerd: 0,
})

const emits = defineEmits(['show', 'submit', 'edit_answer', 'again'])
function show() {
  emits('show')
}
function submit() {
  emits('submit')
}
function edit_answer(n: number) {
  emits('edit_answer', n)
}
function again() {
  emits('again')
}
onMounted(()=>{
  if(store.get('err')){
    Err.value=store.get('err')
  }
})
</script>
<style scoped lang="less"></style>
