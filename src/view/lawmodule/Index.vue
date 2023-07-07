<template>
  <van-row class="head">
    <van-col span="22" offset="1">
      <van-row align="center" justify="space-between" class="margintop20 white">
        <van-col @click="router.go(-1)">
          <van-icon name="arrow-left" size="16"></van-icon>
        </van-col>
        <van-col
          ><van-icon name="location-o" />{{
            yStore.Enter.Simple || yStore.Enter.Name || ""
          }}</van-col
        >
      </van-row>
      <van-row class="block margintop90">
        <van-col span="24">
          <van-search v-model="Keyword" placeholder="请输入关键字"></van-search>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="bcffffff pt10 pb10">
    <van-col span="22" offset="1">
      <van-row align="center" justify="space-between">
        <van-col
          ><DateSelect @cancel="cancel" @confirm="confirm"></DateSelect
        ></van-col>
        <van-col>
          <span class="font14">筛选</span>&nbsp;<i
            class="yan5 yan5-anquanpeixuntubiao_shaixuan"
          ></i
        ></van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="block body">
    <van-col span="22" offset="1" class="margintop10">
      <van-row
        v-for="(v, k) in List"
        :key="v.Name"
        :class="`margintop10 left ${ChangeList[v.DID] ? 'fontblue' : ''}`"
      >
        <van-col @click="change(v.DID)" class="flexcenter">
          <i
            :class="`yan5 ${
              ChangeList[v.DID]
                ? 'yan5-anquanpeixuntubiao_biaoqianxialasanjiao font12'
                : 'yan5-anquanpeixuntubiao_biaoqianshouqisanjiao  font12'
            }`"
          ></i
          >&nbsp; <span class="font14">{{ v.Name }}</span
          >&nbsp;
          <span>[{{ v.children.length }}]</span>
        </van-col>
        <van-col v-if="ChangeList[v.DID]" span="24">
          <van-row
            v-for="(d, i) in v.children"
            :key="d.LawID"
            @click="toDetail(d.URL)"
            class="block lawcard"
          >
            <van-col span="22" offset="1" class="pt10 pl5 pr5">
              <van-row align="center" justify="space-between">
                <van-col class="font14 fontred"
                  >{{ i + 1 }}.{{ d.Name }}</van-col
                >
                <van-col
                  ><van-tag
                    :color="d.Status ? '#ed2721ff' : '#666666ff'"
                    :text-color="d.Status == 1 ? '#ffd800ff' : ''"
                    size="medium"
                    round
                    >{{ ShowMapLawStatus[d.Status] }}</van-tag
                  ></van-col
                >
              </van-row>
              <van-row class="font12 fontgray margintop12"
                >发布机构：{{ d.POrgName || "未知" }}</van-row
              >
              <van-row class="font12 fontgray margintop9"
                >发布令：{{ d.PID || "无" }}</van-row
              >
              <van-row class="margin_12_0">
                <van-col class="font12 fontblack"
                  >{{ timeFormat(d.PTime, DateFMT.YMD, "颁布日期:无") }}
                  <span v-if="!d.PTime.includes('1970')">颁布</span></van-col
                >
                <van-col class="font12 fontblack" offset="2"
                  >{{ (timeFormat(d.WTime, DateFMT.YMD), "实施日期:无") }}
                  <span v-if="!d.WTime.includes('1970')">实施</span></van-col
                >
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { LawsApi, EntitySearchLawsRes, EntityLaws } from "@yakj/sdk/sdk/sdk";
import { ShowMapLawStatus } from "@yakj/sdk/sdk/maps";
import { wait, timeFormat } from "../api/lib";
import { DateFMT, array_tree } from "@ctsy/common";
import { useStore } from "../store";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
import { showFailToast } from "vant";
import DateSelect from "../component/DateSelect.vue";
import useDate from "../hooks/Date";

const yStore = useStore();
const router = useRouter();
const route = useRoute();
const Keyword = ref("");
const ChangeList = ref<{ [index: number]: boolean }>({});
function change(d: number) {
  ChangeList.value[d] = !ChangeList.value[d];
}

function toDetail(s: string) {
  s.length
    ? (location.href = s)
    : showFailToast("链接失效，请到后台完善信息！");
}

const Height = computed(() => {
  let rs = document.querySelector(".head");
  //@ts-ignore
  return window.innerHeight - rs?.clientHeight + "px";
});
const { STime, ETime } = useDate();
function cancel(d: { s: string | Date; e: string | Date }) {
  STime.value = d.s;
  ETime.value = d.e;
}
function confirm(d: { s: string | Date; e: string | Date }) {
  STime.value = d.s;
  ETime.value = d.e;
}

const Result = ref<EntitySearchLawsRes>(new EntitySearchLawsRes());
const List = computed(() => {
  let rs = Result.value.L;
  new Date(STime.value).getTime() && new Date(ETime.value)
    ? (rs = rs.filter(
        (v) =>
          new Date(STime.value).getTime() - 60 * 60 * 1000 * 8 <=
            new Date(v.CTime).getTime() &&
          new Date(v.CTime).getTime() <=
            new Date(ETime.value).getTime() + 60 * 60 * 1000 * 16 - 1000
      ))
    : true;
  let tree = array_tree(rs, {
    pfield: "PDID",
    ufield: "DID",
    sub_name: "children",
  });
  Keyword.value.length
    ? (tree = tree?.filter((v) => v.Name.includes(Keyword.value)))
    : true;
  return tree;
});

async function search() {
  if (IsTemp.value) {
    Result.value = await wait(LawsApi._get(`Laws/tree?IsTemp=${IsTemp.value}`));
  } else {
    Result.value = await wait(LawsApi.tree());
  }
}

const IsTemp = ref(false);
onMounted(async () => {
  IsTemp.value = Boolean(route.query.IsTemp);
  await search();
});
</script>
<style lang="less" scoped>
.lawcard {
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(116, 126, 167, 0.2);
  margin-top: 10px;
}
.head {
  background-image: url("https://f.tansuyun.cn/api/y5/top_image/law.webp");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.body {
  min-height: v-bind(Height);
  background-color: #f7f9fc;
}
.van-search {
  padding: 0;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 10px;
}
:deep(.van-search__content) {
  border-radius: 10px;
  background-color: #fff;
}
:deep(.van-search__field .van-field__left-icon) {
  color: #ff0000ff;
}
:deep(.van-field__control) {
  color: #ff0000ff;
}
</style>
