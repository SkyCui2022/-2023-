<template>
  <van-row class="card">
    <van-col span="24">
      <van-row
        align="center"
        justify="space-between"
        @click="toRiskDetail(Key)"
      >
        <van-col span="3">
          <van-image width="40" height="40" :src="ModelValue.Head"></van-image>
        </van-col>
        <van-col offset="1" span="20">
          <van-row align="center" justify="space-between">
            <van-col class="black">
              <strong class="font15">
                {{ Key + 1 }}.&nbsp;{{ ModelValue.Name }}
              </strong>
              &nbsp;
              <span class="grays">{{
                ModelValue.Type ? ModelValue.No : ""
              }}</span>
            </van-col>
            <van-col>
              <van-tag :color="ColorMap[ModelValue.Level]">
                {{ LevelMap[ModelValue.Level] }}</van-tag
              >
            </van-col>
          </van-row>
          <van-row align="center" justify="space-between">
            <van-col class="grays font13">
              责任人:{{ yStore.UserMap[ModelValue.MUID]?.Name }}
            </van-col>
            <van-col class="grays">
              <i class="yan5 yan5-anquanhuodong_riqi"></i>
              {{ timeFormat(ModelValue.LTime, DateFMT.YMDHm)
              }}{{ yStore.UserMap[ModelValue.LUID]?.Name }}
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { EntityRisks } from "@yakj/sdk/sdk/sdk";
import { DateFMT, format_date } from "@ctsy/common";
import { useStore } from "../store";
import { timeFormat } from "../api/lib";

const yStore = useStore();

interface Props {
  ModelValue: EntityRisks;
  Key: number;
}

const LevelMap = {
  1: "一级",
  2: "二级",
  3: "三级",
  4: "四级",
  5: "五级",
};
const ColorMap = {
  1: "#FF0000",
  2: "#FF7700",
  3: "#FFD800",
  4: "#1B6FFE",
  5: "#00BE96 ",
};
const props = withDefaults(defineProps<Props>(), {
  ModelValue: () => {
    return new EntityRisks();
  },
  Key: 0,
});

const emits = defineEmits(["toRiskDetail"]);

function toRiskDetail(n: number) {
  emits("toRiskDetail", n);
}
</script>
<style scoped lang="less">
.card {
  padding: 12px;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 0px 1.5px rgba(116, 126, 167, 0.2);
  color: #141414;
}

.sort {
  font-size: 12px;
  padding: 0 4px;
  border: 1px solid #cccccc;
  border-radius: 8px;
}

.tag {
  padding: 2px 4px;
  background: #ffef95;
  border-radius: 2px;
}
.black {
  color: #141414;
}
.grays {
  color: #666666ff;
}
</style>
