<template>
  <van-row class="bg">
    <van-row align="center" class="title">
      <van-col @click="router.go(-1)" span="2">
        <van-icon name="arrow-left" size="16" />
      </van-col>
      <van-col class="font18">{{ Result.Name }}</van-col>
    </van-row>
    <van-row class="fff font12 block" align="center">
      <van-col offset="1" span="17">
        <van-row class="padding3 font13"
          >检查时间：{{ timeFormat(Result.CTime, DateFMT.YMDHm) }}</van-row
        >
        <van-row class="padding3 font13"
          >检 查 人：{{ yStore.UserMap[Result.CUID]?.Name }}</van-row
        >
      </van-col>
    </van-row>
  </van-row>
  <van-row class="height">
    <van-col span="22" offset="1">
      <van-row class="block pt15 pd10 fontblue" v-if:show="Result.Unfix"
        ><strong class="font16">有隐患{{ Result.Unfix }}</strong></van-row
      >
      <Detail :ModelValue="List" @toRectify="toRectify"></Detail>
      <van-row v-if="OtherDanger?.CIID">
        <van-col>
          <van-row class="margintop10">
            <van-col class="left" span="24">
              <span class="font15 fc141414">其他隐患:</span>
              <span class="margintop5 font14 fc141414">
                {{ OtherDanger?.Name }}
              </span>
            </van-col>
          </van-row>
          <van-row class="margintop10">
            <van-col class="left" span="24">
              <span class="font15 fc141414">隐患描述：</span>
            </van-col>
            <van-col class="margintop5 fc141414 bcffffff border1 left">
              <div class="font14 fc141414 left">{{ OtherDanger?.EMemo }}</div>
            </van-col>
          </van-row>
          <van-row class="margintop10">
            <van-col class="left" span="24">
              <span class="font15 fc141414">隐患图片：</span>
            </van-col>
            <van-col class="margintop5">
              <template v-for="(v, k) in OtherDanger?.EImgs">
                <van-image
                  :src="v"
                  @click="showImagePreview(OtherDanger?.EImgs, k)"
                ></van-image>
              </template>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="box_gray mt15 font12 block">
        <template v-for="(v, k) in Result.Signs" :key="k">
          <van-row class="block mt10 ml10" align="center">
            <van-col class="pt5 pb5 pl10 pr10 backgroundgray font13">
              {{ yStore.UserMap[v.UID]?.Name }}
            </van-col>
            &nbsp;&nbsp;
            <van-col>{{ timeFormat(v.CTime, DateFMT.YMDHm) }}</van-col>
          </van-row>
          <van-row class="block">
            <van-col span="24">
              <van-image
                :width="Width"
                :height="Height"
                class="rotate"
                :src="v.Sign"
              ></van-image>
            </van-col>
          </van-row>
        </template>
      </van-row>
      <van-row class="block enpty"></van-row>
    </van-col>
    <van-col span="24">
      <van-row
        class="submit"
        @click="Signed ? submit() : qr()"
        align="center"
        justify="center"
      >
        <van-button block color="#f2f2f2">
          <i class="yan5 yan5-jianchabiao-_yaoqingjiaqian font22"></i>&nbsp;
          <span class="font16">{{ Signed ? "签字提交" : "邀请签字" }} </span>
        </van-button>
      </van-row>
    </van-col>
  </van-row>

  <Qr
    :ShowQr="ShowQr"
    :EnterName="yStore.Enter?.Simple || yStore.Enter?.Name"
    :Name="Result.Name"
    :URL="URLs"
    @change="ShowQr = false"
  ></Qr>
  <Sign
    :ModelValue="ShowSign"
    @success="success"
    @cancel="ShowSign = false"
    :Name="yStore.User?.Name"
  ></Sign>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import {
  CheckApi,
  EntitySigleCheckDetailRes,
  EntitySingleCheckDetailItem,
  EntitySubmitCheckReq,
  EntitySubmitCheckLog,
} from "@yakj/sdk/sdk/sdk";
import Detail from "../component/Detail.vue";
import { useRoute, useRouter } from "vue-router";
import { wait, timeFormat } from "../api/lib";
import { DateFMT, format_date } from "@ctsy/common";
import Qr from "../component/Qr.vue";
import { useStore } from "../store";
import Sign from "../component/Sign.vue";
import useSign from "../hooks/Sign";
import { showImagePreview } from "vant";

const yStore = useStore();
const router = useRouter();
const route = useRoute();
const Result = ref(new EntitySigleCheckDetailRes());
const SignTextColor = ref("#1B6FFE");
const List = computed(() => {
  return Result.value.Details.filter((v) => v.CIID != 0);
});

//去整改
function toRectify(v: any) {
  //todo 跳转至隐患，函数应该带有ID
  location.href = `https://wechat.tansuyun.cn/y5/risk/#/checkdanger/detail/${
    EID.value
  }/${v.CDID}${
    OType.value && OID.value ? `?OType=${OType.value}&OID=${OID.value}` : ""
  }`;
}

const ShowQr = ref(false);
//邀请签字，显示二维码
function qr() {
  // showQr(Result.value.Name);
  ShowQr.value = !ShowQr.value;
}

const Width = ref("");
const Height = ref("");
const EID = ref(0);
const CheckID = ref(0);
const CLID = ref(0);
const Signed = ref(false);
const OType = ref("");
const OID = ref(0);
const SubmitCheck = ref(new EntitySubmitCheckReq());
const OtherDanger = ref(new EntitySingleCheckDetailItem());
const { ShowSign, success } = useSign(SubmitCheck.value, OtherDanger.value);

function submit() {
  ShowSign.value = true;
}

const URLs = ref("");

const height = computed(() => {
  return window.innerHeight - 120 + "px";
});
onMounted(async () => {
  EID.value = Number(route.params.EID);
  CheckID.value = Number(route.params.CheckID);
  CLID.value = Number(route.params.CLID);
  Signed.value = Boolean(route.query.signed);
  OType.value = String(route.query.OType);
  OID.value = Number(route.query.OID);

  if (route.params.CheckID && route.params.CLID) {
    Result.value = await wait(
      CheckApi.detailByCheckIDCLID(CheckID.value, CLID.value)
    );
    Result.value.Signs.map(async (v) => await yStore.getAccount(v.UID));
  }
  OtherDanger.value = Result.value.Details.filter((v) => v.CIID == 0)[0];
  Result.value.Details.filter((v) => v.CIID != 0).forEach((v) => {
    SubmitCheck.value.Items.push({
      CIID: v.CIID,
      Memo: v.Memo,
      Result: v.Result,
      Imgs: v.EImgs,
      $set: () => new EntitySubmitCheckLog(),
    });
  });
  if (OType.value && OType.value !== "undefined") {
    SubmitCheck.value.OType = OType.value;
    SubmitCheck.value.OID = OID.value;
    URLs.value = `https://wechat.tansuyun.cn/y5/check/#/check/detail/${EID.value}/${CheckID.value}/${CLID.value}?signed=true&OType=${OType.value}&OID=${OID.value}`;
  } else {
    SubmitCheck.value.OType = "Check";
    SubmitCheck.value.OID = CheckID.value;
    URLs.value = `https://wechat.tansuyun.cn/y5/check/#/check/detail/${EID.value}/${CheckID.value}/${CLID.value}?signed=true`;
  }

  SubmitCheck.value.Signs = Result.value.Signs;
  SubmitCheck.value.CheckID = CheckID.value;
  setTimeout(() => {
    Width.value = (window.screen.width / 8).toFixed();
    Height.value = (window.screen.height / 8).toFixed();
  }, 200);
});
</script>
<style scoped lang="less">
.bg {
  width: 100vw;
  height: 120px;
  background-color: #1f7aff;
  .title {
    .fff();
    .block();
    padding: 10px 15px;
    font-size: 1rem;
  }
}

.fff {
  color: #fff;
}
.block {
  width: 100%;
}
.red {
  color: red;
}
.font12 {
  font-size: 12px;
}
.font14 {
  font-size: 13px;
}
.padding10 {
  padding: 10px;
}
.padding15 {
  padding: 15px;
}
.padding_10_15 {
  padding: 10px 15px;
}
.paddingbottom10 {
  padding-bottom: 10px;
}
.marginbottom10 {
  margin-bottom: 10px;
}
.width100vw {
  width: 100vw;
}
.submit {
  width: 100vw;
  position: fixed;
  text-align: center;
  bottom: 0;
  /deep/.van-button__text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: v-bind(SignTextColor);
  }
}
.block {
  width: 100%;
}
.bottom_line {
  border-bottom: 1px solid #e8e8e8;
}
.radius4 {
  border-radius: 4px;
}
.box_red {
  border: 1px solid red;
}
/deep/.van-field__control:disabled {
  -webkit-text-fill-color: red;
}
.rectify {
  /deep/.van-button__text {
    color: #1b6ffe;
  }
}
.enpty {
  height: 45px;
}
.positionrelative {
  position: relative;
}
.box_gray {
  border: 1px solid #cccccc;
}
.margin15 {
  margin: 15px;
}
.margin10 {
  margin: 10px;
}
.padding_4_6 {
  padding: 4px 6px;
}
.backgroundgray {
  background-color: #eeeeee;
  border-radius: 12px;
}
.rotate {
  transform: rotate(-90deg);
}
* {
  box-sizing: border-box;
}
.border1 {
  border: 1px solid #f6f6f6;
}
.height {
  min-height: v-bind(height);
  background: #f7f9fcff;
}
</style>
