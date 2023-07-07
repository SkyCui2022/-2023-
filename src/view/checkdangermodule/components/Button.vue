<template>
  <van-row @click="click" class="block">
    <van-button :round="Round" :size="Size" :color="Background">
      <span class="text">{{ Text }}</span>
      <template #icon>
        <i :class="`icon yan5 ${Icon}`"></i>
      </template>
    </van-button>
  </van-row>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { ref } from "vue";
const props = defineProps({
  /**
   * 文本
   */
  Text: {
    typr: String,
    default: "",
  },
  /**
   * icon
   */
  Icon: {
    typr: String,
    default: "",
  },
  /**
   * 圆角
   */
  Round: {
    typr: Boolean,
    default: false,
  },
  /**
   * 按钮尺寸:'large','small','mini'
   */
  Size: {
    typr: String,
    default: "large",
  },
  /**
   * 按钮背景色
   */
  Background: {
    typr: String,
    default: "#fff",
  },
  /**
   * 文本字号
   */
  TextSize: {
    typr: String,
    default: "12",
  },
  /**
   * 文本颜色
   */
  TextColor: {
    typr: String,
    default: "#000",
  },
  /**
   * icon大小
   */
  IconSize: {
    typr: String,
    default: "12",
  },
  /**
   * icon颜色
   */
  IconColor: {
    typr: String,
    default: "#000",
  },
});
const IconSize = computed(() => {
  return props.IconSize + "px";
});
const IconColor = computed(() => {
  return props.IconColor;
});
const TextColor = computed(() => {
  return props.TextColor;
});
const TextSize = computed(() => {
  return props.TextSize + "px";
});

const emits = defineEmits(["click"]);
function click() {
  emits("click");
}
</script>
<style lang="less" scoped>
.icon {
  font-size: v-bind(IconSize);
  color: v-bind(IconColor);
}
.text {
  font-size: v-bind(TextSize);
  color: v-bind(TextColor);
}
</style>
