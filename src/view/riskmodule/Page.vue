<template>
  <van-row class="bg block">
    <van-col span="22" offset="1">
      <van-row class="block">
        <van-col span="24">
          <Title
            class="margin20_top"
            TitleIconSize="16"
            EnterIconSize="12"
            EnterSize="13"
            :Title="''"
            @go="router.go(-1)"
          ></Title>
        </van-col>
        <van-col span="24" class="mt20">
          <van-row align="center" justify="space-between">
            <van-col>
              <van-row>
                <van-col
                  ><strong class="font18 fcffffff">{{
                    Result.Name
                  }}</strong></van-col
                >
              </van-row>
              <van-row class="mt15"
                ><van-col span="24">
                  <template v-for="(v, k) in Result.AccidentDIDs" :key="k">
                    <span class="fcffffff">{{ yStore.AccMap[v]?.Name }}</span
                    >&nbsp;
                  </template>
                </van-col>
              </van-row>
            </van-col>
            <van-col>
              <van-row>
                <van-col class="pt5 pr5 pb5 pl5 levels">
                  <strong
                    :class="` font14 ${
                      Result.Level != 3 ? 'fcffffff' : 'fc141414'
                    }`"
                    >{{ ShowMapRiskLevel[Result?.Level] }}</strong
                  >
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="bcffffff mt15 mb15 radius8">
        <van-col span="20" offset="2">
          <van-row align="cemyer" justify="space-between" class="pt15 pb15">
            <van-col class="font13 fc666666 flexcenter"
              ><div class="maybe"></div>
              &nbsp;可能性:{{ ShowMapRiskMaybe[Result.Maybe] }}</van-col
            >
            <van-col class="font13 fc666666 flexcenter"
              ><div class="effect"></div>
              &nbsp;严重性:{{ ShowMapRiskEffect[Result.Effect] }}</van-col
            >
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="bcf7f9fc">
    <van-col span="24">
      <van-row class="borderbottom1">
        <van-col span="22" offset="1">
          <van-row align="center" justify="space-around" class="mt15 mb20">
            <van-col>
              <van-row @click="go">
                <van-col span="24" class="flexcenter"
                  ><div class="bcffffff width36 height36 radius5">
                    <i
                      class="yan5 yan5-xianjieyemian_jianchajilu font24"
                    ></i></div
                ></van-col>
                <van-col span="24" class="font13 fc434343">检查记录</van-col>
              </van-row>
            </van-col>
            <van-col>
              <van-row @click="toDetail(2)">
                <van-col span="24" class="flexcenter"
                  ><div class="bcffffff width36 height36 radius5">
                    <i
                      class="yan5 yan5-xianjieyemian_yinhuantaizhang font24"
                    ></i></div
                ></van-col>
                <van-col span="24" class="font13 fc434343">隐患台账</van-col>
              </van-row>
            </van-col>
            <van-col>
              <van-row @click="toDetail(0)">
                <van-col span="24" class="flexcenter"
                  ><div class="bcffffff width36 height36 radius5">
                    <i
                      class="yan5 yan5-xianjieyemian_chakanxiangqing font24"
                    ></i></div
                ></van-col>
                <van-col span="24" class="font13 fc434343">查看详情</van-col>
              </van-row>
            </van-col>
            <van-col>
              <van-row @click="showQr">
                <van-col span="24" class="flexcenter"
                  ><div class="bcffffff width36 height36 radius5">
                    <i class="yan5 yan5-xianjieyemian_fenxiang font24"></i></div
                ></van-col>
                <van-col span="24" class="font13 fc434343">分享</van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="22" offset="1">
          <Cell Label="责任人" Icon="yan5-xianjieyemian_zerenren">
            <template #value>
              <span
                >{{ yStore.UserMap[Result.MUID]?.Name }}&nbsp;{{
                  yStore.UserMap[Result.MUID]?.Tel
                }}</span
              >
            </template>
          </Cell>
          <Cell
            Label="巡检频次"
            :Value="`每${Result?.Cycle > 1 ? Result.Cycle : ''}${
              ShowMapCycleUnit[Result?.CycleUnit]
            }${Result?.Freq}次`"
            Icon="yan5-xianjieyemian_xunjianpinci"
          >
          </Cell>
          <Cell
            Label="所在位置"
            :Value="Result?.Addr || '暂无'"
            Icon="yan5-xianjieyemian_suozaiweizhi"
          ></Cell>
          <Cell
            Label="所属部门"
            :Value="yStore.OrgMap[OrgIDs]?.Name || '暂无部门'"
            Icon="yan5-xianjieyemian_suoshubumen"
          ></Cell>
        </van-col>
      </van-row>
      <van-row class="fixed">
        <van-col span="24">
          <van-button @click="toDetail(1)" size="large" color="#f2f2f2">
            <div class="flexcenter">
              <i
                class="yan5 yan5-xianjieyemian_kaishijiancha font24 fc1b6ffe"
              ></i>
              &nbsp;<span class="font16 fc1b6ffe font500">开始检查</span>
            </div>
          </van-button>
        </van-col>
      </van-row>
    </van-col>
  </van-row>

  <Qr
    :ShowQr="ShowQr"
    :Name="Result?.Name"
    :EnterName="yStore.Enter?.Simple"
    @change="ShowQr = false"
  ></Qr>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  ShowMapCycleUnit,
  ShowMapRiskLevel,
  ShowMapRiskMaybe,
  ShowMapRiskEffect,
  ShowMapRiskColor,
} from "@yakj/sdk/sdk/maps";
import { wait } from "../../api/lib";
import { useRoute, useRouter } from "vue-router";
import sdk from "@yakj/sdk";
import { EntitySearchRisksReq, EntityRisks } from "@yakj/sdk/sdk/sdk";
import { store, timeout } from "@ctsy/common";
import { useStore } from "../../store";
import Qr from "../../component/Qr.vue";
import Cell from "../../component/Cell.vue";
import Title from "../../component/Title.vue";

const route = useRoute();
const router = useRouter();
const yStore = useStore();

const Color = computed(() => {
  //@ts-ignore
  return ShowMapRiskColor[Result.value?.Level];
});

const EID = computed(() => {
  return Number(route.params.EID);
});
const RiskID = computed(() => {
  return Number(route.params.RiskID);
});
/**
 * 计算所属部门
 */
const OrgIDs = computed(() => {
  let rs = Result.value.OrgIDs;
  let orgs: string[] = [];
  rs?.forEach((v) => orgs.push(yStore.OrgMap[v]?.Name));

  return orgs.join("、");
});
/**
 * 跳转检查记录
 */
function go() {
  location.href = `https://wechat.tansuyun.cn/y5/check/#/check/logdetail/${EID.value}/${Result.value.RiskID}`;
}
/**
 * 跳转导隐患详情
 * @param n
 */
const toDetail = (n: number) => {
  store.set("riskdetail", Result.value);
  store.set("active", n);
  if (Result.value.CheckIDs.length == 1 && n == 1) {
    location.href = `https://wechat.tansuyun.cn/y5/check/#/check/created/${EID.value}/${Result.value.CheckIDs[0]}?OType=Risk&&OID=${RiskID.value}`;
  }
  router.push({
    path: `/detail/${EID.value}/${RiskID.value}`,
  });
};
/**
 *分享二维码开关
 */
const ShowQr = ref(false);
function showQr() {
  ShowQr.value = !ShowQr.value;
}
/**
 * 风险点数据
 */
const Result = ref<EntityRisks>(new EntityRisks());

const MaybeColor = computed(() => {
  return ShowMapRiskColor[6 - Result.value.Maybe];
});
const EffectColor = computed(() => {
  return ShowMapRiskColor[6 - Result.value.Effect];
});

async function search() {
  let rs = await wait(
    sdk.RisksApi.search(
      Object.assign(new EntitySearchRisksReq(), {
        W: { RiskID: Number(route.params.RiskID) },
      })
    )
  );
  Result.value = rs.L[0];
}
const Height = computed(() => {
  let bg = document.querySelector(".bg");
  let fiexd = document.querySelector(".fiexd");
  return window.innerHeight - bg?.clientHeight + "px";
});
onMounted(async () => {
  await search();
  yStore.getAcc();
  await timeout(200);
  for (let i in Result.value) {
    if (i.includes("UID")) {
      //@ts-ignore
      yStore.getAccount(Result.value[i]);
    }
  }
});
</script>
<style scoped lang="less">
.bg {
  background: linear-gradient(180deg, #0086ff 0%, #007aff 100%);
}

.bgwhite {
  background: #fff;
  border-radius: 8px;
}

.levels {
  background: v-bind(Color);
  border-radius: 6px;
}

// .levels {
//   background: #ffd900;
//   border-radius: 6px;
// }

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
  width: 104px;
}

* {
  box-sizing: border-box;
}
:deep(.van-image) {
  > img {
    border-radius: 4px;
  }
}
.Maybe {
  color: #b9b9b9;
}
.more {
  color: #666666;
}
.paddingbottom12 {
  padding-bottom: 0.4vh;
}
.padding17 {
  padding: 0.4vh 17px;
}
.margintop25 {
  margin-top: 1.6vh;
}
.marginbottom40 {
  margin-bottom: 2vh;
}
.radius8 {
  border-radius: 8px;
}
.bcf7f9fc {
  background: #f7f9fc;
}
.width36 {
  width: 36px;
}
.height36 {
  height: 36px;
  line-height: 36px;
}
.radius5 {
  border-radius: 5px;
}
.borderbottom1 {
  border-bottom: 1px solid #e0e3eb;
}
.bcf7f9fc {
  height: v-bind(Height);
}
.fixed {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.maybe,
.effect {
  width: 13px;
  height: 13px;
}
.maybe {
  background: v-bind(MaybeColor);
}
.effect {
  background: v-bind(EffectColor);
}
</style>
