<template>
  <van-row class="bg block">
    <van-col span="22" offset="1">
      <van-row class="block">
        <van-col span="24">
          <van-row
            align="center"
            justify="space-between"
            class="white margin20_top"
          >
            <van-col @click="router.go(-1)"
              ><i class="yan5 yan5-anquanpeixuntubiao_fanhui font16"></i>
              &nbsp;<span class="font20">{{ Resault?.Name }}</span></van-col
            >
            <van-col class="font13 white_small"
              ><van-icon name="location-o" />{{ yStore.Enter?.Simple }}</van-col
            >
          </van-row>
        </van-col>
        <van-col span="22" offset="1" class="margin20_top">
          <van-row
            align="center"
            justify="space-between"
            @click="showQr(Resault.Name)"
          >
            <van-col offset="1" class="padding_15_20">&nbsp;</van-col>
            <van-col class="white font14"
              ><i class="yan5 yan5-anquanhuodong_fenxiang"></i> 分享</van-col
            >
          </van-row>
        </van-col>
      </van-row>
      <van-row class="block bgwhite">
        <van-col span="22" offset="1">
          <van-row align="center" justify="center">
            <van-col class="backgrouns width120 position_relative top30">
              <van-row class="block margin20">
                <van-col span="24" class="font15">LS辨别结果</van-col>
                <van-col span="24" class="font16 font_bold padding_15_20">{{
                  ShowMapRiskLevel[Resault?.Level]
                }}</van-col>
                <van-col span="24">
                  <van-image
                    :src="Resault?.Head"
                    width="80"
                    height="80"
                  ></van-image>
                </van-col>
              </van-row>
            </van-col>
            &nbsp;&nbsp;
            <van-col span="14">
              <van-row class="block">
                <van-col span="24" class="font18 grey left"
                  >可能性:{{ ShowMapRiskMaybe[Resault?.Maybe] }}</van-col
                >
                <van-col span="24" class="font18 grey left"
                  >严重性:{{ ShowMapRiskEffect[Resault?.Effect] }}</van-col
                >
                <van-col span="24">
                  <template v-for="(v, k) in Resault?.AccidentDIDs" :key="k">
                    <van-tag>{{ ShowMapAccidents[v] }}</van-tag>
                  </template>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
          <van-row class="block padding17_bottom borderline">
            <van-col class="font16 font_bold"> 基本信息 </van-col>
          </van-row>
          <van-row
            class="block padding17 borderline"
            align="center"
            justify="space-between"
          >
            <van-col>责任人</van-col>
            <van-col>
              <van-row class="right">
                <van-col span="24">{{
                  yStore.UserMap[Resault?.MUID]?.Name
                }}</van-col>
                <van-col span="24">{{ Resault?.MUTel }}</van-col>
              </van-row>
            </van-col>
          </van-row>
          <van-row
            align="center"
            justify="space-between"
            class="block padding17 borderline"
          >
            <van-col>巡检频次</van-col>
            <van-col
              >每{{ Resault?.Cycle > 1 ? Resault.Cycle : ""
              }}{{ ShowMapCycleUnit[Resault?.CycleUnit]
              }}{{ Resault?.Freq }}次</van-col
            >
          </van-row>
          <van-row
            align="center"
            justify="space-between"
            class="block padding17 borderline"
          >
            <van-col>所在位置</van-col>
            <van-col>{{ Resault?.Addr || "暂无" }}</van-col>
          </van-row>
          <van-row
            align="center"
            justify="space-between"
            class="block padding17 borderline"
          >
            <van-col>所属部门</van-col>
            <van-col>{{ Resault?.UnitID }}</van-col>
          </van-row>
          <van-row @click="toDetail(0)" class="padding17 blue font16">
            <van-col span="24" class="font16"
              >更多资料 &nbsp;<i
                class="yan5 yan5-anquanpeixuntubiao_xiala-copy"
              ></i
            ></van-col>
          </van-row>
          <van-row>
            <van-col span="24"
              >上次检查：{{ format_date(Resault?.LTime, DateFMT.YMDHm) }}
              {{ Resault?.LUID }}</van-col
            >
          </van-row>
          <van-row
            @click="toDetail(1)"
            class="padding17 margin17 backgrounb white"
            align="center"
            justify="center"
          >
            <van-col
              ><i class="yan5 yan5-fengxiandian_anquanjiancha font24"></i
            ></van-col>
            <van-col class="font16">开始检查</van-col>
          </van-row>
          <van-row
            @click="toDetail(2)"
            class="padding17 margin17 backgroundy"
            align="center"
            justify="center"
          >
            <van-col>
              <i class="yan5 yan5-fengxiandian_yinhuantaizhang font24"></i>
            </van-col>
            <van-col class="font16"> 隐患台账</van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { DateFMT, format_date } from "@ctsy/common";
import {
  ShowMapCycleUnit,
  ShowMapRiskLevel,
  ShowMapRiskMaybe,
  ShowMapRiskEffect,
  ShowMapRiskColor,
  ShowMapAccidents,
} from "@yakj/sdk/sdk/maps";
import get_yan_store from "../../store/yan";
import { showQr, wait } from "../../api/lib";
import { useRoute, useRouter } from "vue-router";
import sdk from "@yakj/sdk";
import { EntitySearchRisksReq } from "@yakj/sdk/sdk/sdk";
import { store } from "@ctsy/api-sdk/dist/lib";

const route = useRoute();
const router = useRouter();
const yStore = get_yan_store();

const Color = computed(() => {
  return ShowMapRiskColor[Resault.value?.Level];
});

const EID = computed(() => {
  return Number(route.params.EID);
});
const RiskID = computed(() => {
  return Number(route.params.RiskID);
});

const toDetail = (n: number) => {
  store.set("riskdetail", Resault.value);
  router.push({
    path: `/detail/${EID.value}/${RiskID.value}`,
    query: {
      Active: n,
    },
  });
};

const Resault = ref();
onMounted(async () => {
  let rs = await wait(
    sdk.RisksApi.search(
      Object.assign(new EntitySearchRisksReq(), {
        W: { RiskID: Number(route.params.RiskID) },
      })
    )
  );
  Resault.value = rs.L[0];
});
</script>
<style scoped lang="less">
.bg {
  background: linear-gradient(180deg, #0086ff 0%, #007aff 100%);
  height: 100vh;
}

.bgwhite {
  background: #fff;
  border-radius: 8px;
}

.background {
  background: v-bind(Color);
  border-radius: 6px 6px 0 0;
}

.backgrouns {
  background: #ffd900;
  border-radius: 6px;
}

.backgroundy {
  background: #f3cc8c;
  border-radius: 25px;
}

.backgrounb {
  background: #1b6ffe;
  border-radius: 25px;
}

.position_absolute {
  position: absolute;
  left: 0;
}

.width120 {
  width: 120px;
}

.top30 {
  top: -30px;
}

* {
  box-sizing: border-box;
}
</style>
