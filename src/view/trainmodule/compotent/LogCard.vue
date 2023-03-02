<template>
  <van-row class="box" align="bottom">
    <van-col span="12">
      <van-row class="block" align="center">
        <van-col offset="1">
          {{
            format_date(props.ModelValue.CTime, DateFMT.YMDHm)
              ? format_date(props.ModelValue.CTime, DateFMT.YMDHm)
              : '2023-01-01'
          }}
        </van-col>
      </van-row>
      <van-row class="block margin_10_0">
        <van-col offset="1">
          <van-image
            width="32"
            height="32"
            :src="
              props.Avatar
                ? props.Avatar
                : 'https://f.tansuyun.cn/api/yan/img/logo-cycle.svg'
            "
            round
          ></van-image>
        </van-col>
        <van-col offset="1">
          <van-row>
            <span class="blue_small">
              {{ props.Name }}
            </span>
            <i
              :class="`iconfont icon-${props.Sex ? 'man blue' : 'woman red'}  `"
            ></i>
          </van-row>
          <van-row>
            {{ props.ModelValue.PostID }}-{{ props.ModelValue.UnitID }}
          </van-row>
        </van-col>
      </van-row>
    </van-col>
    <van-col span="5" offset="2">
      <van-row align="bottom">
        <span class="font20">
          {{ Math.ceil(props.ModelValue.Seconds / 60) }}
        </span>
        <van-col>分钟</van-col>
      </van-row>
      <van-row>学习时长</van-row>
    </van-col>
    <van-col span="5">
      <van-row align="bottom">
        <span class="font20">{{ props.ModelValue.Score }}</span>
        <van-col>分</van-col>
      </van-row>
      <van-row>学习成绩</van-row>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue'
import { format_date, DateFMT } from '@ctsy/common'
import { EntityTrainLog } from '@yakj/sdk/sdk/sdk'

interface Props {
  ModelValue: EntityTrainLog
  Name: string
  Sex: number
  Avatar: string
}

const props = withDefaults(defineProps<Props>(), {
  ModelValue: () => new EntityTrainLog(),
  Name: '',
  Sex: 0,
  Avatar: 'https://f.tansuyun.cn/api/yan/img/logo-cycle.svg',
})
</script>
<style scoped lang="less"></style>
