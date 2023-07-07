<template>
  <van-row class="back_blue height180">
    <van-row class="block margin_20_25">
      <van-col class="white flex" span="18">
        <van-col @click="go_back">
          <van-icon size="16px" name="arrow-left" />
        </van-col>
        <van-col offset="1" class="font16 left">{{ Grade.Title }}</van-col>
      </van-col>
      <van-col class="white_small flex" span="6">
        <van-col><i class="yan5 yan-dingwei"></i></van-col>
        <van-col offset="1" class="font13">{{
          yStore.Enter?.Simple?.length
            ? yStore.Enter?.Simple
            : yStore.Enter?.Name
        }}</van-col>
      </van-col>
    </van-row>
    <van-row class="block" align="center" justify="space-around">
      <van-col>
        <van-col class="white">
          <span class="font23">{{ Score }}</span>
          分
        </van-col>
        <van-col class="white_small margin4_top">本次得分</van-col>
      </van-col>
      <van-col>
        <van-col class="white">
          <span class="font23">
            {{ ErrNum }}
          </span>
        </van-col>
        <van-col class="white_small margin4_top">本次错题</van-col>
      </van-col>
      <van-col>
        <van-col class="white">
          <span class="font23">
            {{ Rate }}
          </span>
          %
        </van-col>
        <van-col class="white_small margin4_top">正确率</van-col>
      </van-col>
    </van-row>
    <van-row align="center" justify="space-between" class="block margin15_top">
      <van-col
        offset="4"
        class="back_white border_blue radius50 round71 flex_column"
      >
        <van-row class="blue font20 font_bold">{{ AnswerTime }}</van-row>
        <van-row class="blue_small font13"> 答题用时 </van-row>
      </van-col>
      <van-col v-if="yStore.User.UID" offset="1" class="blue_small font14">
        <i class="yan5 yan5-zuzhijiagou_renyuan-xianxing"></i>
        {{ yStore.User.Name }}</van-col
      >
      <!-- <van-col offset="1" class="blue_small font14">
        当前排名：17
      </van-col> -->
      <!-- <van-col
        v-if="yStore.User.UID"
        offset="2"
        class="blue_small more back_blue_small radius12 font12 padding_0_8"
        @click="to_more"
      >
        更多
        <van-icon color="#82affd" name="arrow" />
      </van-col> -->
    </van-row>
  </van-row>
  <van-row class="margin_20_0">
    <template v-for="(v, k) in Questions" :key="k">
      <van-row v-if:show="Active == k" class="block left padding_20_0">
        <Detail
          :k="k"
          :v="v"
          :Type="ShowMapQuestionType[v.Type]"
          :AnswerList="AnswerList"
        ></Detail>
      </van-row>
    </template>
  </van-row>
  <van-row class="empty"></van-row>
  <Foot
    :ModelValue="ShowPopUp"
    :Active="Active"
    :QusetionsLen="Questions.length"
    :Status="1"
    :UnAnswerd="0"
    :Type="'Detail'"
    @next="next"
    @up="up"
    @show="showPopup()"
    @again="again"
  ></Foot>
  <PopUp
    :ModelValue="ShowPopUp"
    :Active="Active"
    :AnswerList="AnswerList"
    :QusetionsLen="Questions.length"
    :Status="1"
    :Flag="Flag"
    :UnAnswerd="0"
    @show="showPopup()"
    @edit_answer="edit_answer"
    @again="again"
  ></PopUp>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import Foot from "../component/Foot.vue";
import PopUp from "../component/PopUp.vue";
import Detail from "../component/Detail.vue";
import { store } from "@ctsy/common";
import { useRouter, useRoute } from "vue-router";
import { ShowMapQuestionType } from "@yakj/sdk/sdk/maps";
// import get_yan_store from "../store/yan";
import usePopup from "../hooks/popup";
import useChange from "../hooks/cut";
import { useStore } from "../store";

const router = useRouter();
const route = useRoute();
const yStore = useStore();

const Grade: { [index: string]: any } = ref({});
const AnswerList = ref([] as { [index: string]: any }[]);
const UseTime = ref(0);
const { showPopup, ShowPopUp } = usePopup();
const Flag = ref([] as number[]);
const Score = ref(0);
const Total = ref(0);
const { Active, up, next, Questions } = useChange();

const ErrNum = ref(0);
const AnswerTime = computed(() => {
  let s: number | string = UseTime.value % 60;
  let m: number | string = Math.floor(UseTime.value / 60);
  m = m < 10 ? `0${m}` : `${m}`;
  s = s < 10 ? `0${s}` : `${s}`;
  return `${m}:${s}`;
});
const Rate = ref(0);

const TrainID = ref(0);
let EID = 0;
function go_back() {
  router.go(-1);
  if (TrainID.value) {
    location.href = `https://wechat/tansuyun/cn/y5/#/train/log/${EID}`;
  } else {
    router.go(-1);
  }
}
function to_more() {
  console.log("更多");
}

function edit_answer(n: number) {
  ShowPopUp.value = !ShowPopUp.value;
  Active.value = n;
}
function again() {
  store.rm("answer");
  router.go(-1);
}

onMounted(async () => {
  Number(route.query.trainID) && (TrainID.value = Number(route.query.trainID));
  EID = Number(route.params.EID);
  ErrNum.value = store.get("errNum");
  Grade.value = store.get("grade");
  UseTime.value = store.get("usetime");
  AnswerList.value = store.get("answer");
  Rate.value = store.get("rate");
  Score.value = store.get("score");
  Total.value = store.get("total");
  Questions.value = Grade.value.Questions;
  Questions.value.forEach((v, k) => {
    v.Items.forEach((d, i) => {
      if (AnswerList.value[k].PIIDs.includes(d.PIID)) {
        Flag.value[k] = d.Right || d.Score;
      }
    });
  });
});
</script>
<style scoped lang="less"></style>
