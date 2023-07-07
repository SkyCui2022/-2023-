<template>
  <van-row class="bg">
    <van-col span="22" offset="1">
      <Title
        :Title="''"
        @go="router.go(-1)"
        TitleColor="#fff"
        TitleSize="20"
        TitleIconSize="18"
        EnterColor="#cee7ffff"
        EnterSize="13"
        EnterIconSize="12"
        class="mt20"
      ></Title>
      <Search
        class="margintop90"
        :KeyWord="Keyword"
        BorderRadius="8px"
        Background="#fff"
        @keywordChange="(s) => (Keyword = s)"
      ></Search>
    </van-col>
  </van-row>
  <van-row class="body">
    <van-col span="24">
      <van-row class="block bcffffff pt10 pb10 boxshadow">
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
      <van-row
        align="center"
        justify="space-around"
        class="padding_16_0 borderbottome8"
      >
        <van-col>
          <van-row
            ><van-col span="24"
              ><strong class="font20">{{ Result.Count }}</strong></van-col
            ></van-row
          >
          <van-row><van-col class="gary6 font14">检查表数量</van-col></van-row>
        </van-col>
        <van-col>
          <van-row
            ><van-col span="24"
              ><strong class="font20">{{ Result.LogCount }}</strong></van-col
            ></van-row
          >
          <van-row><van-col class="gary6 font14">检查次数</van-col></van-row>
        </van-col>
        <van-col>
          <van-row
            ><van-col span="24" class="red"
              ><strong class="font20">{{ Result.Total }}</strong></van-col
            ></van-row
          >
          <van-row
            ><van-col class="gary6 font14 red">发现隐患</van-col></van-row
          >
        </van-col>
        <van-col>
          <van-row
            ><van-col span="24" class="orange"
              ><strong class="font20">{{ Result.Unfix }}</strong></van-col
            ></van-row
          >
          <van-row><van-col class="gary6 font14">暂未整改</van-col></van-row>
        </van-col>
      </van-row>
      <van-row class="block">
        <van-col span="22" offset="1" class="margintop10">
          <van-row class="block">
            <van-col
              @click="change('Risk')"
              :class="`left font16 ${ChangeList['Risk'] ? 'blue' : ''}`"
            >
              <i
                :class="`yan5 ${
                  ChangeList['Risk']
                    ? 'yan5-anquanpeixuntubiao_biaoqianxialasanjiao font12'
                    : 'yan5-anquanpeixuntubiao_biaoqianshouqisanjiao font12'
                }`"
              ></i>
              <span class="font14"
                >风险点检查记录 [{{
                  List.filter((v) => v.OType == "Risk").length
                }}]</span
              >
            </van-col>
          </van-row>
          <template v-if="ChangeList['Risk']">
            <template v-for="(v, k) in List.filter((v) => v.OType == 'Risk')">
              <LogCard
                :Name="v.Name"
                :OID="v.OID"
                :Key="k"
                :LTime="v.LTime"
                :Times="v.Times"
                :Err="v.Err"
                :Unfix="v.Unfix"
                @toDetail="toDetail(v)"
              ></LogCard>
            </template>
          </template>
        </van-col>
        <van-col span="22" offset="1" class="margintop10">
          <van-row class="block">
            <van-col
              @click="change('Post')"
              :class="`left font16 ${ChangeList['Post'] ? 'blue' : ''}`"
            >
              <i
                :class="`yan5 ${
                  ChangeList['Post']
                    ? 'yan5-anquanpeixuntubiao_biaoqianxialasanjiao font12'
                    : 'yan5-anquanpeixuntubiao_biaoqianshouqisanjiao font12'
                }`"
              ></i>
              <span class="font14"
                >岗位检查记录 [{{
                  List.filter((v) => v.OType == "Post").length
                }}]</span
              >
            </van-col>
          </van-row>
          <template v-if="ChangeList['Post']">
            <template v-for="(v, k) in List.filter((v) => v.OType == 'Post')">
              <LogCard
                :Name="v.Name"
                :OID="v.OID"
                :Key="k"
                :LTime="v.LTime"
                :Times="v.Times"
                :Err="v.Err"
                :Unfix="v.Unfix"
                @toDetail="toDetail(v)"
              ></LogCard>
            </template>
          </template>
        </van-col>
        <van-col span="22" offset="1" class="margintop10">
          <van-row class="block">
            <van-col
              @click="change('Craft')"
              :class="`left font16 ${ChangeList['Craft'] ? 'blue' : ''}`"
            >
              <i
                :class="`yan5 ${
                  ChangeList['Craft']
                    ? 'yan5-anquanpeixuntubiao_biaoqianxialasanjiao font12'
                    : 'yan5-anquanpeixuntubiao_biaoqianshouqisanjiao font12'
                }`"
              ></i>
              <span class="font14"
                >工艺检查记录 [{{
                  List.filter((v) => v.OType == "Craft").length
                }}]</span
              >
            </van-col>
          </van-row>
          <template v-if="ChangeList['Craft']">
            <template v-for="(v, k) in List.filter((v) => v.OType == 'Craft')">
              <LogCard
                :Name="v.Name"
                :OID="v.OID"
                :Key="k"
                :LTime="v.LTime"
                :Times="v.Times"
                :Err="v.Err"
                :Unfix="v.Unfix"
                @toDetail="toDetail(v)"
              ></LogCard>
            </template>
          </template>
        </van-col>
        <van-col span="22" offset="1" class="margintop10">
          <van-row class="block">
            <van-col
              @click="change('')"
              :class="`left font16 ${ChangeList[''] ? 'blue' : ''}`"
            >
              <i
                :class="`yan5 ${
                  ChangeList['']
                    ? 'yan5-anquanpeixuntubiao_biaoqianxialasanjiao font12'
                    : 'yan5-anquanpeixuntubiao_biaoqianshouqisanjiao font12'
                }`"
              ></i>
              <span class="font14"
                >日常检查记录 [{{
                  List.filter((v) => v.OType == "Check").length
                }}]</span
              >
            </van-col>
          </van-row>
          <template v-if="ChangeList['']">
            <template v-for="(v, k) in List.filter((v) => v.OType == 'Check')">
              <LogCard
                :Name="v.Name"
                :OID="v.OID"
                :Key="k"
                :LTime="v.LTime"
                :Times="v.Times"
                :Err="v.Err"
                :Unfix="v.Unfix"
                @toDetail="toDetail(v)"
              ></LogCard>
            </template>
          </template>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { wait } from "../api/lib";
import { InfoApi, EntityCheckInfoRes } from "@yakj/sdk/sdk/sdk";
import useDate from "../hooks/Date";
import { DateFMT, format_date, store } from "@ctsy/common";
import { useStore } from "../store";
import Title from ".././component/Title.vue";
import Search from ".././component/Search.vue";
import LogCard from ".././component/LogCard.vue";
import DateSelect from ".././component/DateSelect.vue";

const yStore = useStore();
const route = useRoute();
const router = useRouter();

let EID = 0;

const height = computed(() => {
  let bg: any = document.querySelector(".bg");
  return `${window.innerHeight - bg?.clientHeight}px`;
});

//日期选择
const { STime, ETime } = useDate();
function cancel(d: { s: string | Date; e: string | Date }) {
  STime.value = d.s;
  ETime.value = d.e;
}
function confirm(d: { s: string | Date; e: string | Date }) {
  STime.value = d.s;
  ETime.value = d.e;
}

const ChangeList = ref<{ [index: string]: boolean }>({});
function change(otype: string) {
  ChangeList.value[otype] = !ChangeList.value[otype];
}

const Keyword = ref("");
const List = computed(() => {
  let rs = Result.value.L;
  new Date(STime.value).getTime() && new Date(ETime.value)
    ? (rs = rs.filter(
        (v) =>
          new Date(STime.value).getTime() - 60 * 60 * 1000 * 8 <=
            new Date(v.LTime).getTime() &&
          new Date(v.LTime).getTime() <=
            new Date(ETime.value).getTime() + 60 * 60 * 1000 * 16 - 1000
      ))
    : true;
  Keyword.value.length
    ? (rs = rs.filter((v) => v.Name.includes(Keyword.value)))
    : true;
  return rs;
});
const ModelValue = ref([
  {
    Name: "检查人",
    Key: "UID",
    Value: "",
    List: [
      { Name: "人员1", Value: 1 },
      { Name: "人员2", Value: 2 },
    ],
  },
]);
async function search() {
  Result.value = await wait(
    InfoApi.check(
      EID,
      format_date(new Date("2023-01-01 00:00:00"), DateFMT.YMDHms),
      format_date(new Date(), DateFMT.YMDHms)
    )
  );
}
function toDetail(v: any) {
  store.set("CheckObj", v);
  router.push(`/check/logdetail/${EID}/${v.OID}?Name=${v.Name}`);
}

const Result = ref<EntityCheckInfoRes>(new EntityCheckInfoRes());
onMounted(async () => {
  EID = Number(route.params.EID);
  store.set("EID", EID);
  await search();
});
</script>
<style lang="less" scoped>
.bg {
  background-image: url("https://f.tansuyun.cn/api/yan/2023-05-17/检查记录.jpg");
  background-size: 100% 100%;
}
/deep/.van-search {
  width: 100%;
  padding: 0;
  border-radius: 10px;
  .van-field__left-icon,
  .van-field__control,
  .van-field__control--center {
    color: #498cfe;
  }
}

.body {
  min-height: v-bind(height);
  background-color: #f7f9fc;
}
.line {
  height: 5px;
  background-color: #eaebee;
}
.gary6 {
  color: #666666;
}
.van-button--large {
  height: 33px;
}
.boxshadow {
  box-shadow: 0px 0px 3px rgba(116, 126, 167, 0.2);
}
</style>
