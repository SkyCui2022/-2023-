<template>
  <van-row class="bg">
    <van-col span="22" offset="1">
      <Title
        @go="router.go(-1)"
        :Title="Result.Name"
        :ShowEnter="false"
        class="pt20 pb20"
      ></Title>
    </van-col>

    <van-row align="center" justify="space-around" class="block">
      <template v-for="(v, k) in ButtonGroups" :key="k">
        <ButtonGroup :ModelValue="v" @click="click"></ButtonGroup>
      </template>
    </van-row>
    <van-row class="box">
      <template v-if="Logs.length">
        <van-row
          v-for="(v, k) in Logs"
          :key="k"
          class="block padding15 logheight"
          align="center"
          justify="space-between"
        >
          <van-col>
            <van-row>
              {{ k == 0 ? "上次检查" : "检查人" }}：{{
                yStore.UserMap[v.CUID]?.Name || "暂无数据"
              }}
            </van-row>
            <van-row
              gutter="20"
              class="margintop5 fontweight"
              @click="toCheckDetail(v.EID, v.CheckID, v.CLID)"
            >
              <van-col>{{ v.CTime }}</van-col>
              <van-col v-if="v.Details.length > 0">
                有隐患{{ v.Details.filter((v) => v.Imgs.length).length }}
              </van-col>
              <van-col class="blue" v-if="v.Details.length > 0">
                已整改{{ v.Fixed }}
              </van-col>
            </van-row>
          </van-col>
          <van-col v-if="k == 0" @click="changeHeight(Logs)">
            {{ Unfold ? "收起" : "更多" }}
            <van-icon :name="Unfold ? 'arrow-up' : 'arrow-down'" />
          </van-col>
        </van-row>
      </template>
      <template v-else
        ><van-col span="24"><strong>暂无检查记录</strong></van-col></template
      >
    </van-row>
  </van-row>
  <van-row class="list padding15">
    <van-row class="padding_bottom_10 block">
      <van-radio-group v-model="AllRight">
        <van-radio name="0" @click="allRight">
          <span class="font15">全部符合</span>
          <template #icon="props">
            <i
              :class="`yan5 yan5-${
                props.checked
                  ? 'anquanpeixuntubiao_xuanze-yuan font18 green'
                  : 'weixuanzhong1 font16 gray'
              }`"
            ></i>
          </template>
        </van-radio>
      </van-radio-group>
    </van-row>
    <van-row class="block">
      <van-row
        class="block padding10_bottom"
        v-for="(v, k) in SubmitCheck.Items"
        :key="k"
      >
        <van-col class="left font black" span="20">
          <strong class="font14">{{ k + 1 }}.{{ mapItem[v.CIID] }}</strong>
        </van-col>
        <van-col span="4">
          <i
            @click="radio(k, 0)"
            :class="`yan5 yan5-${
              v.Result == 0
                ? 'anquanpeixuntubiao_xuanze-yuan green font18'
                : 'anquanpeixuntubiao_xuanze-yuan gray font18'
            }`"
          ></i>
          &nbsp;
          <i
            @click="radio(k, 1)"
            :class="`yan5 yan5-${
              v.Result == 1
                ? 'jianchabiao-_cuowuxiang red font18'
                : 'jianchabiao-_cuowuxiang gray font18'
            }`"
          ></i>
        </van-col>
        <van-row
          class="block"
          v-if="(ErrLogs[v.CIID] && v.Result == 1) || v.Result == 1"
        >
          <van-form class="block">
            <van-cell-group>
              <van-field
                type="textarea"
                rows="2"
                v-model="v.Memo"
                class="border1 mt5"
                autosize
                placeholder="请对不符合项进行描述"
              ></van-field>
            </van-cell-group>
          </van-form>
          <van-row align="center" class="block mt10">
            <template v-for="(d, i) in v.Imgs">
              <van-col class="position">
                <van-image
                  :src="d"
                  width="50"
                  height="50"
                  fit="fill"
                  @click="
                    showImagePreview({
                      images: v.Imgs,
                      startPosition: i,
                    })
                  "
                ></van-image>
                <van-row
                  class="clear"
                  @click="clear(v.Imgs, i)"
                  v-if="!RectifyList.includes(v.CIID)"
                >
                  <van-icon name="clear" color="#fff" />
                </van-row>
              </van-col>
            </template>
            <van-col @click="upload(v.Imgs)" offset="1">
              <van-icon
                name="photograph"
                class="bcf1f3f6 fcd5d6d8 pl10 pr10 pt10 pb10"
                size="30"
              />
            </van-col>
            <van-col v-if="RectifyList.includes(v.CIID)">
              <van-button
                color="#EFF4FC"
                size="small"
                class="rectify"
                @click="toRectify(v.CIID)"
              >
                去整改>
              </van-button>
            </van-col>
          </van-row>
        </van-row>
      </van-row>
    </van-row>
  </van-row>
  <van-row class="block" v-if:show="ShowOtherDanger">
    <van-col class="pl15 pr15 pt15 pb15" span="24">
      <OtherDangerVue
        :ModelValue="OtherDanger"
        @clearOtherimg="clearOtherimg"
        @addOthterImgs="addOthterImgs"
        @cancel="ShowOtherDanger = false"
      ></OtherDangerVue>
    </van-col>
  </van-row>
  <van-row v-if:show="!ShowOtherDanger">
    <van-col span="22" offset="1" class="left blue" @click="other">
      <span class="font15"> 其他隐患</span> <van-icon name="arrow"></van-icon>
    </van-col>
  </van-row>
  <van-row class="enpty"></van-row>
  <van-row class="submit" @click="submit()" align="center" justify="center">
    <van-button block color="#f2f2f2">
      <i class="yan5 yan5-anquanpeixuntubiao_qianzi font22"></i>
      &nbsp;
      <span class="font16"> 签字提交</span>
    </van-button>
  </van-row>
  <van-row class="blocks">
    <Sign
      :ModelValue="ShowSign"
      @success="success"
      @cancel="ShowSign = false"
      :Name="yStore.User?.Name"
    ></Sign>
  </van-row>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  EntitySubmitCheckLog,
  EntityGetCheckRes,
  CheckApi,
  EntityDanger,
} from "@yakj/sdk/sdk/sdk";
import { showFailToast, showImagePreview } from "vant";
import Sign from "../component/Sign.vue";
import { store } from "@ctsy/common";
import ButtonGroup from "../component/ButtonGroup.vue";
import { wait } from "../api/lib";
import useRadio from "../hooks/RadioGroup";
import useCheckLog from "../hooks/CheckLog";
import useGroup from "../hooks/ButtonGroup";
import useImage from "../hooks/Image";
import useRectify from "../hooks/Rectify";
import useSign from "../hooks/Sign";
import { cStatus } from "../store/cui";
import { useStore } from "../store";
import Upload from "@ctsy/api-sdk/dist/modules/Upload";
import Title from "../component/Title.vue";
import OtherDangerVue from "../component/OtherDanger.vue";

const yStore = useStore();
const router = useRouter();
const route = useRoute();
const Logs = computed(() => {
  return Result.value.Logs;
});

//按钮组
const {
  ButtonGroups,
  EID,
  OID,
  click,
  toCreateDanger,
  toCheckLogs,
  toDangerList,
} = useGroup();

//检查记录高度计算逻辑
const { Unfold, LogHeight, logHeight, changeHeight } = useCheckLog();

//全选，单选逻辑
const { AllRight, SignTextColor, SubmitCheck, allRight, radio } = useRadio();

// 有隐患的情况下，图片处理
const { upload, clear } = useImage();

//去整改
const { RectifyList, toRectify } = useRectify();

// 提交检查结果逻辑
function submit() {
  if (SubmitCheck.value.Items.some((v) => v.Result == 999)) {
    showFailToast("请按要求检查完整");
  } else if (
    SubmitCheck.value.Items.some((v) => v.Result == 1 && v.Imgs.length == 0)
  ) {
    showFailToast("不符合项必须添加图片");
  } else if (
    SubmitCheck.value.Items.some((v) => v.Result == 1 && v.Memo == "")
  ) {
    showFailToast("不符合项必须添加文本");
  } else if (ShowOtherDanger.value && OtherDanger.value.Name == "") {
    showFailToast("其他隐患必须填写名称");
  } else if (ShowOtherDanger.value && OtherDanger.value.Memo == "") {
    showFailToast("其他隐患必须填写描述");
  } else if (ShowOtherDanger.value && OtherDanger.value.Imgs.length == 0) {
    showFailToast("其他隐患必须上传图片");
  } else {
    ShowSign.value = true;
  }
}

function goList() {
  router.push(`/check/${EID.value}`);
}

//其他隐患
const OtherDanger = ref<EntitySubmitCheckLog>(new EntitySubmitCheckLog());
function other() {
  ShowOtherDanger.value = true;
  OtherDanger.value.Result = 1;
}

//签字及保存检查结果逻辑
const { ShowSign, success } = useSign(SubmitCheck.value, OtherDanger.value);

//点击记录列表=》跳转至检查详情
function toCheckDetail(EID: number, CheckID: number, CLID: number) {
  router.push(`/check/detail/${EID}/${CheckID}/${CLID}`);
}

const ShowOtherDanger = ref(false);

async function addOthterImgs() {
  let rs = await wait(Upload.select_upload("otherImg", "*.png,*.gif,*.jpg"));
  OtherDanger.value.Imgs.push(rs.url || rs.URL);
}

function clearOtherimg(k: number) {
  OtherDanger.value.Imgs.splice(k, 1);
}

const Result = ref(new EntityGetCheckRes());
let mapItem: { [index: string]: any } = {};
const MarginTopList = ref("0px");
const MarginTop = ref("0px");

let logs: any[] = [];
const OType = ref("");
const ErrLogs = ref<{ [index: number]: any }>({});
onMounted(async () => {
  let CheckID = Number(route.params.CheckID);
  EID.value = Number(route.params.EID);
  OType.value = String(route.query.OType);
  OID.value = Number(route.query.OID) || CheckID;
  store.set("CheckID", CheckID);
  Result.value = await wait(
    CheckApi.getByCheckID(CheckID),
    "数据加载中，请稍后"
  );
  Result.value?.Logs.forEach((v) => {
    yStore.getAccount(v.CUID);
    logs.push(...v.Details);
    logs = logs.filter((v) => v.Result == 1);
  });
  let obj: { [index: number]: { Memo: string; Imgs: string[] } } = {};
  logs.map((v) => {
    if (obj[v.CIID]) {
      //@ts-ignore
      obj[v.CIID].Memo.push(v.Memo);
      obj[v.CIID].Imgs.push(...v.Imgs);
    } else {
      obj[v.CIID] = {
        //@ts-ignore
        Memo: [v.Memo],
        Imgs: [...v.Imgs],
      };
    }
  });
  for (let i in obj) {
    obj[i].Memo = [...new Set(obj[i].Memo)].join(",");
    obj[i].Imgs = [...new Set(obj[i].Imgs)];
  }
  RectifyList.value = Object.keys(obj);
  ErrLogs.value = obj;
  store.set("CheckObj", Result.value);
  SubmitCheck.value.CheckID = Result.value.CheckID;
  if (OType.value && OType.value !== "undefined") {
    SubmitCheck.value.OType = OType.value;
    SubmitCheck.value.OID = OID.value;
  } else {
    SubmitCheck.value.OType = "Check";
    SubmitCheck.value.OID = CheckID;
  }
  SubmitCheck.value.OID = OID.value || 0;
  for (let i of Result.value.Items) {
    let items = new EntitySubmitCheckLog();
    items.CIID = i.CIID;
    items.Result = 999;
    SubmitCheck.value.Items.push(items);
    mapItem[`${i.CIID}`] = i.Name;
  }
  SubmitCheck.value.Items.map((v) => {
    if (obj[v.CIID]) {
      v.Imgs = obj[v.CIID].Imgs;
      v.Memo = obj[v.CIID].Memo;
      v.Result = 1;
    }
  });
  setTimeout(() => {
    //@ts-ignore
    logHeight.value = document.querySelector(".logheight")?.clientHeight;
    LogHeight.value = `${logHeight.value}px`;
    MarginTop.value = `${logHeight.value / 3}px`;
    MarginTopList.value = `${logHeight.value / 3 + 10}px`;
  }, 200);
  cStatus.EID = Number(route.params.EID);
  cStatus.CheckID = Number(route.params.CheckID);
});
</script>
<style scoped lang="less">
.left {
  text-align: left;
}

.position {
  position: relative;
}

.clear {
  position: absolute;
  top: 0;
  right: 0;
}

.margintop5 {
  margin-top: 5px;
}

.blue {
  color: #1b6ffe;
}

.padding15 {
  padding: 15px;
}

.bg {
  width: 100vw;
  height: 180px;
  background-color: #1f7aff;

  .title {
    color: #fff;
    padding: 10px 15px;
    font-size: 1rem;
  }

  .box {
    width: 90vw;
    border-radius: 10px;
    background-color: #fff;
    margin: 0 auto;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    font-size: 12px;
    min-height: v-bind(LogHeight);
    max-height: 350px;
    margin-top: v-bind(MarginTop);
    overflow: auto;
    z-index: 1;
  }
}

//隐藏滚轮
::-webkit-scrollbar {
  display: none;
}

.list {
  margin-top: v-bind(MarginTopList);
}

.padding_bottom_10 {
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f4f4;
}

.padding10_bottom {
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;
}

.other {
  font-size: 15px;
  color: #1b6ffe;
  padding: 10px;
}

.enpty {
  width: 100vw;
  height: 50px;
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

.rectify {
  /deep/.van-button__text {
    color: #1b6ffe;
  }
}

.flex_start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.font25 {
  font-size: 24px;
}
.border1 {
  border: 1px solid #f6f6f6;
}
</style>
