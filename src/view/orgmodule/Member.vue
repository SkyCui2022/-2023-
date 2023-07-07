<template>
  <van-row class="head">
    <van-col span="22" offset="1">
      <van-row class="block head" align="center" justify="space-between">
        <van-col>
          <van-icon name="arrow-left" size="18"></van-icon>
          &nbsp;
          <span class="font20">员工档案</span>
        </van-col>
        <van-col class="location font13">
          <van-icon name="location-o" />{{ yStore.Enter?.Simple }}</van-col
        >
      </van-row>
    </van-col>
  </van-row>
  <van-row class="body">
    <van-col span="22" offset="1">
      <van-row class="margin_15_0">
        <van-col span="24">
          <van-search
            v-model="Keyword"
            placeholder="请输入人员名称"
          ></van-search>
        </van-col>
      </van-row>
      <van-row
        ><strong class="font15">企业人员 （{{ Total }}）</strong></van-row
      >
      <van-row class="block">
        <van-col span="24">
          <van-list
            v-model:loading="Loading"
            :finished="Finished"
            finished-text="没有更多了"
            @load="load"
          >
            <template v-for="(v, k) in List" :key="k">
              <van-row class="card">
                <van-col class="padding12" span="24">
                  <van-row align="center" justify="space-between">
                    <van-col span="4">
                      <van-image
                        :src="
                          v.Head ||
                          'https://npm.tansuyun.cn/@yakj/y407@0.0.21/dist/img/hoverbtn.02c89e24.svg'
                        "
                        width="40"
                        height="40"
                        :style="{ borderRadius: '4px' }"
                      ></van-image>
                    </van-col>
                    <van-col offset="1" span="19">
                      <van-row class="block" align="cneter">
                        <van-col class="flex">
                          <van-tag plain round
                            ><span class="fontblack">{{ k + 1 }}</span></van-tag
                          ></van-col
                        >
                        <van-col offset="1" class="font15 fontblack">
                          {{ v.Name }}
                        </van-col>
                        &nbsp;
                        <van-col
                          ><i
                            :class="`yan5 ${
                              v.Sex
                                ? 'yan5-jianchabiao-_nan-xianxing boy font12'
                                : 'yan5-jianchabiao-_nv-xianxing girl font12'
                            }`"
                          ></i
                        ></van-col>
                      </van-row>
                      <van-row class="block font13 fontgary">
                        岗位：{{ yStore.OrgMap[v.UnitID]?.Name }}-{{
                          yStore.OrgMap[v.PostID]?.Name
                        }}
                      </van-row>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </template>
          </van-list>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "../store";
import {
  MemberApi,
  EntitySearchMemberReq,
  EntitySearchMemberRes,
  EntityMemberRs,
} from "@yakj/sdk/sdk/sdk";
import { wait } from "../api/lib";
import { useRoute } from "vue-router";
const yStore = useStore();
const route = useRoute();
const Keyword = ref("");

const Result = ref<EntityMemberRs[]>([]);

const List = computed(() => {
  let rs = Result.value;
  Keyword.value.length
    ? (rs = rs.filter((v) => v.Name.includes(Keyword.value)))
    : rs;
  return rs;
});
const Total = ref(0);
const Height = computed(() => {
  return window.innerHeight - 60 + "px";
});

async function search(w: EntitySearchMemberReq) {
  let rs: EntitySearchMemberRes = await wait(MemberApi.search(w));
  Result.value = rs.L;
  Total.value = rs.T;
}

const Finished = ref(false);
const Loading = ref(false);
let n = 0;
async function load() {
  n++;
  let where = new EntitySearchMemberReq();
  where.N = n * 10;
  await search(where);
  Loading.value = false;
  if (Result.value.length == Total.value) {
    Finished.value = true;
  }
}

onMounted(async () => {
  let EID = Number(route.params.EID);
  yStore.getOrg(EID);
});
</script>
<style lang="less" scoped>
.head {
  height: 60px;
}
.body {
  min-height: v-bind(Height);
  background-color: #f7f9fcff;
}
.van-search {
  padding: 0;
  background: #eff4fcff;
  :deep(.van-search__content) {
    background: transparent;
  }
}
.margin_15_0 {
  margin: 15px 0;
}
</style>
