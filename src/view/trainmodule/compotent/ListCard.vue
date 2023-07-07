<template>
  <van-row class="block card mt10">
    <van-col span="24" @click="toDetail(ModelValue)">
      <van-row align="center" justify="space-between">
        <van-col span="22" offset="1">
          <van-row align="center" justify="space-between" class="pt10">
            <van-col class="font15 font_bold left" span="18"
              >{{ Key + 1 }}.{{ ModelValue.Name }}</van-col
            >
            <van-col class="font13"
              >参与人数：<span class="blue">{{
                ModelValue.Nums
              }}</span></van-col
            >
          </van-row>
        </van-col>
        <van-col span="22" offset="1" class="left padding_10_0 bottomline"
          >参训部门/岗位：
          <template v-if="ModelValue.OrgIDs.length">
            <template v-for="(d, i) in ModelValue.OrgIDs" :key="i"
              >{{ yStore.OrgMap[d]?.Name }}
              {{ i == ModelValue.OrgIDs.length - 1 ? "" : "、" }}</template
            >
          </template>
          <template v-else>暂无参训部门/岗位</template>
        </van-col>
      </van-row>
    </van-col>
    <van-col span="24">
      <van-row class="pt10">
        <van-col span="22" offset="1" class="left gary">
          <van-row justify="space-between" class="pb10">
            <van-col
              ><i class="yan5 yan5-anquanpeixuntubiao_qianzi"></i>
              &nbsp;
              {{ timeFormat(ModelValue.CTime, DateFMT.YMDHm) }}&nbsp;{{
                yStore.UserMap[ModelValue.CUID]?.Name
              }}</van-col
            >
            <van-col @click="share(ModelValue)">
              <i class="yan5 yan5-anquanhuodong_fenxiang font14 blue"></i>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { EntityTrains } from "@yakj/sdk/sdk/sdk";
import { useStore } from "../store";
import { timeFormat } from "../api/lib";
import { DateFMT } from "@ctsy/common";

const yStore = useStore();
const props = defineProps({
  ModelValue: {
    type: EntityTrains,
    default: () => new EntityTrains(),
  },
  Key: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(["share", "toDetail"]);

function share(d: EntityTrains) {
  emits("share", d);
}
function toDetail(d: EntityTrains) {
  emits("toDetail", d);
}
</script>
<style lang="less" scoped>
.card {
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(116, 126, 167, 0.2);
  border: 0;
  padding: 0;
}
</style>
