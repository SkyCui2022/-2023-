<template>
  <van-row>
    <van-row>
      <van-col span="24">
        <van-search class="backblue" v-model="KeyWord" placeholder="隐患关键字">
          <template #action>
            <van-button size="small">筛选</van-button>
          </template>
        </van-search>
      </van-col>
      <van-col span="22" offset="1">
        <van-row
          class="block margin_15_0"
          align="center"
          justify="space-between"
        >
          <van-col span="5">
            <van-row @click="Active = 0" class="block smallcard">
              <van-col class="font20 font_bold padding_12_0_7_0" span="24">{{
                Detail.length
              }}</van-col>
              <van-col class="font14 padding12_bottom" span="24"
                >全部隐患</van-col
              >
            </van-row>
          </van-col>
          <van-col
            span="5"
            @click="Active == 1 ? (Active = 0) : (Active = 1)"
            :class="Active == 1 ? 'Actived' : 'orange'"
          >
            <van-row class="block smallcard">
              <van-col class="font20 font_bold padding_12_0_7_0" span="24">{{
                Detail.filter((v) => v.Result == 1).length
              }}</van-col>
              <van-col class="font14 padding12_bottom" span="24"
                >未整改</van-col
              >
            </van-row>
          </van-col>
          <van-col
            span="5"
            @click="Active == 2 ? (Active = 0) : (Active = 2)"
            :class="Active == 2 ? 'Actived' : 'blue'"
          >
            <van-row class="block smallcard">
              <van-col class="font20 font_bold padding_12_0_7_0" span="24">{{
                Detail.filter((v) => v.Result == 2).length
              }}</van-col>
              <van-col class="font14 padding12_bottom" span="24"
                >待复核</van-col
              >
            </van-row>
          </van-col>
          <van-col
            span="5"
            @click="Active == 3 ? (Active = 0) : (Active = 3)"
            :class="Active == 3 ? 'Actived' : 'green'"
          >
            <van-row class="block smallcard">
              <van-col class="font20 font_bold padding_12_0_7_0" span="24">{{
                Detail.filter((v) => v.Result == 3).length
              }}</van-col>
              <van-col class="font14 padding12_bottom" span="24"
                >已整改</van-col
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row class="block">
          <van-col class="font13 font_bold margin_10_0">隐患列表 </van-col>
        </van-row>
        <van-row class="block">
          <van-col span="22">
            <template v-for="(v, k) in Detail" :key="k">
              <van-row class="card block" @click="toDetail(k)">
                <van-col span="24">
                  <van-row
                    class="block margin10_bottom"
                    align="center"
                    justify="space-between"
                  >
                    <van-col class="font14">{{ k + 1 }}.{{ v.Name }}</van-col>
                    <van-col
                      :class="
                        v.Result == 1
                          ? 'orange'
                          : v.Result == 2
                          ? 'blue'
                          : v.Result == 3
                          ? 'green'
                          : ''
                      "
                      >{{ RiskDangerMap[v.Result] }}</van-col
                    >
                  </van-row>
                  <van-row class="block" align="center" justify="space-between">
                    <van-col span="18">
                      <van-row class="blcok">
                        <van-col
                          span="24"
                          class="left grey maxheight50 ellipsis"
                        >
                          {{ v.Memo }}
                        </van-col>
                        <van-col span="24" class="font12 left"
                          ><i class="yan5 yan5-zuzhijiagou_zuijinjiancha"></i>
                          {{ format_date(v.CTime, DateFMT.YMDHm) }}&nbsp;
                          {{ yStore.UserMap[v.CUID]?.Name }}</van-col
                        >
                      </van-row>
                    </van-col>
                    <van-col>
                      <van-image
                        :src="v.EImgs[0]"
                        @click="
                          showImagePreview({
                            images: v.EImgs,
                            startPosition: 0,
                          })
                        "
                        width="67"
                        height="67"
                      ></van-image>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </template>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, defineProps, computed, onMounted } from "vue";
import { showImagePreview } from "vant";
import { format_date, DateFMT } from "@ctsy/common";
import get_yan_store from "../../store/yan";
import {
  CheckApi,
  EntityDanger,
  EntityDangerSearchReq,
} from "@yakj/sdk/sdk/sdk";
import { wait } from "../../api/lib";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const yStore = get_yan_store();
const Props = defineProps({
  ModelValue: {
    type: Array<EntityDanger>,
    default: [],
  },
});
const Resault = ref<Array<EntityDanger>>([]);

const KeyWord = ref("");
const Detail = computed(() => {
  return Active.value == 1
    ? Resault.value.filter((v) => v.Result == 1)
    : Active.value == 2
    ? Resault.value.filter((v) => v.Result == 2)
    : Active.value == 3
    ? Resault.value.filter((v) => v.Result == 3)
    : KeyWord.value.length
    ? Resault.value.filter((v) => v.Name.includes(KeyWord.value))
    : Resault.value;
});

function toDetail(n: number) {
  router.push(`/checkdanger/detail/${EID}/${Resault.value[n].CDID}`);
}

const Active = ref(0);
const RiskDangerMap: { [index: number]: string } = {
  1: "未整改",
  2: "待复核",
  3: "已整改",
};
let EID = 0;
onMounted(async () => {
  EID = Number(route.params.EID);
  if (Number(route.params.RiskID)) {
    Resault.value = Props.ModelValue;
  } else {
    Resault.value = (
      await wait(CheckApi.dangerSearch(new EntityDangerSearchReq()))
    ).L;
  }
  console.log(Props.ModelValue);
});
</script>
<style lang="less" scoped>
.backblue {
  background-color: #007aff;
  padding: 0 15px 11px 15px;
}
.smallcard {
  background: #fff;
}
.Actived {
  .smallcard {
    background-color: blue;
  }
  color: #fff;
}
</style>
