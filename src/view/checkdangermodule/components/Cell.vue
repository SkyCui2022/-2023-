<template>
  <van-row
    align="center"
    justify="space-between"
    class="block pt19 pb17 borderline"
  >
    <van-col v-slot="label" class="label">
      <slot name="label">
        <i :class="`yan5 ${Icon}`"></i>&nbsp;
        <span class="font16 fc141414"> {{ Label }}</span>
      </slot>
    </van-col>

    <van-col v-slot="value" class="value">
      <slot name="value">
        <span class="fc141414 font16">{{ Value }}</span>
      </slot>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { ref } from "vue";

const props = defineProps({
  Label: {
    type: String,
    default: "",
  },
  Value: {
    type: String,
    default: "",
  },
  LabelSize: {
    type: String,
    default: "15",
  },
  ValueSize: {
    type: String,
    default: "15",
  },
  LabelColor: {
    type: String,
    default: "#141414",
  },
  ValueColor: {
    type: String,
    default: "#141414",
  },
  Icon: {
    type: String,
    default: "",
  },
});
const LabelSize = computed(() => {
  return props.LabelSize + "px";
});
const ValueSize = computed(() => {
  return props.ValueSize + "px";
});
const LabelColor = computed(() => {
  return props.LabelColor;
});
const ValueColor = computed(() => {
  return props.ValueColor;
});
</script>
<style lang="less" scoped>
.label {
  font-size: v-bind(LabelSize);
  color: v-bind(LabelColor);
}
.value {
  font-size: v-bind(ValueSize);
  color: v-bind(ValueColor);
}
.pt19 {
  padding-top: 19px;
}
.pb17 {
  padding-bottom: 17px;
}
</style>
