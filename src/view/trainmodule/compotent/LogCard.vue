<template>
  <van-row class="box" align="bottom">
    <van-col span="12">
      <van-row class="block" align="center">
        <van-col offset="1">
          {{
            timeFormat(ModelValue.LTime, DateFMT.YMDHm)
              ? timeFormat(ModelValue.LTime, DateFMT.YMDHm)
              : "2023-01-01"
          }}
          <span v-if="PaperID" :class="ModelValue.Pass ? 'pass' : 'nopass'">{{
            ModelValue.Pass ? "合格" : "不合格"
          }}</span>
        </van-col>
      </van-row>
      <van-row class="block margin_10_0">
        <van-col offset="1">
          <van-image
            width="32"
            height="32"
            :src="
              Avatar
                ? Avatar
                : 'https://f.tansuyun.cn/api/yan/img/logo-cycle.svg'
            "
            round
          ></van-image>
        </van-col>
        <van-col offset="1">
          <van-row>
            <span class="blue_small">
              {{ ModelValue.Name }}
            </span>
            <i :class="`iconfont icon-${Sex ? 'man blue' : 'woman red'}  `"></i>
          </van-row>
          <van-row v-if="ModelValue.PostID || ModelValue.UnitID">
            {{ State.OrgMap[ModelValue.PostID]?.Name
            }}{{ ModelValue.PostID && ModelValue.UnitID ? "-" : ""
            }}{{ State.OrgMap[ModelValue.UnitID]?.Name }}
          </van-row>
        </van-col>
      </van-row>
    </van-col>
    <van-col span="5" offset="2">
      <van-row align="bottom">
        <span class="font20">
          {{ Math.ceil(ModelValue.Seconds / 60) }}
        </span>
        <van-col>分钟</van-col>
      </van-row>
      <van-row>学习时长</van-row>
    </van-col>
    <van-col span="5" v-if="PaperID">
      <van-row align="bottom">
        <span class="font20">{{ ModelValue.Max }}</span>
        <van-col>分</van-col>
      </van-row>
      <van-row>学习成绩</van-row>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import useBaseData from "../hooks/BaseData";
import { timeFormat } from "../api/lib";
import { DateFMT } from "@ctsy/common";

const { State } = useBaseData();
interface Props {
  ModelValue: {
    UID: number;
    Name: string;
    PostID: number;
    UnitID: number;
    Seconds: number;
    LTime: Date | string;
    Max: number;
    Pass: number;
  };
  Name: string;
  Sex: number;
  Avatar: string;
  PaperID: number;
}

const props = withDefaults(defineProps<Props>(), {
  ModelValue: () => {
    return {
      UID: 0,
      Name: "",
      PostID: 0,
      UnitID: 0,
      Seconds: 0,
      LTime: "",
      Max: 0,
      Pass: 0,
    };
  },
  Name: "",
  Sex: 0,
  Avatar: "https://f.tansuyun.cn/api/yan/img/logo-cycle.svg",
  PaperID: 0,
});
</script>
<style scoped lang="less">
.pass {
  background: #32c846;
  border-radius: 15px;
  color: #ffffff;
  font-size: 12px;
  padding: 2px 5px;
}
.nopass {
  background: #f94545;
  border-radius: 15px;
  color: #ffffff;
  font-size: 12px;
  padding: 2px 5px;
}
</style>
