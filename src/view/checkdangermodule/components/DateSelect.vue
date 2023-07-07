<template>
  <van-row>
    <van-col @click="ShowCalendar = !ShowCalendar">
      <span class="font14 fc666666">
        <i class="yan5 yan5-anquanhuodong_riqi font13"></i>
        {{ STime }}&nbsp;至&nbsp; {{ ETime }}
        <i
          class="ml5 yan5 yan5-anquanpeixuntubiao_liebiaoxialasanjiao font12"
        ></i>
      </span>
    </van-col>
  </van-row>
  <van-calendar
    ref="Calendar"
    v-model:show="ShowCalendar"
    type="range"
    :min-date="new Date('2020-01-01')"
  >
    <template #footer>
      <van-row class="block mb10" align="center" justify="space-around">
        <van-col span="8"
          ><van-button size="large" @click="onCancel" round type="danger"
            ><span class="font16">清空</span></van-button
          ></van-col
        >
        <van-col span="8"
          ><van-button size="large" @click="onConfirm" round type="primary"
            ><span class="font16">确定</span></van-button
          ></van-col
        >
      </van-row>
    </template>
  </van-calendar>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import useDate from "../hooks/Date";

const props = defineProps({
  STime: {
    type: String || Date,
    default: "",
  },
  ETime: {
    type: String || Date,
    default: "",
  },
});
const emits = defineEmits(["cancel", "confirm"]);

const { Calendar, ShowCalendar, ETime, STime, onCancel, onConfirm } = useDate();

function cancel() {
  onCancel();
  emits("cancel", { s: STime.value, e: ETime.value });
}
function confirm(d: any) {
  onConfirm();
  emits("confirm", { s: STime.value, e: ETime.value });
}
</script>
<style lang="less" scoped>
:deep(.van-calendar__footer) {
  padding-left: 0;
  padding-right: 0;
  height: 33px;
}
:deep(.van-button--large) {
  height: 33px;
}
</style>
