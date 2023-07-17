<template>
  <van-row class="head">
    <van-row class="block pt20" align="center">
      <van-col class="pl20 pr20">
        <i
          class="yan5 yan5-anquanpeixuntubiao_fanhui font20"
          @click="router.go(-1)"
        ></i
        >&nbsp;
        <span class="font20">{{ UnitName }}</span>
      </van-col>
    </van-row>
    <van-row justify="space-around" class="block pt20 pb20">
      <template v-for="(v, k) in UnitList" :key="v.Name">
        <Tab
          :ModelValue="v"
          @changeActive="changeActive"
          :Key="k"
          :Active="Active"
        ></Tab>
      </template>
    </van-row>
  </van-row>
  <van-row class="bg">
    <van-col span="24">
      <template v-if="Active == 0">
        <template v-for="(v, k) in Mems">
          <User :ModelValue="v" :K="k" :Width="40" :Height="40"></User>
        </template>
      </template>
      <template v-if="Active == 1">
        <van-col span="22" offset="1">
          <template v-for="(v, k) in Risks">
            <RiskCard
              :ModelValue="v"
              :Key="k"
              @toRiskDetail="toRiskDetail"
            ></RiskCard>
          </template>
        </van-col>
      </template>
      <template v-if="Active == 2">
        <Duty :ModelValue="Reasult.Duty"></Duty>
      </template>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { UnitList } from "../api/Org";
import { useRoute, useRouter } from "vue-router";
import Duty from "../component/Duty.vue";
import User from "../component/User.vue";
import RiskCard from "../component/RiskCard.vue";
import useTab from "../hooks/Tab";
import useUser from "../hooks/Users";
import { useStore } from "../store";
import { store } from "@ctsy/common";
import { OrgsApi } from "@yakj/sdk/sdk/sdk";
import { wait } from "../api/lib";
import Tab from "../component/Tab.vue";

const yStore = useStore();
const route = useRoute();
const router = useRouter();
const Reasult = ref({});
const RiskActive = ref(0);

const Mems = ref([]);

const Risks = computed(() => {
  return Reasult.value.Risks.sort((a: any, b: any) => a.Sort - b.Sort);
});

const { Active, changeActive } = useTab();

const { UnitName, Users } = useUser();

function toRiskDetail(n: number) {
  location.href = `https://wechat.tansuyun.cn/y5/risk/#/page/${EID.value}/${Risks.value[n].RiskID}`;
}

const BG = computed(() => {
  let rs = document.querySelector(".head");
  //@ts-ignore
  return `${window.innerHeight - rs?.clientHeight}px`;
});

async function search() {
  let map = store.get("map");
  let rs = await wait(OrgsApi._get(`Orgs/detail/${UnitID.value}`));
  Reasult.value = rs;
  Mems.value = Reasult.value.Mems;
  Mems.value.map((v) => {
    if (v.UID > 0) yStore.getAccount(v.UID);
  });
  UnitName.value = rs.Name;
  Users.value = rs.MUIDs || map[UnitID.value].UIDs;
  Users.value.forEach((item, index) => {
    yStore.getAccount(item);
  });
}

const UnitID = ref(0);
const EID = ref(0);
onMounted(async () => {
  EID.value = Number(route.params.EID);
  UnitID.value = Number(route.params.OrgID);
  await search();
  Users.value.push(Reasult.value.AUID, ...Reasult.value.MUIDs);
  Users.value = [...new Set(Users.value)];
});
</script>
<style scoped lang="less">
.bg {
  min-height: v-bind(BG);
  background: #f7f9fc;
}
</style>
