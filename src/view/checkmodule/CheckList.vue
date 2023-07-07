<template>
  <van-row class="bg">
    <van-col span="22" offset="1">
      <Title
        class="mt20"
        Title="检查表清单"
        @go="router.go(-1)"
        EnterIconSize="12"
        EnterSize="13"
        EnterIconColor="fcacd5fd"
      ></Title>
      <Search
        Background="#238aff"
        BorderRadius="10px"
        IconColor="#86befe"
        class="mt20"
        @keywordChange="keywordChange"
      ></Search>
    </van-col>
    <van-col span="24" class="bcffffff mt15">
      <van-row class="block pt12 pb12">
        <van-col span="22" offset="1">
          <van-row align="center" justify="space-between">
            <van-col>
              <DateSelect @cancel="cancel" @confirm="confirm"></DateSelect>
            </van-col>
            <van-col
              ><span class="fc666666 font14">筛选</span>
              <i
                class="ml5 yan5 yan5-anquanpeixuntubiao_shaixuan fc141414 font13"
              ></i
            ></van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="body">
    <van-col span="24">
      <Tree
        :ID="'CheckID'"
        :IDKey="'DID'"
        :Lists="Lists"
        @toDetail="toDetail"
      ></Tree>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { wait } from "../api/lib";
import { CheckApi } from "@yakj/sdk/sdk/sdk";
import { array_tree, timeout } from "@ctsy/common";
import useDate from "../hooks/Date";
import { iCondition } from "../api/lib";
import { store } from "@ctsy/common";
import { useStore } from "../store";
import Title from "../component/Title.vue";
import Search from "../component/Search.vue";
import DateSelect from "../component/DateSelect.vue";

const route = useRoute();
const router = useRouter();
const yStore = useStore();

let EID = 0;

const { STime, ETime } = useDate();
function cancel(d: { s: string | Date; e: string | Date }) {
  STime.value = d.s;
  ETime.value = d.e;
}

function confirm(d: { s: string | Date; e: string | Date }) {
  STime.value = d.s;
  ETime.value = d.e;
}

const ModelValue = ref<iCondition[]>([
  {
    Name: "检查人",
    Key: "UID",
    Value: "",
    List: [
      { Name: "人员1", Value: 1 },
      { Name: "人员2", Value: 2 },
    ],
  },
  {
    Name: "创建人",
    Key: "CUID",
    Value: "",
    List: [
      { Name: "创建人1", Value: 1 },
      { Name: "创建人2", Value: 2 },
    ],
  },
  {
    Name: "巡检状态",
    Key: "Status",
    Value: "",
    List: [
      { Name: "无隐患", Value: 1 },
      { Name: "有隐患", Value: 2 },
    ],
  },
]);
const SelectUID = ref(0);
const SelectCUID = ref(0);
const SelectStatus = ref(0);
function select(v: any) {
  switch (v[0]) {
    case 0:
      SelectUID.value = v[1];
      break;
    case 1:
      SelectCUID.value = v[1];
      break;
    case 2:
      SelectStatus.value = v[1];
      break;
  }
}

const height = computed(() => {
  let bg = document.querySelector(".bg");
  //@ts-ignore
  return `${window.innerHeight - bg?.clientHeight}px`;
});

const Reault = ref<any[]>([]);
const Keyword = ref("");
function keywordChange(s: string) {
  Keyword.value = s;
}
const Lists = computed(() => {
  let rs = Reault.value;
  rs.map((v) => {
    v.CheckID && !v.PDID ? (v.PDID = -1) : true;
  });
  new Date(STime.value).getTime() && new Date(ETime.value)
    ? (rs = rs.filter(
        (v) =>
          new Date(STime.value).getTime() - 60 * 60 * 1000 * 8 <=
            new Date(v.LTime).getTime() &&
          new Date(v.LTime).getTime() <=
            new Date(ETime.value).getTime() + 60 * 60 * 1000 * 16 - 1000
      ))
    : true;

  rs = array_tree(rs, {
    pfield: "PDID",
    ufield: "DID",
    sub_name: "children",
  });
  return rs;
});

function toDetail(n: any) {
  router.push(`/check/created/${EID}/${n.CheckID}`);
}

async function search() {
  Reault.value = (await wait(CheckApi.tree(EID))).L;
  Reault.value.push({
    CheckID: 0,
    DID: -1,
    PDID: 0,
    Name: "未分组",
    ItemNum: 0,
    LTime: 0,
    LUID: 0,
    Sort: 0,
    Unfix: 0,
  });
  Reault.value.map(async (v) => yStore.getAccount(v.LUID));
}

onMounted(async () => {
  EID = Number(route.params.EID);
  store.set("EID", EID);
  await search();
  await timeout(1000);
  let arr = Object.values(yStore.UserMap);
  let list: any = [];
  arr.forEach((v: any) => {
    list.push({ Name: v.Name, Value: v.UID });
  });
  ModelValue.value[0].List = ModelValue.value[1].List = list;
});
</script>
<style lang="less" scoped>
.bg {
  background: linear-gradient(180deg, #0086ff 0%, #007aff 100%);
}
.van-search {
  padding: 0;
  background-color: transparent;
  /deep/.van-search__content {
    background: #238aff;
  }
  /deep/.van-search__field .van-field__left-icon {
    color: #86befe;
    font-size: 18px;
  }
  /deep/.van-field__control {
    color: #86befe;
    font-size: 14px;
  }
}
.body {
  min-height: v-bind(height);
  background: #f7f9fc;
  overflow-y: scroll;
}
.pt12 {
  padding-top: 12px;
}
.pb12 {
  padding-bottom: 12px;
}
</style>
