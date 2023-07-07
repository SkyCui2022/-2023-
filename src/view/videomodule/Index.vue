<template>
  <van-row class="head">
    <van-col span="22" offset="1">
      <van-row class="white" align="center" justify="space-between">
        <van-col>
          <van-icon name="arrow-left"></van-icon>
        </van-col>
        <van-col>
          <van-icon name="location-o"></van-icon>{{ yStore.Enter?.Simple }}
        </van-col>
      </van-row>
      <van-row>
        <van-col span="24">
          <van-search
            v-model="Keyword"
            placeholder="请输入视频关键字"
          ></van-search>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="body">
    <van-list
      v-model:loading="Loading"
      :finished="Finished"
      finished-text="没有更多了"
      @load="load"
    >
      <van-col span="24">
        <van-row v-for="(v, k) in Lists">
          <van-col span="22" offset="1">
            <van-row align="center" justify="space-between">
              <van-col offset="1" span="11">
                <van-image :src="v.Head" width="100%"></van-image>
              </van-col>
              <van-col offset="1" span="10">
                <van-row class="van-multi-ellipsis--l2 font14 fontblack">{{
                  v.Name
                }}</van-row>
                <van-row class="font12 fontgray"
                  >上传： {{ format_date(v.CTime, DateFMT.YMD) }}</van-row
                >
                <van-row class="font12 fontgray">播放： {{ v.Total }}</van-row>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-col>
    </van-list>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useStore } from "../store";
import {
  DicsApi,
  EntityDicsSearchReq,
  EntityDicsSearchRes,
  EntityDics,
} from "@yakj/sdk/sdk/sdk";
import { wait } from "../api/lib";
import { format_date, DateFMT } from "@ctsy/common";

const yStore = useStore();
const Keyword = ref("");
const Where = ref<EntityDicsSearchReq>(new EntityDicsSearchReq());
const Result = ref<EntityDics[]>([]);
const Total = ref(0);
const Lists = computed(() => {
  let rs = Result.value;
  if (Keyword.value.length > 0) {
    rs = rs.filter((v) => v.Name.includes(Keyword.value));
  }
  return rs;
});

async function search() {
  let rs: EntityDicsSearchRes = await wait(DicsApi.search(Where.value));
  Total.value = rs.T;
  Result.value = rs.L;
}

let n = 0;
const Loading = ref(false);
const Finished = ref(false);
function load() {
  n++;
  Where.value.N = 10 * n;
  search();
  Loading.value = false;
  if (Result.value.length == Total.value) {
    Finished.value = true;
  }
}
</script>
<style lang="less" scoped></style>
