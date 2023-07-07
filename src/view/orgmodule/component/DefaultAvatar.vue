<template>
  <van-row class="avatar">
    <van-col span="24" v-if="yStore.UserMap[UID].Avatar.length">
      <van-image :src="yStore.UserMap[UID].Avatar"></van-image>
    </van-col>
    <van-col span="24" class="bc1b6fff" v-else>
      <strong class="fcffffff">
        {{
          yStore.UserMap[UID].Name.slice(yStore.UserMap[UID].Name.length - 2)
        }}
      </strong>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useStore } from "../store";

const yStore = useStore();
const props = defineProps({
  UID: {
    type: Number,
    default: 0,
  },
  Width: {
    type: Number,
    default: 0,
  },
  Height: {
    type: Number,
    default: 0,
  },
});
const Width = computed(() => {
  return props.Width + "px";
});
const Height = computed(() => {
  return props.Height + "px";
});
</script>
<style lang="less" scoped>
.avatar {
  width: v-bind(Width);
  height: v-bind(Height);
}
</style>
