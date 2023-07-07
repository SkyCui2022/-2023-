<template>
  <template v-if="ShowNotice">
    <template v-if="ErrMessage.length">
      <van-toast v-model:show="ShowToast">
        <template #message>
          <van-row>
            <van-col>
              {{ ErrMessage }}
            </van-col>
          </van-row>
        </template>
      </van-toast>
    </template>
    <template v-else>
      <van-row class="bgblue height">
        <van-col span="22" offset="1" class="margin_40t_20b">
          <van-row class="blue_small" align="center" justify="space-between">
            <van-col class="font20">{{
              yStore.Enter.Simple && yStore.Enter.Simple?.length
                ? "请仔细阅读以下内容"
                : " 答题须知"
            }}</van-col>
            <van-col class="font13"
              ><van-icon name="location-o" />{{
                yStore.Enter.Simple && yStore.Enter.Simple?.length
                  ? yStore.Enter.Simple
                  : yStore.Enter.Name
              }}</van-col
            >
          </van-row>
          <van-row class="content radius8 mt20">
            <van-col>
              <van-row class="margin_15_0">
                <van-col
                  span="22"
                  offset="1"
                  class="back_gray font18 font700 padding_13_22"
                >
                  <span class="font18 fc141414">{{ Paper.Name }}</span>
                </van-col>
              </van-row>

              <van-row>
                <van-col span="20" class="center">
                  <Cell Title="试卷分数">
                    <template #value>
                      <div class="font15">
                        满分{{ Paper.Full }}分/
                        <span class="red font15">合格{{ Paper.Pass }}分</span>
                      </div>
                    </template>
                  </Cell>
                </van-col>
              </van-row>
              <van-row>
                <van-col span="20" class="center">
                  <Cell Title="答题时长">
                    <template #value>
                      <div>
                        <span v-if="Paper.SecondLimit" class="font15">
                          {{ Math.floor(Paper.SecondLimit) }}分钟</span
                        >
                        <span v-else class="font15">不限制</span>
                      </div>
                    </template>
                  </Cell>
                </van-col>
              </van-row>

              <van-row v-if="Paper.TimeLimit">
                <van-col span="20" class="center">
                  <Cell Title="答题次数">
                    <template #value>
                      <span class="font15">
                        共{{ Paper.TimeLimit }}次/
                        <span class="ref font15">
                          {{
                            Paper.TimeLimit > Paper.AnsweredTimes
                              ? `剩余${Paper.TimeLimit - Paper.AnsweredTimes}次`
                              : `已用尽`
                          }}</span
                        >
                      </span>
                    </template>
                  </Cell>
                </van-col>
              </van-row>
              <van-row>
                <van-col span="20" class="center">
                  <Cell
                    Title="开始时间"
                    :Value="timeFormat(Paper.STime, DateFMT.YMDHm)"
                  >
                  </Cell>
                </van-col>
              </van-row>
              <van-row>
                <van-col span="20" class="center">
                  <Cell
                    Title="截止时间"
                    :Value="timeFormat(Paper.ETime, DateFMT.YMDHm)"
                  >
                  </Cell>
                </van-col>
              </van-row>
              <template v-if="Paper.Memo">{{ Paper.Memo }}</template>
              <template v-else>
                <van-row class="margin_20_0">
                  <van-col span="22" offset="1" class="left font12 letter">
                    <!-- <van-icon color="blue" name="star" /> -->
                    <span class="red">★</span>
                    <span class="font12 fc666666"
                      >为确保您本次考试成绩真实有效，请在答题结束后，签名确认。</span
                    >
                  </van-col>
                </van-row>
              </template>

              <van-row v-if="OID">
                <van-col
                  @click="router.go(-1)"
                  span="22"
                  offset="1"
                  class="blue font16"
                  >考前资料 <van-icon name="arrow"
                /></van-col>
              </van-row>
              <van-row
                class="contentposition box_240_50 round50 back_blue white font16 transform50_X line50_height"
              >
                <van-col span="24" @click="Flags && begin_answer()"
                  ><i class="yan5 yan5-anquanpeixuntubiao_xuanze-yuan"></i
                  >&nbsp;
                  <span class="font16">
                    {{
                      Paper.TimeLimit > Paper.AnsweredTimes
                        ? new Date().getTime() < new Date(Paper.STime).getTime()
                          ? "答题时间未到"
                          : new Date().getTime() >
                            new Date(Paper.ETime).getTime()
                          ? "答题时间已过"
                          : "准备好了，开始答题"
                        : Paper.TimeLimit == 0
                        ? new Date().getTime() < new Date(Paper.STime).getTime()
                          ? "答题时间未到"
                          : new Date().getTime() >
                            new Date(Paper.ETime).getTime()
                          ? "答题时间已过"
                          : `准备好了，开始答题`
                        : "准备好了，开始答题"
                    }}
                  </span>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </template>
  </template>
  <template v-else>
    <van-row class="back_blue white height107">
      <van-row class="block padding10" align="bottom" justify="space-between">
        <van-col class="font16 left" span="22">
          <van-icon name="arrow-left" size="16" />
          {{ Paper.Name }}
        </van-col>
      </van-row>
      <van-row align="center" class="block padding10" justify="start">
        <van-col class="round" offset="1">
          <van-row class="blue font20">{{ TimeLimit }}</van-row>
          <van-row class="white_small font13">倒计时</van-row>
        </van-col>
        &nbsp;&nbsp;
        <van-col class="white_small font14">
          还未作答：{{ UnAnswerd }}道
        </van-col>
      </van-row>
    </van-row>
    <van-row class="mt12">
      <template v-for="(v, k) in Questions" :key="k">
        <van-row v-if:show="Active == k" class="block left padding_20_0">
          <van-col span="22" offset="1">
            <span class="font14 bold">
              &nbsp;{{ k + 1 }}.&nbsp;&nbsp;{{ v.Name }}&nbsp;&nbsp;({{
                v.Score
              }}分)
            </span>

            <van-tag plain type="primary">
              {{ ShowMapQuestionType[v.Type] }}
            </van-tag>
          </van-col>
          <template v-if="v.Type == 0">
            <van-radio-group
              v-model="AnswerList[k].PIIDs[0]"
              @change="saveLocalStorage"
            >
              <van-radio v-for="(item, index) in v.Items" :name="item.PIID">
                {{ item.Name }}
              </van-radio>
            </van-radio-group>
          </template>
          <template v-if="v.Type == 1">
            <van-checkbox-group
              v-model="AnswerList[k].PIIDs"
              @change="saveLocalStorage"
            >
              <van-checkbox v-for="(item, index) in v.Items" :name="item.PIID">
                {{ item.Name }}
              </van-checkbox>
            </van-checkbox-group>
          </template>
          <template v-if="v.Type == 2">
            <van-radio-group
              v-model="AnswerList[k].PIIDs[0]"
              @change="saveLocalStorage"
            >
              <van-radio :name="1">A、正确 </van-radio>
              <van-radio :name="0">B、 错误 </van-radio>
            </van-radio-group>
          </template>
          <template v-if="v.Type == 3">
            <van-cell-group inset>
              <van-field
                v-model="AnswerList[k].Answer"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入正确答案"
                @update:model-value="saveLocalStorage(v)"
              />
            </van-cell-group>
          </template>
          <template v-if="v.Type == 4">
            <van-cell-group inset>
              <van-field
                v-model="AnswerList[k].Answer"
                rows="1"
                autosize
                type="textarea"
                placeholder="请输入正确答案"
                @update:model-value="saveLocalStorage(v)"
              />
            </van-cell-group>
          </template>
        </van-row>
      </template>
      <van-row class="empty"></van-row>
    </van-row>
    <Foot
      :ModelValue="ShowPopUp"
      :Active="Active"
      :QusetionsLen="Questions.length"
      :Status="0"
      :UnAnswerd="UnAnswerd"
      @show="showPopup()"
      @submit="submit()"
      @next="
        UnAnswerd
          ? Active == Questions?.length - 1
            ? submit()
            : next()
          : Active == Questions?.length - 1
          ? submit()
          : next()
      "
      @up="up"
    ></Foot>
  </template>
  <PopUp
    :ModelValue="ShowPopUp"
    :Active="Active"
    :AnswerList="AnswerList"
    :QusetionsLen="Questions?.length"
    :Status="0"
    :Flag="Flag"
    :UnAnswerd="UnAnswerd"
    @show="showPopup()"
    @submit="submit()"
    @edit_answer="edit_answer"
  ></PopUp>
  <van-dialog
    v-model:show="ShowResult"
    show-cancel-button
    confirm-button-text="考试回顾"
    confirm-button-color="#000"
    cancel-button-text="再答一次"
    @confirm="see_again"
    @cancel="answer_agian"
  >
    <template #title>
      <van-row>
        <van-col span="10">
          <van-button size="small" @click="goToTrainList"
            >返回培训列表</van-button
          >
        </van-col>
      </van-row>
    </template>
    <van-row class="padding_20_10">
      <van-col
        span="24"
        :class="`padding_20_10 ${
          Answerd.Score >= Paper.Pass ? 'green font15' : 'red font15'
        }`"
      >
        {{ Answerd.Score >= Paper.Pass ? "合格" : "不合格" }}
      </van-col>
      <van-col span="24" class="font15 gray_result">
        考试用时
        <strong class="font15">{{ UseTime }}</strong>
      </van-col>
    </van-row>
    <van-row
      :class="`round_result ${
        Answerd.Score >= Paper.Pass ? 'border_green' : 'border_red'
      }`"
    >
      <van-col :class="`${Answerd.Score >= Paper.Pass ? 'green' : 'red'}`">
        <span class="font30 font600">{{ Answerd.Score }}</span>
        分
      </van-col>
      <van-col class="gray_result font13">考试成绩</van-col>
    </van-row>
    <van-row align="center" justify="space-around" class="padding_20_10">
      <van-col class="font15 fc141414">答题:{{ AnswerList.length }}</van-col>
      <van-col class="font15 fc141414">对:{{ Answerd.RightNum }}</van-col>
      <van-col class="font15 fc141414">错:{{ Answerd.ErrNum }}</van-col>
    </van-row>
  </van-dialog>
  <Sign
    :modelValue="ShowSign"
    :Name="yStore.User.Name"
    @success="success"
    @cancel="cancel"
  >
  </Sign>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import {
  EntityPapers,
  EntityAnswerPaperAnswer,
  PapersApi,
  EntityAnswerPapersReq,
  EntityPaperItem,
} from "@yakj/sdk/sdk/sdk";
import { ShowMapQuestionType } from "@yakj/sdk/sdk/maps";
import {
  showFailToast,
  showConfirmDialog,
  showDialog,
  closeDialog,
} from "vant";
import { useRouter, useRoute } from "vue-router";
import { array_key_set, delay_cb, store } from "@ctsy/common";
import Foot from "../component/Foot.vue";
import PopUp from "../component/PopUp.vue";
import { wait, word, timeFormat } from "../api/lib";
import usePopup from "../hooks/popup";
import useChange from "../hooks/cut";
import { format_date, DateFMT } from "@ctsy/common";
import Sign from "../component/Sign.vue";
import { useStore } from "../store";
import Cell from "../component/Cell.vue";

import useBaseData from "../hooks/BaseData";

const { State, getEnter } = useBaseData();
const yStore = useStore();
const router = useRouter();
const route = useRoute();
const PaperID = ref(12);
const ShowNotice = ref(true);
const { ShowPopUp, showPopup } = usePopup();
const ShowResult = ref(false);
const Flag = ref([]);
const { Active, up, next, Questions } = useChange();
const STime = ref(0);
const ETime = ref(0);
const Paper = ref(new EntityPapers());
const AnswerList = ref([] as { [index: string]: any }[]);
const Time = ref(0);
const Total = ref(0);
const Score = ref(0);
const RightList = ref([] as any);
const Err = ref([] as any);
const UseTime = computed(() => {
  let secend = Math.ceil((ETime.value - STime.value) / 1000);
  let m = Math.floor(secend / 60);
  let s = secend % 60;

  return `${m}分${s}秒`;
});

let timer: any;
let countDown: any;
const Must = ref(true);
//倒计时
const TimeLimit = computed(() => {
  if (Paper.value.SecondLimit == 0) {
    return "--:--";
  } else if (Time.value == 0) {
    clearInterval(timer);
    let s = 3;
    countDown = setInterval(() => {
      if (s == 0) {
        config_submit();
        clearInterval(countDown);
      }
      showDialog({
        message: `答题时间到，${s}秒后自动交卷。`,
      })
        .then(() => {
          config_submit();
          clearInterval(timer);
        })
        .finally(() => {
          closeDialog();
          Must.value = !Must.value;
          clearInterval(countDown);
        });
      s--;
    }, 1000);
    return "00:00";
  } else {
    let s: number | string = Time.value % 60;
    let m: number | string = Math.floor(Time.value / 60);
    s = s < 10 ? `0${s}` : s;
    m = m < 10 ? `0${m}` : m;
    return `${m}:${s}`;
  }
});
const UnAnswerd = computed(() => {
  let arr = AnswerList.value.filter((v) => {
    return (
      ([0, 1, 2].includes(v.Type) && v.PIIDs.length > 0) ||
      (v.Type == 3 && v.Answer != "")
    );
  });
  return AnswerList.value.length - arr.length;
});

const Flags = computed<boolean>(() => {
  return (
    new Date().getTime() > new Date(Paper.value.STime).getTime() &&
    new Date().getTime() < new Date(Paper.value.ETime).getTime()
  );
});

//倒计时开始
function beign_time() {
  timer = setInterval(() => {
    Time.value--;
  }, 1000);
}

//答题开始
function begin_answer() {
  if (
    Paper.value.AnsweredTimes >= Paper.value.TimeLimit &&
    Paper.value.TimeLimit > 0
  ) {
    showFailToast("已超过答题次数！");
  } else if (
    new Date().getTime() + Paper.value.SecondLimit * 1000 >
    new Date(Paper.value.ETime).getTime()
  ) {
    showDialog({
      message: `因临近截至时间(${timeFormat(
        Paper.value.ETime,
        DateFMT.YMDHm
      )})，答题时长时长不足${Math.ceil(
        (new Date(Paper.value.ETime).getTime() - new Date().getTime()) / 60000
      )}分钟`,
      confirmButtonText: "开始考试",
      cancelButtonText: "我在想想",
    })
      .then(() => {
        Time.value = Math.floor(
          (new Date(Paper.value.ETime).getTime() - new Date().getTime()) / 1000
        );
        ShowNotice.value = !ShowNotice.value;
        STime.value = new Date().getTime();
        beign_time();
      })
      .catch(() => {
        console.log("取消");
      })
      .finally(() => {
        closeDialog();
      });
  } else if (
    Paper.value.TimeLimit <= Paper.value.AnsweredTimes &&
    Paper.value.TimeLimit !== 0
  ) {
    showFailToast({
      duration: 3000,
      message: "答题次数已用尽，如需继续答题，请联系管理员",
    });
  } else {
    ShowNotice.value = !ShowNotice.value;
    STime.value = new Date().getTime();
    beign_time();
  }
}
/**
 * 本地缓存考试记录
 */
function saveLocalStorage(v?: any) {
  if (v.Type == 3 || v.Type == 4) {
    delay_cb("change", 1000, () => {
      AnswerdLogs.value[PaperID.value] = AnswerList.value;
    });
  } else {
    AnswerdLogs.value[PaperID.value] = AnswerList.value;
  }
  store.set("answerdlogs", AnswerdLogs.value);
}

/**
 * 交卷逻辑
 */
async function config_submit() {
  ShowSign.value = !ShowSign.value;
}

/**
 * 交卷
 * @param must
 */
async function submit(must: boolean = false) {
  //强制交卷
  if (must) {
    showConfirmDialog({
      message: "时间到，请交卷",
    })
      .then(async () => {
        config_submit();
      })
      .catch(async () => {
        config_submit();
      });
  } else if (
    //答案列表中如果有未作答的提示
    AnswerList.value.some((v) => {
      return (
        ([0, 1, 2].includes(v.Type) && v.PIIDs.length == 0) ||
        (v.Type == 3 && v.Answer == "")
      );
    })
  ) {
    showConfirmDialog({
      message: "还有题未作答，确认交卷？",
    })
      .then(() => {
        config_submit();
        clearInterval(timer);
        clearInterval(countDown);
      })
      .catch(() => {
        console.log("取消");
      });
  } else {
    //自主交卷
    showConfirmDialog({
      message: "是否交卷",
    })
      .then(() => {
        config_submit();
        clearInterval(timer);
        clearInterval(countDown);
      })
      .catch(() => {
        console.log("取消");
      });
  }
}

/**
 * 跳转至所选编号的试题
 * @param n
 */
function edit_answer(n: number) {
  ShowPopUp.value = !ShowPopUp.value;
  Active.value = n;
}

/**
 * 交卷后，查看试卷
 */
async function see_again() {
  router.push(
    `/Answerd/Detail/${EID.value}/${PaperID.value}${
      TrainID.value ? `?trainID=${TrainID.value}` : ""
    }`
  );
}

/**
 * 再考一次
 */
function answer_agian() {
  router.go(0);
}

/**
 * 返回培训列表
 */
function goToTrainList() {
  location.href.includes("wechat.tansuyun.cn")
    ? (location.href = `https://wechat.tansuyun.cn/y5/train/#/train/list/${EID.value}`)
    : (location.href = `http://192.168.31.132:5175/#/train/list/${EID.value}`);
}

const OID = ref(0);
const TrainID = ref(0);
const ShowSign = ref(false);
const Answerd = ref<{ [index: string]: any }>({});
async function success(s: string) {
  ETime.value = new Date().getTime();
  let answers = new EntityAnswerPapersReq();
  let arr: EntityAnswerPaperAnswer[] = [];
  AnswerList.value.forEach((v, i) => {
    if (v.Type == 2) {
      v.PIIDs = [...v.PIIDs];
    }
    let obj = new EntityAnswerPaperAnswer();
    for (let i in v) {
      if (i != "Type") {
        //@ts-ignore
        obj[i] = v[i];
      }
    }
    let PIIDs: number[] = [];
    let nums: number[] = [];
    v.PIIDs.forEach((n: number) => PIIDs.push(n));
    Object.keys(RightList.value[i]).forEach((n) => {
      nums.push(Number(n));
    });
    if (PIIDs.length != nums.length || PIIDs.some((z) => !nums.includes(z))) {
      Score.value -= Questions.value[i].Score;
    }
    arr.push(obj);
  });

  Answerd.value = await wait(
    PapersApi.answerByPaperID(
      PaperID.value,
      TrainID.value ? TrainID.value : 0,
      Object.assign(new EntityAnswerPapersReq(), {
        Answers: arr,
        UID: yStore.User.UID,
        Sign: s,
        STime: new Date(STime.value),
        ETime: new Date(ETime.value),
      })
    ),
    "交卷中，请稍后。。。"
  );
  Err.value = Answerd.value?.PQIDScores.filter((v: any) => v.Score == 0);
  if (Answerd.value.PaperID) {
    store.set("err", Err.value);
    store.set("score", Answerd.value.Score);
    store.set("total", Total.value);
    store.set("answer", AnswerList.value);
    store.set("rate", Answerd.value.Rate);
    store.set("errNum", Answerd.value.ErrNum);
    store.set("usetime", Math.ceil((ETime.value - STime.value) / 1000));
    delete AnswerdLogs.value[PaperID.value];
    store.set("answerdlogs", AnswerdLogs.value);
    ShowSign.value = !ShowSign.value;
    ShowResult.value = !ShowResult.value;
    closeDialog();
  } else {
    ShowSign.value = !ShowSign.value;
    closeDialog();
  }
}
function cancel() {
  if (!Must.value) {
    showFailToast("考试时间已到，必须签字返回。");
  } else {
    ShowSign.value = !ShowSign.value;
    timer();
  }
}

const EID = ref(0);
const Height = computed(() => {
  return `${window.innerHeight}px`;
});
let ErrMessage = "";
const AnswerdLogs = ref<{ [index: number]: any }>({});

const ShowToast = ref(false);
onMounted(async () => {
  EID.value = Number(route.params.EID);
  store.get("");
  PaperID.value = Number(route.params.PaperID);
  //@ts-ignore
  Number(route.query.trainID) && (TrainID.value = Number(route.query.trainID));
  try {
    Paper.value = await wait(PapersApi.readByPaperID(PaperID.value));
  } catch (e) {
    //@ts-ignore
    ErrMessage = e.message;
    if (ErrMessage.length) {
      ShowToast.value = !ShowToast.value;
    }
  }
  Time.value = Paper.value.SecondLimit * 60;
  Questions.value = Paper.value.Questions;
  Questions.value?.map((v) => {
    if (v.Type == 2) {
      v.Items.push(
        Object.assign(new EntityPaperItem(), {
          PIID: 1,
          Name: "正确",
          Right: v.Right == 1 ? 1 : 0,
        }),
        Object.assign(new EntityPaperItem(), {
          PIID: 0,
          Name: "错误",
          Right: v.Right == 0 ? 1 : 0,
        })
      );
    }
    v.Items.map((d, i) => {
      d.Name = `${word.split("")[i]}、${d.Name}`;
    });
  });
  Questions.value
    ?.sort((a: any, b: any) => {
      return a.Type - b.Type;
    })
    .forEach((value: any, index: any) => {
      Total.value += value.Score;
      //正确答案题组
      let rights = value.Items.filter((v) => v.Right || v.Score);
      RightList.value.push(array_key_set(rights, "PIID"));
      let item = new EntityAnswerPaperAnswer();
      item.PQID = value.PQID;
      switch (value.Type) {
        case 0:
          item.PIIDs = [];
          break;
        case 1:
          item.PIIDs = [];
          break;
        case 2:
          item.PIIDs = [];
          break;
        case 3:
          item.Answer = "";
          break;
        case 4:
          item.Answer = "";
          break;
        default:
          break;
      }
      AnswerList.value.push(Object.assign(item, { Type: value.Type }));
    });
  store.set("right", RightList.value);
  Score.value = Total.value;
  store.set("grade", Paper.value);
  AnswerdLogs.value = store.get("answerdlogs", {});
  if (
    AnswerdLogs.value[PaperID.value] &&
    AnswerdLogs.value[PaperID.value].length
  ) {
    AnswerList.value = AnswerdLogs.value[PaperID.value];
    begin_answer();
  }

  Flag.value = [];
});
</script>
<style scoped lang="less">
.van-radio,
.van-checkbox {
  width: 90%;
}

.van-radio-group,
.van-checkbox-group {
  width: 100%;
}

.height {
  min-height: v-bind(Height);
}

.center {
  margin: 0 auto;
}
.mt12 {
  margin-top: 12px;
}
</style>
