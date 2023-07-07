<template>
  <Head
    :URL="'https://f.tansuyun.cn/api/yan/2023-05-20/创建培训.png'"
    :Name="'安全培训'"
    :PlaceHolder="`搜索培训主题`"
    :SearchColor="'#1557ccb3'"
    class="head"
    :KeyWord="KeyWord"
    @keywordChange="keywordChange"
  ></Head>
  <van-row class="body">
    <van-col span="24">
      <van-row class="bcffffff pt10 pb10 mb20">
        <van-col span="22" offset="1">
          <van-row align="center" justify="space-between">
            <van-col>
              <DateSelect @cancel="cancel" @confirm="confirm"></DateSelect>
            </van-col>
            <van-col class="font14">筛选<van-icon name="filter-o" /></van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="22" offset="1">
          <van-row>
            <van-col>培训列表{{ Result.length }}</van-col>
          </van-row>
          <template v-for="(v, k) in List" :key="k">
            <ListCard
              :ModelValue="v"
              :Key="k"
              @share="share"
              @toDetail="toDetail"
            ></ListCard>
          </template>
        </van-col>
      </van-row>
      <van-row class="block height50">
        <van-col span="24"></van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="fixed_bottom" @click="share">
    <van-col span="24" class="blue height50 flex">
      <i class="yan5 yan5-anquanhuodong_fenxiang font16"></i>
      <div class="width4"></div>
      <span class="font16">分享培训</span>
    </van-col>
  </van-row>
  <Qr
    :ShowQr="ShowShare"
    @change="ShowShare = false"
    :EnterName="EnterName"
    :Name="TrainName"
    :URL="URL"
  ></Qr>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import Head from "../component/Head.vue";
import Condition from "../component/Condition.vue";
import {
  TrainsApi,
  EntitySearchTrainsReq,
  EntitySearchTrainsRes,
  EntityTrains,
} from "@yakj/sdk/sdk/sdk";
import { wait } from "../api/lib";
import useDate from "../hooks/Date";
import Qr from "../component/Qr.vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../store";
import ListCard from "../component/ListCard.vue";
import DateSelect from "../component/DateSelect.vue";

const router = useRouter();
const route = useRoute();
const yStore = useStore();
const Result = ref<EntityTrains[]>([]);
const Height = computed(() => {
  let head = document.querySelector(".head");
  //@ts-ignore
  return `${window.innerHeight - head?.clientHeight}px`;
});

const KeyWord = ref("");
function keywordChange(s: string) {
  KeyWord.value = s;
}

const List = computed(() => {
  let rs: EntityTrains[] = Result.value.filter((v) =>
    v.Name.includes(KeyWord.value)
  );
  new Date(STime.value).getTime() && new Date(ETime.value)
    ? (rs = rs.filter(
        (v) =>
          new Date(STime.value).getTime() - 60 * 60 * 1000 * 8 <=
            new Date(v.LTime).getTime() &&
          new Date(v.LTime).getTime() <=
            new Date(ETime.value).getTime() + 60 * 60 * 1000 * 16 - 1000
      ))
    : true;
  SelectUID.value ? (rs = rs.filter((v) => v.CUID == SelectUID.value)) : true;
  return rs;
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

function toDetail(d: any) {
  router.push(`/train/${d.EID}/${d.TrainID}`);
}

const ShowShare = ref(false);
const EnterName = ref("");
const TrainName = ref("");
const URL = ref("");
/**
 * 分享
 * @param d
 */
function share(d?: any) {
  ShowShare.value = !ShowShare.value;
  TrainName.value = d.Name || "安全培训";
  if (d.TrainID) {
    URL.value = `/train/${d.EID}/${d.TrainID}`;
  }
}

const SelectUID = ref(0);
function selectUser(n: number) {
  SelectUID.value = n;
}

let EID = 0;
let UIDs: number[] = [];
async function search() {
  let rs: EntitySearchTrainsRes = await wait(
    TrainsApi.search(
      Object.assign(new EntitySearchTrainsReq(), {
        W: { PType: 4, EID },
      })
    )
  );
  Result.value = rs.L;
  Result.value.map((v) => {
    if (v.CUID > 0) {
      yStore.getAccount(v.CUID);
    }
  });
}
const ModelValue = computed(() => {
  let modelValue = [
    {
      Name: "创建人",
      Key: "CUID",
      Value: 0,
      List: [],
    },
  ];
  let rs = Object.values(yStore.UserMap).map((v) => {
    return { Value: v.UID, Name: v.Name };
  });
  //@ts-ignore
  modelValue[0].List = rs;
  return modelValue;
});
onMounted(async () => {
  EID = Number(route.params.EID);
  await search();
  EnterName.value = yStore.Enter?.Simple || yStore.Enter?.Name;
});
</script>
<style lang="less" scoped>
.body {
  height: v-bind(Height);
  background-color: #f7f9fcff;
}
.van-button {
  padding: 10px 15px;
  height: 33px;
}
.gary {
  color: #666666ff;
}
.card {
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(116, 126, 167, 0.2);
  border: 0;
}
.width4 {
  height: 100%;
  width: 4px;
}
.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
