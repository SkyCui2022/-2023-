<template>
  <template v-if="ShowNotice">
    <van-row>
      <van-col span="24" class="font18 font500">
        <h1>答题须知</h1>
      </van-col>
    </van-row>
    <van-row class="padding_20_10" v-if="LearnTime">
      <van-col offset="6">
        <strong>学习时长：</strong>
      </van-col>
      <van-col class="font16 font500">{{ LearnTime }}分钟</van-col>
    </van-row>
    <van-row class="padding_20_10" v-if="Paper.SecondLimit > 0">
      <van-col offset="6">
        <strong>答题时长：</strong>
      </van-col>
      <van-col class="font14 font500">
        {{ Math.floor(Paper.SecondLimit / 60) }}分钟{{ Paper.SecondLimit % 60 ? `${Paper.SecondLimit % 60}秒` : '' }}
      </van-col>
    </van-row>
    <van-row class="padding_20_10">
      <van-col offset="6">
        <strong>答题机会：</strong>
      </van-col>
      <van-col class="blue font14 font500">
        共{{ Paper.TimeLimit }}次&nbsp;已用{{ Paper.AnsweredTimes }}次
      </van-col>
    </van-row>
    <van-row class="padding_20_10">
      <van-col offset="6">
        <strong>试卷总分：</strong>
      </van-col>
      <van-col class="font14 font500">{{ Paper.Full }}分</van-col>
    </van-row>
    <van-row class="padding_20_10">
      <van-col offset="6">
        <strong>及格分数：</strong>
      </van-col>
      <van-col class="font14 font500">{{ Paper.Pass }}分</van-col>
    </van-row>
    <van-row>
      <van-col span="24" class="red font14">
        若超过答题时间，系统将自动关闭。
      </van-col>
    </van-row>
    <van-row class="fixed box_240_50 round50 back_blue white font16 transform50_X line50_height">
      <van-col span="24" @click="begin_answer">准备好了，开始答题</van-col>
    </van-row>
  </template>
  <template v-else>
    <van-row class="back_blue white height107">
      <van-row class="block padding_20_10" align="bottom" justify="space-between">
        <van-col class="font20 eli" span="20">
          <van-icon name="arrow-left" size="20" />
          {{ Paper.Name }}
        </van-col>
        <van-col class="white_small font13">
          <i class="iconfont icon-dingwei"></i>
          {{ yStore.Enter.EName }}
        </van-col>
      </van-row>
      <van-row align="center" class="relative block">
        <van-col class="round">
          <van-row class="blue font20">{{ TimeLimit }}</van-row>
          <van-row class="white_small font13">倒计时</van-row>
        </van-col>
        <van-col offset="1" class="white_small font14 spacing2">
          还未作答：{{ UnAnswerd }}道
        </van-col>
      </van-row>
    </van-row>
    <van-row class="margin_20px_0">
      <template v-for="(v, k) in Questions" :key="k">
        <van-row v-if:show="Active == k" class="block left padding_20_0">
          <van-col span="22" offset="1">
            <span class="font14 bold">
              &nbsp;{{ k + 1 }}.&nbsp;&nbsp;{{ v.Name }}
            </span>

            <van-tag plain type="primary">
              {{ ShowMapQuestionType[v.Type] }}
            </van-tag>
          </van-col>
          <template v-if="v.Type == 0">
            <van-radio-group v-model="AnswerList[k].PIIDs[0]">
              <van-radio v-for="(item, index) in v.Items" :name="item.PIID">
                {{ item.Name }}
              </van-radio>
            </van-radio-group>
          </template>
          <template v-if="v.Type == 1">
            <van-checkbox-group v-model="AnswerList[k].PIIDs">
              <van-checkbox v-for="(item, index) in v.Items" :name="item.PIID">
                {{ item.Name }}
              </van-checkbox>
            </van-checkbox-group>
          </template>
          <template v-if="v.Type == 2">
            <van-radio-group v-model="AnswerList[k].PIIDs[0]">
              <van-radio name="1">
                正确
              </van-radio>
              <van-radio name="0">
                错误
              </van-radio>
            </van-radio-group>
          </template>
          <template v-if="v.Type == 3">
            <van-cell-group inset>
              <van-field v-model="AnswerList[k].Answer" rows="1" autosize type="textarea" placeholder="请输入正确答案" />
            </van-cell-group>
          </template>
          <template v-if="v.Type == 4">
            <van-cell-group inset>
              <van-field v-model="AnswerList[k].Answer" rows="1" autosize type="textarea" placeholder="请输入正确答案" />
            </van-cell-group>
          </template>
        </van-row>
      </template>
      <van-row class="empty"></van-row>
    </van-row>
    <Foot :ModelValue="ShowPopUp" :Active="Active" :QusetionsLen="Questions.length" :Status="0" :UnAnswerd="UnAnswerd"
      @show="showPropup()" @submit="submit()" @next="next" @up="up"></Foot>
  </template>
  <PopUp :ModelValue="ShowPopUp" :Active="Active" :AnswerList="AnswerList" :QusetionsLen="Questions.length" :Status="0"
    :Flag="Flag" :UnAnswerd="UnAnswerd" @show="showPropup()" @submit="submit" @edit_answer="edit_answer"></PopUp>
  <van-dialog v-model:show="ShowResult" show-cancel-button confirm-button-text="考试回顾" confirm-button-color="#000"
    cancel-button-text="再答一次" @confirm="see_again" @cancel="answer_agian">
    <van-row class="padding_20_10">
      <van-col span="24" :class="`padding_20_10 ${Score >= Paper.Pass ? 'green' : 'red'}`">
        {{ Score >= Paper.Pass ? '答题合格' : '答题不合格' }}
      </van-col>
      <van-col span="24">
        考试用时
        <strong>{{ UseTime }}</strong>
      </van-col>
    </van-row>
    <van-row :class="`round_result ${Score >= Paper.Pass ? 'border_green' : 'border_red'
      }`">
      <van-col :class="`${Score >= Paper.Pass ? 'green' : 'red'}`">
        <span class="font30 font600">{{ Score }}</span>
        分
      </van-col>
      <van-col class="gray_result font13">考试成绩</van-col>
    </van-row>
    <van-row align="center" justify="space-around" class="padding_20_10">
      <van-col>答题:{{ AnswerList.length }}</van-col>
      <van-col>对:{{ AnswerList.length - Err.length }}</van-col>
      <van-col>错:{{ Err.length }}</van-col>
    </van-row>
  </van-dialog>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import {
  EntityPapers,
  EntityAnswerPaperAnswer,
  PapersApi,
  EntityAnswerPapersReq,
} from '@yakj/sdk/sdk/sdk'
import { ShowMapQuestionType } from '@yakj/sdk/sdk/maps'
import {
  Toast,
  Dialog,
} from 'vant'
import { useRouter, useRoute } from 'vue-router'
import { array_key_set, store, } from '@ctsy/common'
import Foot from './component/Foot.vue'
import PopUp from './component/PopUp.vue'
import { wait } from '../../api/lib'
import get_yan_store from '../../store/yan'
import { EID } from '../../api/Paper'
import usePopup from './hooks/popup'
import useChange from './hooks/cut'

const yStore = get_yan_store()
const router = useRouter()
const route = useRoute()
const PaperID = ref(12)
const ShowNotice = ref(true)
const { ShowPopUp, showPropup } = usePopup()
const ShowResult = ref(false)
const Flag = ref([])
const { Active, up, next, Questions } = useChange()
const STime = ref(0)
const ETime = ref(0)
const Paper = ref(new EntityPapers())
const AnswerList = ref([] as { [index: string]: any }[])
const Time = ref(0)
const Total = ref(0)
const Score = ref(0)
const RightList = ref([] as any)
const Err = ref([] as any)
const UseTime = computed(() => {
  let secend = Math.ceil((ETime.value - STime.value) / 1000)
  let m = Math.floor(secend / 60)
  let s = secend % 60

  return `${m}分${s}秒`
})

const LearnTime = computed(() => {
  let t = store.get('learntime')
  if (t) {
    let s = t % 60
    let m = Math.floor(t / 60)
    if (m > 0) {
      return `${m}`
    } else {
      return `${(s / 60).toFixed(0)}`
    }
  } else {
    return 0
  }
})

let timer: any
const TimeLimit = computed(() => {
  if (Paper.value.SecondLimit == 0) {
    return '--:--'
  } else if (Time.value == 0) {
    clearInterval(timer)
    let s = 3
    let CountDown = setInterval(() => {
      if (s == 0) {
        config_submit()
        return clearInterval(CountDown)
      }
      Dialog({
        message: `答题时间到，${s}秒后自动交卷。`
      })
      s--
    }, 1000)
    return '00:00'
  } else {
    let s: number | string = Time.value % 60
    let m: number | string = Math.floor(Time.value / 60)
    s = s < 10 ? `0${s}` : s
    m = m < 10 ? `0${m}` : m
    return `${m}:${s}`
  }
})
const UnAnswerd = computed(() => {
  let arr = AnswerList.value.filter((v) => {
    return (
      (v.Type == 0 && v.PIIDs.length > 0) ||
      (v.Type == 1 && v.PIIDs.length > 0) ||
      (v.Type == 2 && v.PIIDs.length > 0) ||
      (v.Type == 3 && v.Answer != '')
    )
  })
  return AnswerList.value.length - arr.length
})

function beign_time() {
  timer = setInterval(() => {
    Time.value--
  }, 1000)
}

function begin_answer() {
  if (Paper.value.AnsweredTimes >= Paper.value.TimeLimit && Paper.value.TimeLimit > 0) {
    Toast.fail('已超过答题次数！')
  } else {
    ShowNotice.value = !ShowNotice.value
    STime.value = new Date().getTime()
    beign_time()
  }
}

async function config_submit() {
  ETime.value = new Date().getTime()
  let answers = new EntityAnswerPapersReq()
  let arr: EntityAnswerPaperAnswer[] = []
  AnswerList.value.forEach((v, i) => {
    if (v.Type == 2) {
      v.PIIDs = [...v.PIIDs]
    }
    let obj = new EntityAnswerPaperAnswer()
    for (let i in v) {
      if (i != 'Type') {
        //@ts-ignore
        obj[i] = v[i]
      }
    }
    let PIIDs: number[] = []
    let nums: number[] = []
    v.PIIDs.forEach((n: number) => PIIDs.push(n))
    Object.keys(RightList.value[i]).forEach((n) => { nums.push(Number(n)) })
    if ((PIIDs.length != nums.length) || (PIIDs.some((z) => !nums.includes(z)))) {
      Score.value -= Questions.value[i].Score
      Err.value.push(v)
    }
    arr.push(obj)
  })
  answers = {
    OType: 'Train',
    OID: '1',
    Answers: arr,
    STime: new Date(STime.value),
    ETime: new Date(ETime.value),
    $set: () => new EntityAnswerPapersReq(),
  }
  let rs: any = await wait(PapersApi.answerByPaperID(PaperID.value, 1, answers), '交卷中，请稍后。。。')
  store.set('err', Err.value)
  store.set('score', Score.value)
  store.set('total', Total.value)
  store.set('answer', AnswerList.value)
  store.set('usetime', Math.ceil((ETime.value - STime.value) / 1000))
  ShowResult.value = !ShowResult.value
}

async function submit(must: boolean = false) {
  if (must) {
    Dialog({
      message: '时间到，请交卷',
    })
      .then(async () => {
        config_submit()
      })
      .catch(async () => {
        config_submit()
      })
  } else if (
    AnswerList.value.some((v) => {
      return (
        (v.Type == 0 && v.PIIDs.length == 0) ||
        (v.Type == 1 && v.PIIDs.length == 0) ||
        (v.Type == 2 && v.PIIDs.length == 0) ||
        (v.Type == 3 && v.Answer == '')
      )
    })
  ) {
    Dialog({
      message: '还有题未作答，确认交卷？',
    })
      .then(() => {
        config_submit()
      })
      .catch(() => {
        console.log('取消')
      })
  } else {
    Dialog({
      message: '是否交卷',
    })
      .then(() => {
        config_submit()
        clearInterval(timer)
      })
      .catch(() => {
        console.log('取消')
      })
  }
}

function edit_answer(n: number) {
  ShowPopUp.value = !ShowPopUp.value
  Active.value = n
}

async function see_again() {
  router.push(`/Answerd/Detail/${EID}`)
}
function answer_agian() {
  router.go(0)
}
onMounted(async () => {
  PaperID.value = Number(route.params.PaperID)
  Paper.value = await wait(PapersApi.getByPaperID(PaperID.value))
  yStore.getUserInfo(Paper.value.CUID)
  Time.value = Paper.value.SecondLimit
  Questions.value = Paper.value.Questions
  Questions.value.sort((a, b) => {
    return a.Type - b.Type
  })
  Questions.value.forEach((value, index) => {
    Total.value += value.Score
    let rights = value.Items.filter((v) => v.Right)
    RightList.value.push(array_key_set(rights, 'PIID'))
    let item = new EntityAnswerPaperAnswer()
    item.PQID = value.PQID
    switch (value.Type) {
      case 0:
        item.PIIDs = []
        break
      case 1:
        item.PIIDs = []
        break
      case 2:
        item.PIIDs = []
        break
      case 3:
        item.Answer = ''
        break
      case 4:
        item.Answer = ''
        break
      default:
        break
    }
    AnswerList.value.push(Object.assign(item, { Type: value.Type }))
  })
  Score.value = Total.value
  store.set('grade', Paper.value)
  Flag.value = []
})
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

.eli {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
