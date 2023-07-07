<template>
  <van-row class="bg">
    <van-col span="22" offset="1">
      <Title
        :Title="Name"
        TitleSize="20"
        TitleIconSize="16"
        EnterSize="13"
        EnterIconSize="12"
        EnterColor="#acd5fdff"
        @go="router.go(-1)"
        class="mt20 mb35"
      ></Title>
      <van-row align="center" justify="space-around" class="white">
        <van-col>
          <van-row>
            <van-col span="24" class="font20">{{ TotalErr }}</van-col>
            <van-col span="24" class="font14 enter">发现隐患</van-col>
          </van-row>
        </van-col>
        <van-col>
          <van-row>
            <van-col span="24" class="font20">{{ TotalUnfix }}</van-col>
            <van-col span="24" class="font14 enter">未整改</van-col>
          </van-row>
        </van-col>
        <van-col>
          <van-row>
            <van-col span="24" class="font20">{{ TotalFixed }}</van-col>
            <van-col span="24" class="font14 enter">已整改</van-col>
          </van-row>
        </van-col>
      </van-row>
      <Search
        :ModelValue="KeyWord"
        Placeholder="请搜索人员姓名"
        @KeywordChange="(s) => (KeyWord = s)"
        class="mt15 mb15"
      ></Search>
    </van-col>
  </van-row>
  <van-row class="body">
    <van-col span="24">
      <van-row class="block bcffffff pt10 pb10 mb20">
        <van-col span="22" offset="1">
          <van-row class="block" align="center" justify="space-between">
            <van-col>
              <DateSelect @cancel="cancel" @confirm="confirm"></DateSelect>
            </van-col>
            <van-col>
              <span class="fc666666 font14">筛选</span>
              <i
                class="ml5 yan5 yan5-anquanpeixuntubiao_shaixuan fc141414 font13"
              ></i>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-list
        v-model:loading="Loading"
        :finished="Finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-row>
          <van-col span="22" offset="1" class="cards">
            <van-row
              v-for="(v, k) in List"
              :key="k"
              align="center"
              class="padding_10_0 borderbottom margin_0_10"
              @click="toDetail(v.CLID)"
            >
              <van-col span="20">
                <van-row class="block"
                  ><van-col class="left" span="24">
                    检查人:{{ yStore.UserMap[v.CUID]?.Name }}
                    <i
                      :class="`yan5 font12 ${
                        yStore.UserMap[v.CUID]?.Sex
                          ? 'yan5-jianchabiao-_nan-mianxing blue'
                          : 'yan5-jianchabiao-_nv-mianxing red'
                      }`"
                    ></i
                  ></van-col>
                  <van-col class="margintop8">
                    {{ timeFormat(v.CTime, DateFMT.YMDHm) }}
                    &nbsp;&nbsp;&nbsp;&nbsp;{{
                      v.Unfix ? `有隐患${v.Unfix + v.Fixed}` : "无隐患"
                    }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                      class="green"
                      >{{ v.Fixed ? `已整改${v.Fixed}` : "" }}</span
                    >
                  </van-col>
                </van-row>
              </van-col>
              <van-col span="4">
                <i class="yan5 yan5-anquanpeixuntubiao_jinru1 font12"></i
              ></van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-list>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  CheckApi,
  EntityCheckLogSearchReq,
  EntityCheckLogSearchRes,
} from "@yakj/sdk/sdk/sdk";
import useDate from "../hooks/Date";
import { useStore } from "../store";
import { format_date, DateFMT, timeout, store } from "@ctsy/common";
import { wait, timeFormat } from "../api/lib";
import Title from "../component/Title.vue";
import Search from "../component/Search.vue";
import DateSelect from "../component/DateSelect.vue";

const route = useRoute();
const router = useRouter();
const yStore = useStore();
const height = computed(() => {
  let bg: any = document.querySelector(".bg");
  return `${window.innerHeight - bg?.clientHeight}px`;
});
const Name = computed(() => {
  let obj = store.get("CheckObj");
  return (route.query.Name && String(route.query.Name)) || obj.Name;
});
const TotalErr = computed(() => {
  let err = 0;
  Reault.value.L.forEach((v) => (err += v.Fixed + v.Unfix));
  return err;
});
const TotalUnfix = computed(() => {
  let unfix = 0;
  Reault.value.L.forEach((v) => (unfix += v.Unfix));

  return unfix;
});
const TotalFixed = computed(() => {
  let fiexd = 0;
  Reault.value.L.forEach((v) => (fiexd += v.Fixed));

  return fiexd;
});
const KeyWord = ref("");
const { STime, ETime } = useDate();
function cancel(d: { s: string | Date; e: string | Date }) {
  STime.value = d.s;
  ETime.value = d.e;
}

function confirm(d: { s: string | Date; e: string | Date }) {
  STime.value = d.s;
  ETime.value = d.e;
}

const SelectCUID = ref(0);
function select(n: Array<any>) {
  SelectCUID.value = n[1];
}
const List = computed(() => {
  let rs = Reault.value.L;
  SelectCUID.value ? (rs = rs.filter((v) => v.CUID == SelectCUID.value)) : true;
  new Date(STime.value).getTime() && new Date(ETime.value)
    ? (rs = rs.filter(
        (v) =>
          new Date(STime.value).getTime() - 60 * 60 * 1000 * 8 <=
            new Date(v.CTime).getTime() &&
          new Date(v.CTime).getTime() <=
            new Date(ETime.value).getTime() + 60 * 60 * 1000 * 16 - 1000
      ))
    : true;
  KeyWord.value.length
    ? (rs = rs.filter((v) => v.Name.includes(KeyWord.value)))
    : true;
  return rs;
});
const Loading = ref(false);
const Finished = ref(false);
let n = 0;
async function onLoad() {
  n++;
  Where.value.N = n * 10;
  await search();
  Loading.value = false;
  Reault.value.T == List.value.length
    ? (Finished.value = true)
    : (Finished.value = false);
}

function toDetail(v: number) {
  router.push(`/check/detail/${EID.value}/${OID.value}/${v}`);
}
const Where = ref(new EntityCheckLogSearchReq());
const Reault = ref(new EntityCheckLogSearchRes());
async function search() {
  Reault.value =
    (await wait(
      CheckApi.logSearch(
        Object.assign(Where.value, { W: { CheckID: OID.value } })
      )
    )) || new EntityCheckLogSearchRes();
  Reault.value.L.map(async (v: any) => {
    if (v.CUID > 0) {
      yStore.getAccount(v.CUID);
    }
  });
}
const ModelValue = computed(() => {
  let modelValue = [
    {
      Name: "检查人",
      Key: "UID",
      Value: "",
      List: [],
    },
  ];
  let arr = Object.values(yStore.UserMap).map((v) => {
    return { Value: v.UID, Name: v.Name };
  });
  //@ts-ignore
  modelValue[0].List = arr;

  return modelValue;
});
const EID = ref(0);
const OID = ref(0);
onMounted(async () => {
  EID.value = Number(route.params.EID);
  OID.value = Number(route.params.OID);
});
</script>
<style lang="less" scoped>
.bg {
  background: linear-gradient(180deg, #0086ff 0%, #007aff 100%);
}
.body {
  min-height: v-bind(height);
  background-color: #f7f9fc;
}
/deep/.van-search {
  padding: 0;
  background-color: #1e8cffff;
  .van-search__content {
    background: transparent;
  }
  .van-search__field .van-field__left-icon,
  .van-field__control,
  .van-cell__value {
    color: #d2e8ffff;
  }
}
.cards {
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 0px 3px rgba(116, 126, 167, 0.2);
  font-size: 13px;
}
.van-button--large {
  height: 33px;
}
.borderbottom {
  border-bottom: 1px solid #e8e8e8ff;
}
.mb35 {
  margin-bottom: 35px;
}
</style>
