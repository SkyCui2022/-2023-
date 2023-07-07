<template>
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
              <van-col
                ><strong class="font15 fontblack"
                  >{{ k + 1 }}.{{ v.Name }}</strong
                ></van-col
              >
              <van-col>
                <van-tag round plain :color="ResultMap[v.Result]">
                  {{ RiskDangerMap[v.Result] }}
                </van-tag>
              </van-col>
            </van-row>
            <van-row class="block" align="center" justify="space-between">
              <van-col span="18">
                <van-row class="blcok">
                  <!-- <van-col span="24" class="left grey maxheight50 ellipsis">
                    {{ v.Memo }}
                  </van-col> -->

                  <van-col span="24" class="textheight">
                    <van-text-ellipsis rows="3" :content="v.Memo" />
                  </van-col>
                  <van-col span="24" class="font12 left"
                    ><i class="yan5 yan5-zuzhijiagou_zuijinjiancha"></i>
                    {{ timeFormat(v.CTime, DateFMT.YMDHm) }}&nbsp;{{
                      yStore.OrgMap[v.OrgID]?.Name
                    }}{{ v.OrgID ? "-" : "" }}
                    {{ yStore.UserMap[v.CUID]?.Name }}
                  </van-col>
                </van-row>
              </van-col>
              <van-col>
                <van-image
                  :src="v.EImgs[0]"
                  @click.stop="
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
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { showImagePreview } from "vant";
import { format_date, DateFMT } from "@ctsy/common";
import { useStore } from "../store";
import { EntityDanger } from "@yakj/sdk/sdk/sdk";
import { timeFormat } from "../api/lib";
const yStore = useStore();
const Props = defineProps({
  Detail: {
    default: [],
    type: Array<EntityDanger>,
  },
});
const Emits = defineEmits(["toDetail"]);
const RiskDangerMap: { [index: number]: string } = {
  1: "未整改",
  2: "待复核",
  3: "已整改",
};
const ResultMap: { [index: number]: string } = {
  1: "#ff7700",
  2: "#1b6ffe",
  3: "#00be96",
};

function toDetail(n: number) {
  Emits("toDetail", n);
}
</script>
<style lang="less" scoped>
.textheight {
  height: 50px;
  max-height: 50px;
  .van-text-ellipsis {
    line-height: 16px;
    color: #666666;
    text-align: left;
  }
}
</style>
