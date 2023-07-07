<template>
  <van-row class="block">
    <van-col span="24">
      <van-search
        input-align="left"
        :modelValue="KeyWord"
        :placeholder="Placeholder"
        :clearable="false"
        @update:model-value="keywordChange"
      ></van-search>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { ref } from "vue";

const props = defineProps({
  Placeholder: {
    type: String,
    default: "请输入关键字",
  },
  KeyWord: {
    type: String,
    default: "",
  },
  BorderRadius: {
    type: String,
    default: "4px",
  },
  Background: {
    type: String,
    default: "",
  },
  IconColor: {
    type: String,
    default: "",
  },
});

const BorderRadius = computed(() => props.BorderRadius);
const Background = computed(() => props.Background);
const IconColor = computed(() => props.IconColor);
const emits = defineEmits(["keywordChange"]);
function keywordChange(s: string) {
  emits("keywordChange", s);
}
</script>
<style lang="less" scoped>
.van-search {
  padding: 0;
  border-radius: v-bind(BorderRadius);
  background: v-bind(Background);

  :deep(.van-search__content) {
    background: v-bind(Background);
    border-radius: v-bind(BorderRadius);
  }
  :deep(.van-field__left-icon) {
    color: v-bind(IconColor);
  }
}
</style>
