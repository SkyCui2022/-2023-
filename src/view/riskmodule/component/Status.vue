<template>
  <van-row class="block">
    <van-col
      span="24"
      @click="changeActive"
      :class="Active == Key ? 'Actived' : UnActived"
    >
      <van-row :class="`block ${Actived} `">
        <van-col class="font20 font_bold padding_12_0_7_0" span="24">{{
          Length
        }}</van-col>
        <van-col class="font14 padding12_bottom" span="24">{{ Title }}</van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  Title: {
    type: String,
    default: "",
  },
  Length: {
    type: Number,
    default: 0,
  },
  Key: {
    type: Number,
    default: 0,
  },
  Active: {
    type: Number,
    default: 0,
  },
  Actived: {
    type: String,
    default: "",
  },
  UnActived: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["changeActive"]);

function changeActive() {
  emits("changeActive", props.Key);
}
</script>
<style lang="less" scoped>
.smallcard {
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 1px rgba(116, 126, 167, 0.2);
}
.Actived {
  > .smallcard {
    background-color: #fff;
    border: 1px solid;
    border-color: #666666;
    border-radius: 8px;
    box-shadow: 0px 1px 1px rgb(0, 0, 0);
    color: #141414;
  }
  > .smallcard_orange {
    background-color: #fff;
    border: 1px solid;
    border-color: #ff9600ff;
    border-radius: 8px;
    box-shadow: 0px 1px 1px #ff9600ff;
    color: #ff9600ff;
  }
  > .smallcard_blue {
    background-color: #fff;
    border: 1px solid;
    border-color: #1b6ffecc;
    border-radius: 8px;
    box-shadow: 0px 1px 1px #1b6ffecc;
    color: #1b6ffecc;
  }
  > .smallcard_green {
    background-color: #fff;
    border: 1px solid;
    border-color: #00be96ff;
    border-radius: 8px;
    box-shadow: 0px 1px 1px #00be96ff;
    color: #00be96ff;
  }
}
</style>
