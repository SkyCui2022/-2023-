<template>
  <van-row @click="change_active" class="flex_column">
    <van-col>
      <i
        :class="`${
          Active == ModelValue.Active ? 'backblue' : 'backbluesmall'
        } yan5 ${ModelValue.Icon} size37  white radius4`"
      ></i>
    </van-col>
    <van-col :class="Active == ModelValue.Active ? 'fc1b6fff' : 'fc666666'">{{
      ModelValue.Text
    }}</van-col>
  </van-row>
</template>
<script setup lang="ts">
interface Props {
  ModelValue: { URL: string; Text: string; Icon: string; Active: number };
  Active: number;
}

const props = withDefaults(defineProps<Props>(), {
  ModelValue: () => {
    return { URL: "", Text: "", Icon: "", Active: 0 };
  },
  Active: 0,
});
const emits = defineEmits(["change_active"]);

function change_active() {
  emits("change_active", props.ModelValue.Active);
}
</script>
<style scoped lang="less">
.white {
  color: #fff;
}
.backbluesmall {
  background-color: #64a4feff;
}
.radius4 {
  border-radius: 4px;
}
</style>
