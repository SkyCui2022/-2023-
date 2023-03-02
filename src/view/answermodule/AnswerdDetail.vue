<template>
  <van-row class="back_blue height180">
    <van-row class="block margin_20_25">
      <van-col class="white flex" span="18">
        <van-col @click="go_back">
          <van-icon size="16px" name="arrow-left" />
        </van-col>
        <van-col offset="1" class="font16">{{ Grade.Title }}</van-col>
      </van-col>
      <van-col class="white_small flex" span="6">
        <van-col><i class="iconfont icon-dingwei"></i></van-col>
        <van-col offset="1" class="font13">{{ EName }}</van-col>
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
            {{ Err.length }}
          </span>
        </van-col>
        <van-col class="white_small margin4_top">本次错题</van-col>
      </van-col>
      <van-col>
        <van-col class="white">
          <span class="font23">
            {{ Number((Score / Total).toFixed(2)) * 100 }}
          </span>
          %
        </van-col>
        <van-col class="white_small margin4_top">正确率</van-col>
      </van-col>
    </van-row>
    <van-row align="center" justify="center" class="block margin15_top">
      <van-col class="back_white border_blue radius50 round71 flex_column">
        <van-row class="blue font20 font_bold">{{ AnswerTime }}</van-row>
        <van-row class="blue_small font13">
          答题用时
        </van-row>
      </van-col>
      <van-col offset="1" class="blue_small font14">{{ yStore.User.Name }}</van-col>
      <!-- <van-col offset="1" class="blue_small font14">
        当前排名：17
      </van-col> -->
      <van-col offset="2" class="blue_small more back_blue_small radius12 font12 padding_0_8" @click="to_more">
        更多
        <van-icon color="#82affd" name="arrow" />
      </van-col>
      <van-row></van-row>
    </van-row>
  </van-row>
  <van-row class="margin_20_0">
    <template v-for="(v, k) in Questions" :key="k">
      <van-row v-if:show="Active == k" class="block left padding_20_0">
        <Detail :k="k" :v="v" :Type="ShowMapQuestionType[v.Type]" :AnswerList="AnswerList"></Detail>
      </van-row>
    </template>
  </van-row>
  <van-row class="empty"></van-row>
  <Foot :ModelValue="ShowPopUp" :Active="Active" :QusetionsLen="Questions.length" :Status="1" :UnAnswerd="0" @next="next"
    @up="up" @show="showPropup()" @again="again"></Foot>
  <PopUp :ModelValue="ShowPopUp" :Active="Active" :AnswerList="AnswerList" :QusetionsLen="Questions.length" :Status="1"
    :Flag="Flag" :UnAnswerd="0" @show="showPropup()" @edit_answer="edit_answer" @again="again"></PopUp>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, } from 'vue'
import Foot from './component/Foot.vue'
import PopUp from './component/PopUp.vue'
import Detail from './component/Detail.vue'
import { store } from '@ctsy/common'
import { useRouter } from 'vue-router'
import { EntityPaperQuestion, PapersApi } from '@yakj/sdk/sdk/sdk'
import { ShowMapQuestionType } from '@yakj/sdk/sdk/maps'
import { Toast } from 'vant'
import get_yan_store from '../../store/yan'
import usePopup from './hooks/popup'
import useChange from './hooks/cut'

const router = useRouter()
const yStore = get_yan_store()

const Grade: { [index: string]: any } = ref({})
const EName = ref('企业简称')
const AnswerList = ref([] as { [index: string]: any }[])
const UseTime = ref(0)
const { showPropup, ShowPopUp } = usePopup()
const Flag = ref([] as number[])
const Score = ref(0)
const Total = ref(0)
const { Active, up, next, Questions } = useChange()


const Err = ref([] as any)
const AnswerTime = computed(() => {
  let s: number | string = UseTime.value % 60
  let m: number | string = Math.floor(UseTime.value / 60)
  m = m < 10 ? `0${m}` : `${m}`
  s = s < 10 ? `0${s}` : `${s}`
  return `${m}:${s}`
})

function go_back() {
  router.go(-1)
}
function to_more() {
  console.log('更多')
}

function edit_answer(n: number) {
  ShowPopUp.value = !ShowPopUp.value
  Active.value = n
}
function again() {
  router.go(-1)
}

onMounted(async () => {
  Err.value = store.get('err')
  Grade.value = store.get('grade')
  UseTime.value = store.get('usetime')
  AnswerList.value = store.get('answer')
  Score.value = store.get('score')
  Total.value = store.get('total')
  Questions.value = Grade.value.Questions
  Questions.value.forEach((v, k) => {
    v.Items.forEach((d, i) => {
      if (AnswerList.value[k].PIIDs.includes(d.PIID)) {
        Flag.value[k] = d.Right
      }
    })
  })
})
</script>
<style scoped lang="less"></style>
