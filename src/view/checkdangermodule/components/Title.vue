<template>
  <van-row align="center" justify="space-between">
    <van-col class="titlecolor">
      <van-icon
        @click="go"
        name="arrow-left"
        :size="TitleIconSize"
        v-if="ShowArrow"
      ></van-icon
      >&nbsp;
      <span class="titlesize">{{ Title }}</span>
    </van-col>
    <van-col v-if="ShowEnter" class="entercolor">
      <van-icon
        name="location-o"
        :size="EnterIconSize"
        v-if="ShowLocation"
      ></van-icon
      >&nbsp;<span class="entersize">{{ yan.Enter.Simple }}</span>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useStore } from "../store";

const yan = useStore();
const props = defineProps({
  Title: {
    type: String,
    default: "标题名称",
  },
  ShowArrow: {
    type: Boolean,
    default: true,
  },
  ShowLocation: {
    type: Boolean,
    default: true,
  },
  ShowEnter: {
    type: Boolean,
    default: true,
  },
  TitleColor: {
    type: String,
    default: "#fff",
  },
  TitleIconSize: {
    type: String,
    default: "18",
  },
  TitleSize: {
    type: String,
    default: "18",
  },
  EnterColor: {
    type: String,
    default: "#fff",
  },
  EnterIconSize: {
    type: String,
    default: "16",
  },
  EnterSize: {
    type: String,
    default: "16",
  },
});

const TitleColor = ref("#fff");
const TitleSize = ref("");
const EnterColor = ref('"#cee7ff"');
const EnterSize = ref("0");
const emits = defineEmits(["go"]);

function go() {
  emits("go");
}
onMounted(() => {
  TitleColor.value = props.TitleColor;
  TitleSize.value = props.TitleSize + "px";
  EnterColor.value = props.EnterColor;
  EnterSize.value = props.EnterSize + "px";
});
</script>
<style lang="less" scoped>
.titlecolor {
  color: v-bind(TitleColor);
}
.titlesize {
  font-size: v-bind(TitleSize);
}
.entercolor {
  color: v-bind(EnterColor);
}
.entersize {
  font-size: v-bind(EnterSize);
}
</style>
