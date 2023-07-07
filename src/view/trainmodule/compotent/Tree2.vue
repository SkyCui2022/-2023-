<template>
  <van-row class="block">
    <template v-for="(v, k) in Lists" :key="k">
      <template v-if="!v[ID]">
        <van-col span="24" class="padding10">
          <van-row class="block" align="center" justify="space-between">
            <van-col
              @click="change(v[IDkey])"
              :class="`left ${ChangeList[v[IDkey]] ? 'blue' : ''}`"
            >
              <i
                :class="`yan5 ${
                  ChangeList[v.DID]
                    ? 'yan5-anquanpeixuntubiao_biaoqianxialasanjiao font12'
                    : 'yan5-anquanpeixuntubiao_biaoqianshouqisanjiao font12'
                }`"
              ></i>
              <span class="font14">{{ v.Name }}</span
              >&nbsp;
              <strong class="font15">{{ v.children.length }}</strong>
            </van-col>
            <!-- 操作功能，待定 -->
            <!-- <van-col @click="edit(v, k)">
              <van-icon name="more-o" size="14" />
            </van-col> -->
          </van-row>
          <van-row v-if="ChangeList[v[IDkey]]" class="margin10_top">
            <Tree2
              :Lists="v.children"
              @toDetail="toDetail"
              @edit="edit"
            ></Tree2>
          </van-row>
        </van-col>
      </template>
      <template v-else>
        <van-row class="card block" @click="toDetail(v[ID])">
          <van-col span="4">
            <van-image :src="v.Head" width="60" height="60"></van-image>
          </van-col>
          <van-col span="18" offset="1">
            <van-row class="font14 fc141414">
              {{ v.Name }}
            </van-row>
            <van-row class="font13 fc434343 mt10"
              >创建人：{{ yStore.UserMap[v.CUID]?.Name }}</van-row
            >
            <van-row class="font12 fc666666">{{
              timeFormat(v.CTime, DateFMT.YMD)
            }}</van-row>
          </van-col>
        </van-row>
      </template>
    </template>
  </van-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { DateFMT, format_date } from "@ctsy/common";
import useBaseData from "../hooks/BaseData";
import { timeFormat } from "../api/lib";
import { useStore } from "../store";
import Tree2 from "./Tree2.vue";

const { State } = useBaseData();
const yStore = useStore();
const Props = defineProps({
  Lists: {
    type: Array<any>,
    default: () => [],
  },
  IDkey: {
    type: String,
    default: "DID",
  },
  ID: {
    type: String,
    default: "TrainID",
  },
});
const Emits = defineEmits(["toDetail", "edit"]);

const ChangeList = ref<{ [index: number]: boolean }>({});
const change = (n: number) => {
  ChangeList.value[n] = !ChangeList.value[n];
};

const toDetail = (d: any) => {
  Emits("toDetail", d);
};

const Popup = ref(false);
const edit = (d: any, n: number) => {
  Emits("edit", d);
};

onMounted(() => {});
</script>

<style lang="less" scoped>
.colorgray {
  color: #a1a1a1ff;
}

.height50px {
  height: 50px;
}
.cards {
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0px 0px 3px rgba(116, 126, 167, 0.2);
  padding: 0 12px;
}
</style>
