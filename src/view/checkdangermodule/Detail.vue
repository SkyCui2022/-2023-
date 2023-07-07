<template>
  <van-sticky>
    <van-row class="backblueb white back_blue">
      <van-col span="24">
        <van-row class="margin20">
          <van-col span="22" offset="1">
            <Title Title="隐患详情" @go="router.go(-1)"></Title>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="22" offset="1" class="margin20_bottom">
            <van-row align="center" justify="space-between">
              <van-col>
                <van-row class="margin16_bottom">
                  <van-col>
                    检查时间：{{ timeFormat(Detail.CTime, DateFMT.YMDHm) }}
                  </van-col>
                </van-row>
                <van-row>
                  <van-col>
                    检查人：{{ yStore.UserMap[Detail.CUID]?.Name }}
                  </van-col>
                </van-row>
              </van-col>
              <van-col
                class="back_blue_small padding_4_8 radius12"
                span="6"
                @click="getTel"
              >
                联系检查人
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </van-sticky>
  <van-row>
    <van-col
      span="24"
      :class="`actived ${ResultMap[Detail.Result]} 
      `"
    >
      {{ StateMap[Detail.Result] }}</van-col
    >
  </van-row>
  <van-row>
    <van-col span="22" offset="1">
      <van-row class="padiing_18_0" align="center" justify="space-between">
        <van-col class="font15">隐患来源</van-col>
        <van-col class="font15">{{ EOType[Detail.OType] }}</van-col>
      </van-row>
      <van-row class="padiing_18_0" align="center" justify="space-between">
        <van-col class="font15">所在部门</van-col>
        <van-col class="font15">{{
          yStore.OrgMap[Detail.OrgID]?.Name
        }}</van-col>
      </van-row>
      <van-row class="padiing_18_0" align="center" justify="space-between">
        <van-col class="blue font15">隐患名称</van-col>
        <van-col span="24" class="left font14 fc141414">{{
          Detail.Name
        }}</van-col>
      </van-row>
      <van-row class="padiing_18_0">
        <van-col class="blue font15 padding12_bottom">隐患描述</van-col>

        <van-field
          v-model="Detail.Memo"
          type="textarea"
          row="2"
          disabled
        ></van-field>
      </van-row>
      <van-row class="padiing_18_0">
        <van-col class="blue font15 padding12_bottom">隐患照片</van-col>
        <van-col span="24">
          <template v-for="(v, k) in Detail.EImgs" :key="k">
            <van-image
              :src="v"
              width="100%"
              @click="showImagePreview(Detail.EImgs, k)"
            ></van-image>
          </template>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="height50"></van-row>
  <van-row
    class="fixed_bottom"
    v-if:show="(Show && Detail.Result == 1) || (Show && Detail.Result == 2)"
  >
    <van-col span="24" @click="toRectify" class="blue font16 gray padding12"
      ><i class="yan5 yan5-jianchabiao-_zhenggaiyinhuan font20"></i>
      {{ Detail.Result == 1 ? "隐患整改" : "进行复核" }}</van-col
    >
  </van-row>
  <van-row v-if:show="!Show || Detail.Result != 1">
    <van-col span="24" class="line_gray"></van-col>
    <van-col span="22" offset="1">
      <van-row class="padiing_18_0">
        <van-col class="blue font15 padding12_bottom">整改照片</van-col>
        <van-col span="24" class="left">
          <template v-for="(v, k) in Fix.Imgs">
            <span class="position_relative">
              <van-image
                :src="v"
                width="43"
                height="43"
                @click="showImagePreview(Fix.Imgs, k)"
              ></van-image>
              <van-icon
                v-if="Detail.Result == 1"
                class="close"
                name="close"
                @click="Fix.Imgs.splice(k, 1)"
              /> </span
            >&nbsp;
          </template>
          <van-icon
            v-if="Detail.Result == 1"
            @click="upload"
            name="photograph"
            size="43"
            class="gray"
            color="#d5d6d8"
          />
        </van-col>
      </van-row>
      <van-row class="padiing_18_0">
        <van-col class="blue font15 padding12_bottom"> 整改描述</van-col>
        <van-col span="24">
          <van-field
            v-model="Fix.Memo"
            autosize
            :disabled="Detail.Result !== 1"
          ></van-field>
        </van-col>
      </van-row>
      <van-row v-if="Detail.Result !== 1" class="padiing_18_0">
        <van-col>
          <span> {{ yStore.UserMap[Detail.FixUID]?.Name }} </span
          ><span>{{ timeFormat(Detail.FixTime, DateFMT.YMDHm) }}</span>
        </van-col>
        <van-col>
          <van-image :src="Detail.FixSign"></van-image>
        </van-col>
      </van-row>
      <van-row class="height50"></van-row>
    </van-col>
    <template v-if="Detail.Result !== 1">
      <van-col span="24" class="line_gray"></van-col>
      <van-col span="22" offset="1">
        <van-row v-if:show="!Show || Detail.Result != 2">
          <van-col span="22" offset="1">
            <van-row class="padiing_18_0">
              <van-col class="blue font15 padding12_bottom">复核意见</van-col>
              <van-col span="24">
                <van-field
                  v-model="Judge.Memo"
                  :disabled="Detail.Result !== 2"
                  autosize
                ></van-field>
              </van-col>
            </van-row>
            <van-row class="padiing_18_0">
              <van-radio-group
                v-model="Judge.Pass"
                direction="horizontal"
                @change="change"
                :disabled="Detail.Result !== 2"
              >
                <van-radio :name="true">通过</van-radio>
                <van-radio :name="false"> 不通过</van-radio>
              </van-radio-group>
            </van-row>
            <van-row v-if="Detail.Result !== 2">
              <van-col>
                <span> {{ yStore.UserMap[Detail.JUID]?.Name }} </span
                ><span>{{ timeFormat(Detail.JTime, DateFMT.YMDHm) }}</span>
              </van-col>
              <van-col>
                <van-image :src="Detail.JSign"></van-image>
              </van-col>
            </van-row>
            <van-row class="height50"></van-row>
          </van-col>
        </van-row>
      </van-col>
    </template>
    <van-row class="fixed_bottom" v-if="Detail.Result !== 3 && !Show">
      <van-col class="blue font16 gray padding12" @click="sign" span="24"
        ><i class="yan5 yan5-anquanpeixuntubiao_qianzi"></i> 签字提交</van-col
      >
    </van-row>
  </van-row>

  <Sign
    :modelValue="ShowSign"
    @cancel="ShowSign = !ShowSign"
    @success="success"
    :Name="yStore.User?.Name || '游客'"
  ></Sign>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  CheckApi,
  EntityDanger,
  EntityDangerJudgeReq,
  EntityDangerSearchReq,
} from "@yakj/sdk/sdk/sdk";
import { format_date, DateFMT, delay_cb, timeout } from "@ctsy/common";
import { showDialog, showImagePreview } from "vant";
import { EntityFixCheckReq } from "../../api/check";
import { wait, EOType, timeFormat } from "../../api/lib";
import Upload from "@ctsy/api-sdk/dist/modules/Upload";
import Sign from "../../component/Sign.vue";
import { useStore } from "../../store";
import Title from "../../component/Title.vue";

const route = useRoute();
const router = useRouter();
const yStore = useStore();
const Detail = ref<EntityDanger>(new EntityDanger());
function getTel() {
  showDialog({
    message: `
      ${yStore.User.Tel || "暂时未添加"}
    `,
  });
}

const Show = ref(true);
const Fix = ref<EntityFixCheckReq>(new EntityFixCheckReq());
const Judge = ref<EntityDangerJudgeReq>(new EntityDangerJudgeReq());
async function toRectify() {
  if (Detail.value.Result == 1) {
    Fix.value = new EntityFixCheckReq();
    Fix.value.CDIDs = [Detail.value.CDID];
  } else {
    Judge.value = new EntityDangerJudgeReq();
    Judge.value.Pass = true;
    Judge.value.CDIDs = [Detail.value.CDID];
  }
  Show.value = !Show.value;
  await timeout(200);
  document.documentElement.scrollTop = 400;
}
async function upload() {
  let rs = await wait(Upload.select_upload("danger", "image/*"));
  Fix.value.Imgs.push(rs.URL || rs.url);
}

const ShowSign = ref(false);
function sign() {
  ShowSign.value = true;
}
async function success(s: string) {
  ShowSign.value = !ShowSign.value;
  if (Detail.value.Result == 1) {
    Fix.value.Sign = s + "/sign";
    //@ts-ignore
    await wait(
      CheckApi.fix(
        Fix.value.CDIDs,
        Fix.value.Memo,
        Fix.value.Sign,
        Fix.value.Imgs
      )
    );
  } else {
    Judge.value.Sign = s + "/sign";
    //@ts-ignore
    await wait(
      CheckApi.dangerJudge(
        Judge.value.CDIDs,
        Judge.value.Sign,
        Judge.value.Memo,
        Judge.value.Pass
      )
    );
  }
  delay_cb("search", 500, async () => {
    await search();
    Show.value = !Show.value;
  });
}
function change(s: boolean) {
  if (!s && !Judge.value.Memo.length) {
    Judge.value.Pass = true;
    showDialog({
      message: "请先输入复核意见",
    });
  }
}
const StateMap: { [index: number]: string } = {
  1: "未整改",
  2: "待复核",
  3: "已整改",
};
const ResultMap: { [index: number]: string } = {
  1: "bcff7700",
  2: "bc0a50ff",
  3: "bc00be96",
};
async function search() {
  let CDID = Number(route.params.CDID);
  Detail.value =
    (
      await wait(
        CheckApi.dangerSearch(
          Object.assign(new EntityDangerSearchReq(), { W: { CDID: CDID } })
        )
      )
    ).L[0] || new EntityDanger();
  if (Detail.value.CUID > 0) {
    yStore.getAccount(Detail.value.CUID);
  }
  (Fix.value.Imgs = Detail.value.FixImgs),
    (Fix.value.Memo = Detail.value.FixMemo);
  Fix.value.Sign = Detail.value.FixSign;
}
onMounted(async () => {
  search();
});
</script>
<style lang="less" scoped>
.backorange {
  background-color: #ffb93c;
  padding: 8px;
}

.backblue {
  background-color: #1b6ffe;
  padding: 8px;
}

.backgreen {
  background-color: #00be96;
  padding: 8px;
}

.van-cell {
  border: 1px solid #cccccc;
}
:deep(.van-field__control:disabled) {
  color: #141414;
  -webkit-text-fill-color: #141414;
  font-size: 14px;
}
:deep(.van-cell) {
  border: 1px solid #eaebee;
}
</style>
