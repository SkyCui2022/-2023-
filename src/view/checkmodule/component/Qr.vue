<template>
  <van-overlay :show="ShowQr" @click="change">
    <van-row class="block middle">
      <van-col span="20" class="white back_blue radius10" offset="2">
        <van-row>
          <template v-if="EnterName"
            ><van-col span="18" offset="3">
              <van-row
                align="center"
                justify="space-between"
                class="margin_30_0_18_0"
              >
                <van-col>
                  <i class="yan5 yan5-zuzhijiagou_erweimaye-qiye font22"></i>
                  &nbsp;
                  <span class="font18">{{ EnterName }}</span>
                </van-col>
                <van-col class="font13 white">
                  {{ timeFormat(new Date(), DateFMT.YMDHm) }}
                </van-col>
              </van-row>
            </van-col></template
          >
          <template v-else>
            <van-col span="22" offset="1">
              <van-row
                align="center"
                justify="space-between"
                class="margin_30_0_18_0"
              >
                <van-col span="24">
                  <i class="yan5 yan5-zuzhijiagou_erweimaye-qiye font22"></i>
                  &nbsp;
                  <span class="font18">{{
                    EnterName.length >= 12
                      ? `${EnterName.substring(0, 12)}...`
                      : EnterName
                  }}</span>
                </van-col>
                <van-col class="font13" span="24">
                  {{ format_date(new Date(), DateFMT.YMDHm) }}
                </van-col>
              </van-row>
            </van-col>
          </template>
          <van-col span="20" offset="2" class="relative backwhite">
            <van-row>
              <van-col span="24">
                <van-image
                  :src="`${
                    'https://v1.api.tansuyun.cn/_data/Svg/qr?p=' +
                    encodeURIComponent(URL)
                  }`"
                  width="94%"
                  class="margintop6"
                />
              </van-col>
            </van-row>
            <van-row class="black margin_15_0">
              <van-col span="24" class="font13">{{ Name }}</van-col>
            </van-row>
          </van-col>
          <van-col span="20" offset="2">
            <van-row align="center" justify="space-between" class="margin_20_0">
              <van-col>
                <van-image
                  src="https://npm.tansuyun.cn/@yakj/y407@0.0.21/dist/img/hoverbtn.02c89e24.svg"
                ></van-image>
              </van-col>
              <van-col>
                <van-row class="font12"
                  >邀请他人扫码，请您先<span class="yellow">截图</span
                  >并传给他人！
                </van-row>
                <van-row class="font12"
                  >收到他人截图，请您通过微信<span class="yellow">扫码</span
                  >进入！
                </van-row>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </van-overlay>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { format_date, DateFMT } from "@ctsy/common";
import { timeFormat } from "../api/lib";

const Props = defineProps({
  ShowQr: {
    default: false,
    type: Boolean,
  },
  EnterName: {
    default: "企业简称",
    type: String,
  },
  Name: {
    default: "培训名称",
    type: String,
  },
  URL: {
    default: "",
    type: String,
  },
});
const Emits = defineEmits(["change"]);

function change() {
  Emits("change");
}
</script>
<style lang="less" scoped>
.backwhite {
  background-color: #f5fafeff;
  border-radius: 10px;
}
.black {
  color: black;
}
.middle {
  position: fixed;
  top: 54%;
  transform: translateY(-50%);
}
.yellow {
  color: #ffd900ff;
}
.margin_15_0 {
  margin: 0 0 15px;
}
.margin_30_0_18_0 {
  margin: 30px 0 18px 0;
}
.margintop6 {
  margin-top: 6px;
}
.back_blue {
  background-color: #1b6ffe;
}
.white {
  color: white;
}
</style>
