<template>
  <van-row class="bg">
    <van-col span="22" offset="1">
      <van-row align="center" justify="space-between" class="margin_20_0 white">
        <van-col @click="router.go(-1)" span="16" class="left">
          <van-icon size="20px" name="arrow-left" />&nbsp;&nbsp;
          <span class="font20">{{ Name }}</span>
        </van-col>
        <van-col class="small_blue"
          ><van-icon size="13" name="location-o" />&nbsp;
          <span class="font13">
            {{
              yStore.Enter?.Simple ? yStore.Enter?.Simple : yStore.Enter?.Name
            }}</span
          >
        </van-col>
      </van-row>
      <slot></slot>
      <van-row class="margintop90 marginbottom10">
        <van-col span="22" offset="1">
          <van-search
            input-align="left"
            :placeholder="PlaceHolder"
            :modelValue="KeyWord"
            :clearable="false"
            @update:model-value="keywordChange"
          ></van-search>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useBaseData from "../hooks/BaseData";
import { useStore } from "../store";

const yStore = useStore();
const { State } = useBaseData();
const router = useRouter();

const Props = defineProps({
  Name: {
    default: "",
    type: String,
  },

  URL: {
    default: "",
    type: String,
  },
  KeyWord: {
    default: "",
    type: String,
  },
  PlaceHolder: {
    default: "请输入关键字",
    type: String,
  },
  SearchColor: {
    default: "",
    type: String,
  },
  MarginTop: {
    default: 90,
    type: Number,
  },
});
const emits = defineEmits(["keywordChange"]);

const URL = computed(() => {
  return `URL(${Props.URL})`;
});

const MarginTop = computed(() => {
  return `${Props.MarginTop}px`;
});
let searchcolor = ref("");

function keywordChange(s: string) {
  emits("keywordChange", s);
}
onMounted(() => {
  searchcolor.value = Props.SearchColor;
});
</script>
<style lang="less" scoped>
.bg {
  background-image: v-bind(URL);
  background-size: 100% 100%;
}
.margintop90 {
  margin-top: v-bind(MarginTop);
}
.van-search {
  padding: 0;
  background-color: v-bind(searchcolor);
  border-radius: 10px;
  height: 40px;
  /deep/.van-search__content {
    background-color: transparent;
  }
  /deep/.van-search__field .van-field__left-icon {
    color: white;
  }
  /deep/.van-field__control {
    color: white;
  }
  /deep/.van-search__field {
    padding: 0;
  }
}
</style>
