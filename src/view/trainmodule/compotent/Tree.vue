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
            <Tree :Lists="v.children" @toDetail="toDetail" @edit="edit"></Tree>
          </van-row>
        </van-col>
      </template>
      <template v-else>
        <van-col span="24" class="cards margintop10" @click="toDetail(v[ID])">
          <van-row class="padding_15_0">
            <van-col class="font14">{{ k + 1 }}.{{ v.Name }}</van-col>
          </van-row>
          <van-row
            align="center"
            justify="space-between"
            class="paddingbottom10"
          >
            <van-col>
              <van-row>
                <van-col span="24" class="font14">{{ v.MemNum }}</van-col>
                <van-col span="24">参训人数</van-col>
              </van-row>
            </van-col>
            <van-col>
              <van-row>
                <van-col span="24" class="font14">{{ v.Times }}</van-col>
                <van-col span="24">培训次数</van-col>
              </van-row>
            </van-col>
            <van-col>
              <van-row class="blue">
                <van-col span="24" class="font14"
                  >{{ Math.floor(v.Seconds / 3600) }}.{{
                    Math.floor(((v.Seconds / 60) % 60) / 60)
                  }}h
                </van-col>
                <van-col span="24">累计时长</van-col>
              </van-row>
            </van-col>
            <van-col>
              <van-row class="green">
                <van-col span="24">
                  <span class="font14 green">{{ v.Rate }}</span> %</van-col
                >
                <van-col span="24">正确率</van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </template>
    </template>
  </van-row>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { DateFMT, format_date } from "@ctsy/common";
import useBaseData from "../hooks/BaseData";
import { timeFormat } from "../api/lib";

const { State } = useBaseData();
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
