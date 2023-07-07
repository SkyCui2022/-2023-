<template>
  <van-row class="head">
    <van-row class="block pt20" align="center">
      <van-col class="pl20 pr20">
        <i
          class="yan5 yan5-anquanpeixuntubiao_fanhui font20"
          @click="router.go(-1)"
        ></i
        >&nbsp;
        <span class="font20">{{ UnitName }}-{{ PostName }}</span>
      </van-col>
    </van-row>
    <van-row justify="space-around" class="block pt20 pb20">
      <template v-for="(v, k) in PostList" :key="k">
        <Tab
          :ModelValue="v"
          @changeActive="changeActive"
          :Key="k"
          :Active="Active"
        ></Tab>
      </template>
    </van-row>
  </van-row>
  <van-row class="block bg">
    <van-col span="24">
      <template v-if="Active == 0">
        <template v-for="(v, k) in Result.Data" :key="k">
          <van-row>
            <van-col span="22" offset="1">
              <van-row class="block">
                <van-row
                  :class="` ${k !== 0 ? 'block list' : 'block unlist'}`"
                  align="center"
                  justify="space-between"
                  @click="ShowData[k] = !ShowData[k]"
                >
                  <van-col class="font15">{{ mapType[v.Type] }}</van-col>
                  <van-col>
                    <i
                      :class="`yan5 ${
                        ShowData[k]
                          ? 'yan5-anquanpeixuntubiao_xiala-copy size12'
                          : 'yan5-anquanpeixuntubiao_jinru1 size12'
                      }`"
                    ></i>
                  </van-col>
                </van-row>
                <template v-if:show="ShowData[k]">
                  <van-row class="padding20bottom" v-html="v.Memo"></van-row>
                </template>
              </van-row>
            </van-col>
          </van-row>
        </template>
        <template v-if="Result.Checks?.length">
          <van-col span="22" offset="1">
            <van-row class="font15">检查表</van-row>
            <template v-for="(v, k) in Result.Checks" :key="k">
              <CheckCard
                :ModelValue="v"
                :Key="k"
                @editChaek="editCheck"
                @createCheckLog="createCheckLog"
              ></CheckCard>
            </template>
          </van-col>
        </template>
        <template v-if="Result.SafeTrains?.length">
          <van-col span="22" offset="1">
            <van-row class="font15">安全培训</van-row>
            <template v-for="(v, k) in Result.SafeTrains" :key="k">
              <van-row class="check_card" align="center">
                <van-col span="12"
                  ><van-image :src="v.Head"></van-image
                ></van-col>
                <van-col span="12">
                  <van-row class="font14 left">{{ v.Name }}</van-row>
                  <van-row class="font13"
                    >类型：{{ mapPType[v.PType] }}</van-row
                  >
                  <van-row class="block"></van-row>
                  <van-row
                    class="font12"
                    align="center"
                    justify="space-between"
                  >
                    <van-col>{{ timeFormat(v.LTime, DateFMT.YMDHm) }}</van-col>
                    <van-col @click="editTrain(k)">
                      <i class="yan5 yan5 yan5-zuzhijiagou_gengduo font16"></i>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </template>
          </van-col>
        </template>
      </template>
      <template v-if="Active == 1">
        <template v-for="(v, k) in Result.Mems" :key="k">
          <User :ModelValue="v" :K="k" :Width="40" :Height="40"></User>
        </template>
      </template>
      <template v-if="Active == 2">
        <van-empty class="block"> 页面升级中，敬请期待！</van-empty>
      </template>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { PostList, mapType, mapCycle, mapPType, Detail } from "../api/Org";
import { useRoute, useRouter } from "vue-router";
import useTab from "../hooks/Tab";
import User from "../component/User.vue";
import { OrgsApi } from "@yakj/sdk/sdk/sdk";
import { wait, timeFormat } from "../api/lib";
import { DateFMT } from "@ctsy/common";
import { useStore } from "../store";
import Tab from "../component/Tab.vue";
import CheckCard from "../component/CheckCard.vue";

const yStore = useStore();
const route = useRoute();
const router = useRouter();
const PostName = ref("");
const OrgID = ref(0);
const Result = ref(new Detail());
const ShowData = ref([] as boolean[]);
const BG = computed(() => {
  return window.innerHeight - 144 + "px";
});

const { Active, changeActive } = useTab();

const CheckEditShow = ref(false);
const TrainEditShow = ref(false);
const CheckActive = ref(0);
const TrainActive = ref(0);
function editCheck(n: number) {
  CheckEditShow.value = !CheckEditShow.value;
  CheckActive.value = n;
}
function editTrain(n: number) {
  TrainEditShow.value = !TrainEditShow.value;
  TrainActive.value = n;
}

async function search() {
  let rs = await wait(OrgsApi._get(`Orgs/detail/${OrgID.value}`));
  Result.value = rs;
  Result.value.Data = [
    {
      Type: 0,
      Memo: rs.DataMemo,
    },
    {
      Type: 1,
      Memo: rs.DataText,
    },
    {
      Type: 2,
      Memo: rs.Scene,
    },
  ];
  Result.value.Data.forEach((item) => ShowData.value.push(false));
  Result.value.MUIDs.forEach((item) => {
    yStore.getAccount(item);
  });
}

function createCheckLog(d: any) {
  location.href = `https://wechat.tansuyun.cn/y5/check/#/check/created/${EID.value}/${d.CheckID}?OType=Risk&OID=${OrgID.value}`;
}

const EID = ref(0);
const UnitName = ref("");
onMounted(async () => {
  OrgID.value = Number(route.params.OrgID);
  PostName.value = String(route.query.PostName);
  UnitName.value = String(route.query.UnitName);
  EID.value = Number(route.params.EID);
  await search();
});
</script>
<style scoped lang="less">
.bg {
  height: v-bind(BG);
  background: #f7f9fc;
}
</style>
