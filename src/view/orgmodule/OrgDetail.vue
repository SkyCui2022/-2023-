<template>
  <van-row class="head">
    <van-row class="block" align="center">
      <van-col class="padding_0_20">
        <i
          class="yan5 yan5-anquanpeixuntubiao_fanhui font20"
          @click="router.go(-1)"
        ></i
        >&nbsp;
        <span class="font20">{{ yStore.Enter?.Simple }}</span>
      </van-col>
    </van-row>
    <van-row class="block">
      <template v-for="(v, k) in List" :key="k">
        <van-col span="12" @click="changeActive(k)" class="flex_center">
          <i :class="`yan5 ${Active == k ? v.Actived : v.UnActive} size37`"></i
          >&nbsp;
          <span :class="Active == k ? '' : 'small'">{{ v.Name }}</span>
        </van-col>
      </template>
    </van-row>
  </van-row>
  <van-row class="block bg">
    <template v-if="Active == 0">
      <van-col span="22" offset="1">
        <template v-for="(v, k) in AdminUIDs" :key="k">
          <UserCard :ModelValue="v" :Key="k"></UserCard>
        </template>
      </van-col>
    </template>
    <template v-if="Active == 1">
      <DutyVue :ModelValue="Duty"></DutyVue>
    </template>
  </van-row>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { List } from "../api/Org";
import { useRouter, useRoute } from "vue-router";
import DutyVue from "../component/Duty.vue";
import { store } from "@ctsy/common";
import UserCard from "../component/UserCard.vue";
import { computed } from "@vue/reactivity";
import { useStore } from "../store";

const route = useRoute();
const router = useRouter();
const yStore = useStore();
const AdminUIDs = ref<number[]>([]);
const Duty = ref("");
const Active = ref(0);
function changeActive(n: number) {
  Active.value = n;
}
const BG = computed(() => {
  // return window.innerHeight - 120 + "px";
  return "10px";
});
const OrgID = ref(0);
onMounted(async () => {
  OrgID.value = Number(route.params.OrgID);
  AdminUIDs.value = store.get("orgAdmins");
  let map = store.get("map");
  AdminUIDs.value = map[OrgID.value].AdminUIDs || [];
  Duty.value = store.get("orgDuty");
});
</script>
<style scoped lang="less">
.head {
  width: 100%;
  height: 120px;
  background: linear-gradient(180deg, #0086ff 0%, #007aff 100%);
  color: #fff;
}

.bg {
  height: v-bind(BG);
  background: #f7f9fc;
}
</style>
