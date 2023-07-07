<template>
  <van-row
    class="block margin_10_0 small_white padding12"
    align="center"
    justify="space-between"
  >
    <van-col>
      <van-row align="center">
        <van-col
          ><van-image
            width="40"
            height="40"
            :src="yStore.UserMap[props.ModelValue].Avatar"
          ></van-image
        ></van-col>
        <van-col class="margin10left">
          <van-row class="block"
            ><span class="sort">{{ props.Key + 1 }}</span
            >&nbsp; {{ yStore.UserMap[props.ModelValue].Name }} &nbsp;
            <i
              :class="`yan5 ${
                yStore.UserMap[props.ModelValue].Sex
                  ? 'yan5-jianchabiao-_nv-xianxing red size12'
                  : 'yan5-jianchabiao-_nan-xianxing blue size12'
              }`"
            ></i
            >&nbsp;
          </van-row>
          <!-- <van-row class="block">岗位：{{ props.ModelValue.UnitID }}-{{ props.ModelValue.PostID }}</van-row> -->
        </van-col>
      </van-row>
    </van-col>
    <van-col v-if="$route.meta.show">
      <slot name="edit"
        ><van-icon name="ellipsis" size="20" @click="edit(props.Key)"
      /></slot>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import get_yan_store from "../store/yan";

const yStore = get_yan_store();
interface Props {
  ModelValue: number;
  Key?: number;
}
const props = withDefaults(defineProps<Props>(), {
  ModelValue: 0,
  Key: 0,
});

const emits = defineEmits(["edit"]);

function edit(k: number) {
  emits("edit", k);
}
</script>
<style scoped lang="less"></style>
