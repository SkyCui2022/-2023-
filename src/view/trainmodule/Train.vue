<template>
  <van-sticky>
    <van-row class="back_blue height180">
      <van-row class="block margin_20_25">
        <van-col class="white flex" span="18">
          <van-col @click="go_back">
            <van-icon size="16px" name="arrow-left" />
          </van-col>
          <van-col offset="1" class="font16">{{ Reslut.Name }}</van-col>
        </van-col>
        <van-col class="white_small flex" span="6">
          <van-col><van-icon size="12px" name="location" /></van-col>
          <van-col offset="1" class="font13">{{ yStore.Enter.Simple }}</van-col>
        </van-col>
      </van-row>
      <van-row class="block" align="center" justify="space-around">
        <van-col>
          <van-col class="white">
            <span class="font23">{{ Reslut.Mine.Count }}</span>
            次
          </van-col>
          <van-col class="white_small margin4_top">我的答题</van-col>
        </van-col>
        <van-col>
          <van-col class="white">
            <span class="font23">
              {{ Math.ceil(Reslut.Mine.Seconds / 60) }}
            </span>
            分钟
          </van-col>
          <van-col class="white_small margin4_top">累计学习时长</van-col>
        </van-col>
        <van-col>
          <van-col class="white">
            <span class="font23">{{ Reslut.Mine.AvgScore }}</span>
            %
          </van-col>
          <van-col class="white_small margin4_top">正确率</van-col>
        </van-col>
      </van-row>
      <van-row align="center" justify="center" class="block margin15_top">
        <van-col class="back_white border_blue radius50 round71 flex_column">
          <van-row :class="`blue font_bold ${Time > 3600 ? 'font16' : 'font20'}`">
            {{ LearnTime }}
          </van-row>
          <van-row class="blue_small font13">
            学习时长
          </van-row>
        </van-col>
        <van-col offset="1" class="blue_small font14">
          {{ yStore.User.Name }}
        </van-col>
        <van-col offset="1" class="blue_small font14">
          最佳成绩：{{ Reslut.Mine.MaxScore }}分
        </van-col>
        <van-col v-if="Active != 4" offset="2" class="blue_small more back_blue_small radius12 padding_4_8"
          @click="to_more">
          更多
          <van-icon color="#fff" name="arrow" />
        </van-col>

        <van-row></van-row>
      </van-row>
    </van-row>
    <van-row v-if:show="ShowTab" class="padding30_top backWhite" justify="space-around">
      <template v-for="(v, k) in Tabs" :key="k">
        <Tab :ModelValue="v" :Active="k" :class="Active == k ? 'blue' : ''" @change_active="change_active"></Tab>
      </template>
    </van-row>
  </van-sticky>
  <!-- 培训内容 -->
  <van-row v-if="Active == 0">
    <template v-if="TextContentType.includes(Reslut.CType)">
      <van-col offset="1" span="22">
        <p class="block" v-html="Reslut.Content"></p>
      </van-col>
    </template>
    <template v-if="URLType.includes(Reslut.CType)">
      <template v-for="(v, k) in Reslut.URLs" :key="k">
        <van-col offset="1" span="22" @click="
          ImagePreview({
            images: Reslut.URLs,
            startPosition: k,
          })
        " class="image">
          <van-image :src="v"></van-image>
        </van-col>
      </template>
    </template>

    <van-row :class="MinReadTime ? 'red block height50' : 'empty'">
      <van-col span="24">
        {{
          MinReadTime > 0
          ? `单次学习时长达${Math.ceil(MinReadTime / 60)}分钟才能签字提交`
          : ''
        }}
      </van-col>
    </van-row>
    <van-row class="empty"></van-row>
    <van-row class="gray fixed_bottom">
      <van-col span="24" @click="submit" :class="MinReadTime >= Time ? 'disable height50' : 'undisable height50'">
        <i :class="`iconfont icon-${Reslut.PaperID ? 'shijuan' : 'bianji'}`"></i>
        {{ Reslut.PaperID ? '开始答题' : '签字提交' }}
      </van-col>
    </van-row>
  </van-row>
  <!-- 培训统计 -->
  <van-row v-if="Active == 1">
    <van-row justify="center" class="block">
      <van-empty>
        页面开发中。。。
        <br />
        敬请期待！！！
      </van-empty>
    </van-row>
  </van-row>
  <!-- 培训记录 -->
  <van-row v-if="Active == 2">
    <van-col span="22" offset="1" v-if:show="ShowTab">
      <van-search v-model="SearchValue" placeholder="搜索人员名称" left-icon="search" show-action :clearable="false">
        <template #action>
          <div @click="onClickButton">筛选</div>
        </template>
      </van-search>
    </van-col>
    <template v-if="Logs.length > 0">
      <van-list v-model:loading="Loading" :finished="Finished" finished-text="没有更多了" @load="onLoadLogs" class="block">
        <template v-for="(v, k) in Logs" :key="k">
          <LogCard :ModelValue="v" :Name="yStore.UserMap[v.CUID].Name" :Avatar="yStore.UserMap[v.CUID].Avatar"
            :Sex="yStore.UserMap[v.CUID].Sex"></LogCard>
        </template>
      </van-list>
    </template>
    <template v-else>
      <van-empty>暂无数据</van-empty>
    </template>

    <van-row class="empty"></van-row>
    <van-row class="fixed_bottom gray">
      <van-col span="24" @click="down" class="undisable height50">
        <i class="iconfont icon-xiazai"></i>
        下载记录
      </van-col>
    </van-row>
  </van-row>
  <!-- 排行榜 -->
  <van-row v-if="Active == 3">
    <van-col offset="1" span="22" v-if:show="ShowTab">
      <van-search v-model="SearchValue" placeholder="搜索人员名称" left-icon="search" show-action :clearable="false">
        <template #action>
          <div @click="onClickButton">筛选</div>
        </template>
      </van-search>
    </van-col>
    <van-row class="block yellow_small padding_10_0 margin15_top">
      <van-col offset="1" span="2">排名</van-col>
      <van-col offset="1" span="4">人员</van-col>
      <van-col span="11">部门-岗位</van-col>
      <van-col span="5">最高得分</van-col>
    </van-row>
    <template v-if="Rank.length > 0">
      <van-list v-model:loading="Loading" :finished="Finished" finished-text="没有更多了" @load="onLoadLogs" class="block">
        <template v-for="(v, k) in Rank" :key="k">
          <van-row :class="
            k === 0
              ? 'orange_small block margin_10_0'
              : k === 1
                ? 'blue_small block margin_10_0'
                : k === 2
                  ? 'black_small block margin_10_0'
                  : 'block margin_10_0'
          ">
            <van-col offset="1" span="2">
              <i v-if="k == 0" class="iconfont icon-jinpai"></i>
              <i v-else-if="k == 1" class="iconfont icon-yinpai"></i>
              <i v-else-if="k == 2" class="iconfont icon-tongpai"></i>
              <span v-else>{{ k + 1 }}</span>
            </van-col>
            <van-col offset="1" span="4">
              {{
                yStore.UserMap[`${v.CUID}`].Name
                ? yStore.UserMap[`${v.CUID}`].Name
                : '暂无数据'
              }}
            </van-col>
            <van-col span="11">{{ v.PostID }}-{{ v.UnitID }}</van-col>
            <van-col span="5">{{ v.Score }}</van-col>
          </van-row>
        </template>
      </van-list>
    </template>
    <template v-else>
      <van-empty class="block">暂无数据</van-empty>
    </template>
    <van-row class="empty"></van-row>
    <van-row class="fixed_bottom gray">
      <van-col span="24" @click="down" class="undisable height50">
        <i class="iconfont icon-xiazai"></i>
        下载记录
      </van-col>
    </van-row>
  </van-row>
  <!-- 更多 -->
  <van-row v-if="Active == 4" class="padding30_top">
    <template v-if="Logs.length > 0">
      <van-list v-model:loading="Loading" :finished="Finished" finished-text="没有更多了" @load="onLoadLogs" class="block">
        <template v-for="(v, k) in Logs" :key="k">
          <LogCard :ModelValue="v" :Name="yStore.UserMap[v.CUID].Name" :Avatar="yStore.UserMap[v.CUID].Avatar"
            :Sex="yStore.UserMap[v.CUID].Sex"></LogCard>
        </template>
      </van-list>
    </template>
    <template v-else>
      <van-empty>暂无数据</van-empty>
    </template>
    <van-row class="fixed_bottom gray">
      <van-col span="24" @click="down" class="undisable height50">
        <i class="iconfont icon-xiazai"></i>
        下载记录
      </van-col>
    </van-row>
  </van-row>
  <Sign v-model="ShowSign" @success="success" @cancel="cancel"></Sign>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import {
  TrainLogApi,
  TrainsApi,
  EntityGetTrainsRes,
  EntityRankLog,
} from '@yakj/sdk/sdk/sdk'
import { EnumTrainContentType } from '@yakj/sdk/sdk/enum'
import { store, timeout } from '@ctsy/common'
import {
  Toast,
  ImagePreview,
  DialogMessage, Dialog
} from 'vant'
import router from '../../router'
import Sign from './compotent/Sign.vue'
import LogCard from './compotent/LogCard.vue'
import Tab from './compotent/Tab.vue'
import get_yan_store from '../../store/yan'
import { wait } from '../../api/lib'
import { ULogs, TrainID, UID, UnitID, PostID } from '../../api/Train'
const yStore = get_yan_store()
const Reslut = ref(new EntityGetTrainsRes())
const Logs: any = ref([])
const Rank = ref([new EntityRankLog()])
const MinReadTime = ref(0)
const SearchValue = ref('')
const TextContentType = [
  EnumTrainContentType.TXT,
  EnumTrainContentType.Markdown,
  EnumTrainContentType.HTML,
  EnumTrainContentType.Rich,
]
const URLType = [
  EnumTrainContentType.PDF,
  EnumTrainContentType.PPT,
  EnumTrainContentType.Video,
  EnumTrainContentType.Word,
]
const Time = ref(0)
const ShowSign = ref(false)
const ShowTab = ref(true)
const LearnTime = computed(() => {
  let s: number | string = 0,
    m: number | string = 0,
    h: number | string = 0
  s = Time.value % 60
  if (Math.floor(Time.value / 60) <= 60) {
    m = Math.floor(Time.value / 60)
  } else {
    let min = Math.floor(Time.value / 60)
    h = Math.floor(min / 60)
    m = min % 60
  }
  s = s < 10 ? `0${s}` : `${s}`
  m = m < 10 ? `0${m}` : `${m}`
  h = h < 10 ? `0${h}` : `${h}`
  return Time.value > 3600 ? `${h}:${m}:${s}` : `${m}:${s}`
})
const Active = ref(0)
const Tabs = ref([
  {
    URL: 'https://f.tansuyun.cn/api/yan/2023-02-01/checklog.svg',
    Text: '培训内容',
  },
  {
    URL: 'https://f.tansuyun.cn/api/yan/2023-02-01/checklog.svg',
    Text: '培训统计',
  },
  {
    URL: 'https://f.tansuyun.cn/api/yan/2023-02-01/checklog.svg',
    Text: '培训记录',
  },
  {
    URL: 'https://f.tansuyun.cn/api/yan/2023-02-01/checklog.svg',
    Text: '排行榜',
  },
])
const Loading = ref(false)
const Finished = ref(false)
const P = ref(0)

async function onLoadLogs() {
  let t = 0
  switch (Active.value) {
    case 2:
      P.value++
      let rs = await wait(TrainLogApi.logByTrainIDPNUID(
        P.value,
        10,
        0,
        '',
        '',
        TrainID,
      ))
      t = rs.T
      Logs.value = rs.L
      rs.L.forEach((v: any) => yStore.getUserInfo(v.CUID))
      Loading.value = false
      Logs.value.length >= t
        ? (Finished.value = true)
        : (Finished.value = false)

      break
    case 3:
      P.value++
      rs = await wait(TrainLogApi.rankByTrainIDPN(
        'MaxScore DESC',
        1,
        10,
        TrainID,
      ))
      t = rs.T
      Rank.value = rs.L
      rs.L.forEach((v: any) => yStore.getUserInfo(v.CUID))
      Loading.value = false
      Rank.value.length >= t
        ? (Finished.value = true)
        : (Finished.value = false)

      break
    case 4:
      P.value++
      rs = await wait(TrainLogApi.logByTrainIDPNUID(
        P.value,
        10,
        yStore.User.UID,
        '',
        '',
        TrainID,
      ))
      t = rs.T
      Logs.value = rs.L
      rs.L.forEach((v: any) => yStore.getUserInfo(v.CUID))
      Loading.value = false
      Logs.value.length >= t
        ? (Finished.value = true)
        : (Finished.value = false)
      try {

        Toast.success('数据加载成功')

      } catch (error) {
        Toast.fail(`${error}`)
        timeout(2000)
      } finally {
        Toast.clear()
      }
      break
  }
}

let timer: any

function go_back() {
  if (Active.value == 4) {
    ShowTab.value = !ShowTab.value
    Active.value = store.get('active')
  } else {
    Dialog({
      message: '有未提交学习内容是否退出？',
    })
      .then(() => {
        clear_time()
        router.go(-1)
      })
      .catch(() => { })
  }
}

async function change_active(n: number) {
  Active.value = n
  SearchValue.value = ''
  switch (n) {
    case 2:
      let logs = await wait(TrainLogApi.logByTrainIDPNUID(1, 10, yStore.User.UID, '', '', TrainID))
      Logs.value = logs.L
      logs.L.forEach((v: any) => yStore.getUserInfo(v.CUID))

      break
    case 3:
      let rank = await wait(TrainLogApi.rankByTrainIDPN(
        'MaxScore DESC',
        1,
        10,
        TrainID,
      ))
      Rank.value = rank.L
      rank.L.forEach((v: any) => yStore.getUserInfo(v.CUID))

      break
  }
}
async function to_more() {
  Toast.loading('正在加载个人数据')
  store.set('active', Active.value)
  ShowTab.value = !ShowTab.value
  Active.value = 4
  let logs = await wait(TrainLogApi.logByTrainIDPNUID(
    1,
    10,
    yStore.User.UID,
    '',
    '',
    TrainID,
  ))
  Logs.value = logs.L
  logs.L.forEach((v: any) => yStore.getUserInfo(v.CUID))
}
function down() {
  Toast.loading({
    message: '模板正在准备\n客官请稍后！',
  })
}

function onClickButton() {
  switch (Active.value) {
    case 2:
      Logs.value = Logs.value.filter(
        (v: any) => yStore.UserMap[v.CUID].Name == SearchValue.value,
      )
      break
    case 3:
      Rank.value = Rank.value.filter(
        (v) => yStore.UserMap[v.CUID].Name == SearchValue.value,
      )
  }
}
function begin_time() {
  timer = setInterval(async () => {
    if (Time.value % 60 == 0) {
      let rs = await TrainsApi.studyByTrainID(TrainID, { UnitID, PostID })
      Reslut.value.Mine.LastTLID = rs.TLID
    }
    Time.value++
  }, 1000)
}
function clear_time() {
  clearInterval(timer)
}
function submit() {
  if (Reslut.value.PaperID && Time.value >= MinReadTime.value) {
    console.log('开始答题')
  } else {
    if (Time.value >= MinReadTime.value) {
      ShowSign.value = true
      clear_time()
    }
  }
}

async function success(URL: string) {
  let rs = await wait(TrainsApi.signByTrainID(TrainID, {
    Sign: URL,
    TLID: Reslut.value.Mine.LastTLID,
  }))

}

function cancel() {
  console.log('取消签字')
}
onMounted(async () => {
  Reslut.value = await wait(TrainsApi.getByTrainID(TrainID, UID))
  MinReadTime.value = Reslut.value.Min
  let UIDs = [
    Reslut.value.UUID,
    Reslut.value.CUID,
    Reslut.value.LUID,
    Reslut.value.Mine.UID,
  ]
  UIDs = [...new Set(UIDs)]
  UIDs.map((v) => yStore.getUserInfo(v))
  if (Reslut.value.Mine.LastState == 1) {
    Time.value = 0
    begin_time()
  } else if (Reslut.value.Mine.LastState == 0) {
    Time.value = Reslut.value.Mine.LastSecends
    begin_time()
  } else {
    Time.value = Reslut.value.Mine.LastSecends
    Dialog({
      message: '您有未签字的培训，请签字！',
    })
      .then(() => {
        submit()
      })
      .catch(() => {
        submit()
      })
  }

  Rank.value = []
  Logs.value = []
})
</script>
<style scoped lang="less">
.blue {
  color: #1b6ffe;
}

/deep/.van-search {
  width: 100%;
  padding: 0;

  .van-field__control {
    color: #64a4fe;
  }

  .van-field__left-icon {
    color: #64a4fe;
  }

  .van-search__action {
    background: #eff4fc;
    color: #64a4fe;
  }

  .van-search__content {
    background: #eff4fc;
  }
}

.empty {
  width: 100%;
  height: 50px;
}
</style>
