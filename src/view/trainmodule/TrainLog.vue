<template>
  <Head
    :Name="'培训记录'"
    :KeyWord="KeyWord"
    :SearchColor="SearchColor"
    :MarginTop="0"
    class="back_blue"
  >
    <van-row align="center" justify="space-around" class="marginbottom10">
      <van-col>
        <van-row>
          <van-col span="24" class="white font21 fontweight">{{
            Result.length
          }}</van-col>
          <van-col span="24" class="font14 small_blue">培训专题</van-col>
        </van-row>
      </van-col>
      <van-col>
        <van-row>
          <van-col span="24" class="white font21 fontweight">{{
            TMemNum
          }}</van-col>
          <van-col span="24" class="font14 small_blue">参训人数</van-col>
        </van-row>
      </van-col>
      <van-col>
        <van-row>
          <van-col span="24" class="white font21 fontweight">{{
            TTimes
          }}</van-col>
          <van-col span="24" class="font14 small_blue">培训次数</van-col>
        </van-row>
      </van-col>
    </van-row>
  </Head>
  <van-row class="body">
    <van-col span="22" offset="1">
      <Tree :Lists="List"></Tree>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, provide } from "vue";
import { TrainsApi, EntitySearchTrainLogReq } from "@yakj/sdk/sdk/sdk";
import { wait } from "../api/lib";
import { useRoute, useRouter } from "vue-router";
import Head from "../component/Head.vue";
import useStore from "../hooks/BaseData";
import { cState } from "../hooks/store";

const route = useRoute();
const router = useRouter();
const { getEnter, getOrg } = useStore();
const List = computed(() => {
  let rs = Groups.value;
  return rs;
});

const KeyWord = ref("");
const SearchColor = ref("#1e8cffff");

const Result = ref<any[]>([]);
const Groups = ref<{ DID: number; Name: string; children: Array<unknown> }[]>(
  []
);

const ChangeList = ref<{ [index: number]: boolean }>({});
const change = (n: number) => {
  ChangeList.value[n] = !ChangeList.value[n];
};

/**
 * 参训人数
 */
const TMemNum = computed(() => {
  let total = 0;
  Result.value.forEach((v) => (total += v.MemNum));
  return total;
});

/**
 * 培训次数
 */
const TTimes = computed(() => {
  let total = 0;
  Result.value.forEach((v) => (total += v.Times));
  return total;
});

/**
 * 计算高度，改变背景色
 */
const height = computed(() => {
  let head = document.querySelector(".bg");
  //@ts-ignore
  return `${window.innerHeight - head?.clientHeight}px`;
});

function toDetail(n: number) {
  cState.Active = 1;
  router.push(`/train/${EID}/${n}`);
}

async function search() {
  let rs = await wait(TrainsApi._get("Trains/info"));
  Result.value = rs.L;
  Result.value.map((v) => {
    if (v.GDID == 0) {
      v.GDID = -1;
    }
  });
  Groups.value = rs.Groups;
  Groups.value = [];
  Groups.value.push({ DID: -1, Name: "未分组", children: [] });
  Groups.value.map((v) => {
    v.children = [];
    v.children = Result.value.filter((z) => z.GDID == v.DID);
  });
}

let EID = 0;
onMounted(async () => {
  EID = Number(route.params.EID);
  // TrainsApi.Host = "http://192.168.31.5:8500";
  await getEnter(EID);
  await getOrg();
  await search();
});
</script>
<style lang="less" scoped>
.body {
  height: v-bind(height);
  background-color: #f7f9fcff;
}

.cards {
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 0px 3px rgba(116, 126, 167, 0.2);
  padding: 0 12px;
}

.font14 {
  font-size: 14px;
  font-weight: 500;
}
</style>
