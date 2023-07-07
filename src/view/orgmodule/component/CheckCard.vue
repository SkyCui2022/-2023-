<template>
  <van-row class="check_card" @click="createCheckLog(ModelValue)">
    <van-col span="24">
      <van-row align="bottom" justify="space-between">
        <van-col>
          <van-row>
            <van-col class="neirong">
              <i
                class="yan5 yan5-anquanpeixuntubiao_kaishidati size22 blue"
              ></i></van-col
            >&nbsp;&nbsp;&nbsp;&nbsp;
            <van-col>
              <van-row>
                <van-col class="sort">{{ Key + 1 }}</van-col>
                <van-col offset="1" class="font14">{{
                  ModelValue.Name
                }}</van-col>
              </van-row>
              <van-row class="grey">
                <van-col>检查项:{{ ModelValue.ItemNum }}</van-col
                >&nbsp;&nbsp;
                <van-col
                  >检查频次:每{{ ModelValue.Cycle > 1 ? ModelValue.Cycle : ""
                  }}{{ mapCycle[ModelValue.CycleUnit]
                  }}{{ ModelValue.Freq }}次</van-col
                >
              </van-row>
            </van-col>
          </van-row>
        </van-col>
        <van-col @click="editCheck(Key)">
          <i class="yan5 yan5-zuzhijiagou_gengduo font16"> </i>
        </van-col>
      </van-row>
    </van-col>
    <van-col span="24">
      <van-row class="block">
        <van-col>
          <i class="yan5 yan5-rili1"></i>&nbsp;{{
            timeFormat(ModelValue.LFixTime, DateFMT.YMDHm)
          }}</van-col
        >
        <van-col offset="1"
          >{{ yStore.UserMap[ModelValue.LFixUID]?.Name }}
          <i
            :class="`yan5 ${
              yStore.UserMap[ModelValue.LFixUID]?.Sex
                ? 'yan5-jianchabiao-_nv-xianxing red size12'
                : 'yan5-jianchabiao-_nan-xianxing blue size12'
            }`"
          ></i>
        </van-col>
        <van-col offset="1">
          <template v-if="ModelValue.Unfix"
            >有隐患 {{ ModelValue.Unfix }}</template
          >
          <template v-else>无隐患</template>
        </van-col>
        <van-col offset="1"
          ><template v-if="ModelValue.Fixed"
            >已整改{{ ModelValue.Fixed }}</template
          >
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { useStore } from "../store";
import { PostCheck, mapCycle } from "../api/Org";
import { timeFormat } from "../api/lib";
import { DateFMT } from "@ctsy/common";
import {} from "@yakj/sdk/sdk/maps";

const yStore = useStore();

const props = defineProps({
  ModelValue: {
    type: PostCheck,
    default: () => {},
  },
  Key: {
    type: Number,
    default: 0,
  },
});
const emits = defineEmits(["createCheckLog", "editCheck"]);
function createCheckLog(d: PostCheck) {
  emits("createCheckLog", d);
}
function editCheck(n: number) {
  emits("editCheck", n);
}
</script>
<style lang="less" scoped></style>
