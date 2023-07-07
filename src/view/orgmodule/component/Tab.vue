<template>
  <van-row @click="changeActive">
    <van-col span="24">
      <i
        :class="`yan5 ${
          Active == Key ? ModelValue.Actived : ModelValue.UnActive
        } size37`"
      ></i>
    </van-col>
    <van-col
      span="24"
      :class="`font13 pt8 ${Active == Key ? 'fcffffff' : 'fc96cff'}`"
      >{{ ModelValue.Name }}</van-col
    >
  </van-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Tab } from "../api/lib";

const props = defineProps({
  ModelValue: {
    type: Tab,
    default: () => new Tab(),
  },
  Key: {
    type: Number,
    default: 0,
  },
  Active: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["changeActive"]);

function changeActive() {
  emits("changeActive", props.Key);
}
</script>
<style lang="less" scoped></style>
