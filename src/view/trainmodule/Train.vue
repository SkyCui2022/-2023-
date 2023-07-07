<template>
  <template v-if="Readonly">
    <van-sticky>
      <van-row class="backblue">
        <van-col span="22" offset="1">
          <van-row
            align="center"
            justify="space-between"
            class="margin_15_0 white"
          >
            <van-col @click="router.go(-1)" span="16" class="left">
              <van-icon size="16px" name="arrow-left" />&nbsp;&nbsp;
              <span class="font20">{{ Result.Name }}</span>
            </van-col>
            <van-col
              ><van-icon size="12px" name="location" />

              {{ yStore.Enter?.Simple || yStore.Enter?.Name }}</van-col
            >
          </van-row>
        </van-col>
      </van-row>
    </van-sticky>
    <van-row>
      <Content :Type="Result.CType" :Content="Result.Content"></Content>
    </van-row>
    <van-row class="height50">
      <van-col span="24"></van-col>
    </van-row>
    <van-row class="height50 block gray fixed_bottom">
      <van-col span="24" class="font18 blue"> 请到后台创建培训 </van-col>
    </van-row>
  </template>
  <template v-else>
    <van-sticky>
      <van-row class="bc1b6fff">
        <van-row class="block margin_20_0">
          <van-col span="22" offset="1">
            <van-row align="center" justify="space-between">
              <van-col class="white"
                ><van-icon
                  size="18px"
                  @click="go_back"
                  name="arrow-left"
                />&nbsp;<span class="font20">{{
                  Result.Name.length > 10
                    ? `${Result.Name.substring(0, 10)}...`
                    : Result.Name
                }}</span></van-col
              >
              <van-col class="white_small"
                ><van-icon size="12px" name="location" />&nbsp;
                <span class="font13">{{
                  yStore.Enter.Simple || yStore.Enter.Name
                }}</span></van-col
              >
            </van-row>
          </van-col>
        </van-row>
        <van-row class="block hidden" align="center" justify="space-around">
          <van-col>
            <van-col class="white">
              <span class="font23">{{ Result.User.Times }}</span>
              次
            </van-col>
            <van-col class="white_small margin4_top"
              >我的{{ Result.PaperID ? "答题" : "培训" }}</van-col
            >
          </van-col>
          <van-col>
            <van-col class="white">
              <span class="font23">
                {{ Math.ceil(Result.User.Seconds / 60) }}
              </span>
              分钟
            </van-col>
            <van-col class="white_small margin4_top">累计学习时长</van-col>
          </van-col>
          <van-col>
            <van-col class="white">
              <span class="font23">{{ AvgScore > 0 ? AvgScore : 0 }}</span>
              %
            </van-col>
            <van-col class="white_small margin4_top">正确率</van-col>
          </van-col>
        </van-row>
        <van-row align="center" justify="center" class="block margin15_top">
          <van-col class="back_white border_blue radius50 round71 flex_column">
            <van-row
              :class="`blue font_bold ${Time > 3600 ? 'font16' : 'font20'}`"
            >
              {{ LearnTime }}
            </van-row>
            <van-row class="blue_small font13"> 学习时长 </van-row>
          </van-col>
          <van-col offset="1" class="blue_small font14">
            {{ yStore.User.Name }}
          </van-col>
          <van-col offset="1" class="blue_small font14">
            最佳成绩：{{ Result.User.Max }}分
          </van-col>
          <van-col
            v-if="Active != 4"
            offset="2"
            class="blue_small more back_blue_small radius12 padding_4_8"
            @click="to_more"
          >
            更多
            <van-icon color="#fff" name="arrow" />
          </van-col>

          <van-row></van-row>
        </van-row>
      </van-row>
    </van-sticky>
    <van-row
      v-if:show="ShowTab"
      class="pt10 pb5 backWhite"
      justify="space-around"
    >
      <template v-for="(v, k) in Tabs" :key="k">
        <Tab
          :ModelValue="v"
          :Active="Active"
          @change_active="change_active"
        ></Tab>
      </template>
    </van-row>
    <!-- 培训内容 -->
    <van-row v-if="Active == 0">
      <van-col span="22" offset="1">
        <Content :Type="Result.CType" :Content="Result.Content"></Content>
      </van-col>
      <van-row :class="MinReadTime ? 'red block height50' : 'empty'">
        <van-col span="24">
          {{
            MinReadTime > 0
              ? `单次学习时长达${Math.ceil(MinReadTime / 60)}分钟才能签字提交`
              : ""
          }}
        </van-col>
      </van-row>
      <van-row class="empty"></van-row>
      <van-row class="gray fixed_bottom">
        <van-col
          span="24"
          @click="
            () => {
              if (Time >= Result.Min) {
                submit();
              }
            }
          "
          :class="
            Result.Min >= Time ? 'disable height50' : 'undisable height50'
          "
        >
          <i
            :class="`iconfont icon-${Result.PaperID ? 'shijuan' : 'bianji'}`"
          ></i>
          {{ Result.PaperID ? "开始答题" : "签字提交" }}
        </van-col>
      </van-row>
    </van-row>
    <!-- 培训统计 -->
    <van-row v-if="Active == 1">
      <van-col span="22" offset="1">
        <van-row justify="center" class="block">
          <van-col span="24">
            <van-divider class="font14">学习情况</van-divider>
          </van-col>
        </van-row>
        <van-row>
          <van-col class="rate">
            <div class="absolute">
              <span class="green">
                <span class="font32">{{ TAvgScore > 0 ? TAvgScore : 0 }}</span>
                %
              </span>
              <br />
              <span class="avg">平均正确率</span>
            </div>
          </van-col>
        </van-row>
        <van-row
          class="block margintop35"
          align="center"
          justify="space-around"
        >
          <van-col>
            <van-row>
              <van-col span="24"
                ><strong class="font20">{{
                  Result.Log.length
                }}</strong></van-col
              >
            </van-row>
            <van-row class="block">
              <van-col class="font13" span="24">参训人数</van-col>
            </van-row>
          </van-col>
          <van-col>
            <van-row class="block">
              <van-col span="24">
                <strong class="font20">{{ Average > 0 ? Average : 0 }}</strong>
              </van-col>
            </van-row>
            <van-row>
              <van-col class="font13" span="24">平均分</van-col>
            </van-row>
          </van-col>
          <van-col>
            <van-row class="block">
              <van-col span="24">
                <strong class="font20">{{ Max > 0 ? Max : 0 }}</strong>
              </van-col>
            </van-row>
            <van-row>
              <van-col class="font13" span="24">最高分</van-col>
            </van-row>
          </van-col>
        </van-row>
        <van-row class="margin_30_0">
          <van-col span="24">
            <van-divider class="font14">学习时长</van-divider>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="24" class="font13">
            累计学习时长&nbsp; <span class="blue">{{ TSeconds }}</span>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
    <!-- 培训记录 -->
    <van-row v-if="Active == 2">
      <van-col span="22" offset="1" v-if:show="ShowTab">
        <van-search
          v-model="SearchValue"
          placeholder="搜索人员名称"
          left-icon="search"
          show-action
          :clearable="false"
          @update:model-value="change"
        >
          <template #action>
            <div @click="onClickButton">筛选</div>
          </template>
        </van-search>
      </van-col>
      <template v-if="Logs.length > 0">
        <template v-for="(v, k) in Logs" :key="k">
          <LogCard
            :ModelValue="v"
            :Name="yStore.UserMap[v.UID]?.Name"
            :Avatar="yStore.UserMap[v.UID]?.Avatar"
            :Sex="yStore.UserMap[v.UID]?.Sex"
            :PaperID="Result.PaperID"
          ></LogCard>
        </template>
      </template>
      <template v-else>
        <van-row class="block">
          <van-col span="24">
            <van-empty>暂无数据</van-empty>
          </van-col>
        </van-row>
      </template>
    </van-row>
    <!-- 排行榜 -->
    <van-row v-if="Active == 3">
      <van-col offset="1" span="22" v-if:show="ShowTab">
        <van-search
          v-model="SearchValue"
          placeholder="搜索人员名称"
          left-icon="search"
          show-action
          :clearable="false"
          @update:model-value="change"
        >
          <template #action>
            <div @click="onClickButton">筛选</div>
          </template>
        </van-search>
      </van-col>
      <van-row class="block pt10 pb10 mt15 bcfaf6e6">
        <van-col offset="1" span="2">排名</van-col>
        <van-col offset="1" span="4">人员</van-col>
        <van-col span="11">部门-岗位</van-col>
        <van-col span="5">最高得分</van-col>
      </van-row>
      <template v-if="Rank.length > 0">
        <template v-for="(v, k) in Rank" :key="k">
          <van-row
            :class="
              k === 0
                ? 'orange_small block margin_10_0'
                : k === 1
                ? 'blue_small block margin_10_0'
                : k === 2
                ? 'black_small block margin_10_0'
                : 'block margin_10_0'
            "
          >
            <van-col offset="1" span="2">
              <van-image
                v-if="k == 0"
                width="16px"
                src="https://f.tansuyun.cn/api/yan/2023-05-25/成绩_排名1.svg"
              ></van-image>
              <van-image
                v-else-if="k == 1"
                width="16px"
                src="https://f.tansuyun.cn/api/yan/2023-05-25/成绩_排名2.svg"
              ></van-image>
              <van-image
                v-else-if="k == 2"
                width="16px"
                src="https://f.tansuyun.cn/api/yan/2023-05-25/成绩_排名3.svg"
              ></van-image>
              <span v-else>{{ k + 1 }}</span>
            </van-col>
            <van-col offset="1" span="4">
              {{ v.Name ? v.Name : "暂无数据" }}
            </van-col>
            <van-col span="11"
              >{{ yStore.OrgMap[v.PostID]?.Name
              }}{{ v.PostID && v.UnitID ? "-" : ""
              }}{{ yStore.OrgMap[v.UnitID]?.Name }}</van-col
            >
            <van-col span="5">{{ v.Max }}</van-col>
          </van-row>
        </template>
      </template>
      <template v-else>
        <van-empty class="block">未绑定试卷</van-empty>
      </template>
      <van-row class="empty"></van-row>
    </van-row>
    <!-- 更多 -->
    <van-row v-if="Active == 4" class="padding30_top">
      <template v-if="Logs.length > 0">
        <template v-for="(v, k) in Logs" :key="k">
          <LogCard
            :ModelValue="v"
            :Name="yStore.UserMap[v.UID]?.Name"
            :Avatar="yStore.UserMap[v.UID]?.Avatar"
            :Sex="yStore.UserMap[v.UID]?.Sex"
          ></LogCard>
        </template>
      </template>
      <template v-else>
        <van-row class="block">
          <van-col span="24">
            <van-empty>暂无数据</van-empty>
          </van-col>
        </van-row>
      </template>
      <!-- <van-row class="fixed_bottom gray">
        <van-col span="24" @click="down" class="undisable height50">
          <i class="iconfont icon-xiazai"></i>
          下载记录
        </van-col>
      </van-row> -->
    </van-row>
    <Sign
      :modelValue="ShowSign"
      :Name="Result.User.Name"
      @success="success"
      @cancel="cancel"
    ></Sign>
  </template>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { TrainsApi, EntityReadTrainRes } from "@yakj/sdk/sdk/sdk";
import { EnumTrainContentType } from "@yakj/sdk/sdk/enum";
import Tab from "../component/Tab.vue";
import { store, timeout } from "@ctsy/common";
import { showConfirmDialog, showLoadingToast } from "vant";
import router from "../router";
import Content from "../component/Content.vue";
import Sign from "../component/Sign.vue";
import LogCard from "../component/LogCard.vue";
import { wait } from "../api/lib";
import { useRoute } from "vue-router";
// import useStore from "../hooks/BaseData";
import { useStore } from "../store";
import { cState } from "../hooks/store";

const yStore = useStore();
const route = useRoute();
/**
 * 请求结果
 */
const Result = ref(new EntityReadTrainRes());
/**
 * 个人培训记录
 */
const Logs: any = ref([]);
/**
 * 排行榜
 */
const Rank: any = ref([]);
/**
 * 最小学习时长
 */
const MinReadTime = ref(0);
const SearchValue = ref("");
/**
 * 学习时长
 */
const Time = ref(0);
const LearnTime = computed(() => {
  let s: number | string = 0,
    m: number | string = 0,
    h: number | string = 0;
  s = Time.value % 60;
  if (Math.floor(Time.value / 60) <= 60) {
    m = Math.floor(Time.value / 60);
  } else {
    let min = Math.floor(Time.value / 60);
    h = Math.floor(min / 60);
    m = min % 60;
  }
  s = s < 10 ? `0${s}` : `${s}`;
  m = m < 10 ? `0${m}` : `${m}`;
  h = h < 10 ? `0${h}` : `${h}`;
  return Time.value > 3600 ? `${h}:${m}:${s}` : `${m}:${s}`;
});
const ShowSign = ref(false);
const ShowTab = ref(true);
const Active = ref(0);
const uprefix = "https://f.tansuyun.cn/api/yan/2023-02-01/";
const Tabs = ref([
  {
    URL: uprefix + "checklog.svg",
    Text: "培训内容",
    Icon: "yan5-anquanpeixuntubiao_peixunneirong",
    Active: 0,
  },
  {
    URL: uprefix + "checklog.svg",
    Text: "培训统计",
    Icon: "yan5-anquanpeixuntubiao_peixuntongji",
    Active: 1,
  },
  {
    URL: uprefix + "checklog.svg",
    Text: "培训记录",
    Icon: "yan5-anquanpeixuntubiao_peixunjilu",
    Active: 2,
  },
  {
    URL: uprefix + "checklog.svg",
    Text: "排行榜",
    Icon: "yan5-anquanpeixuntubiao_paihangbang",
    Active: 3,
  },
]);

/**
 * 返回
 */
function go_back() {
  if (Active.value == 4) {
    ShowTab.value = !ShowTab.value;
    Active.value = store.get("active");
  } else {
    !JustSee.value
      ? showConfirmDialog({
          message: "有未提交学习内容是否退出？",
        })
          .then(() => {
            router.go(-1);
          })
          .catch(() => {})
      : router.go(-1);
  }
}
/**
 *
 * @param n 切换Tab
 *
 */
async function change_active(n: number) {
  Active.value = n;
  SearchValue.value = "";
  switch (n) {
    case 2:
      Logs.value = Result.value.Log;
      break;
    case 3:
      Rank.value = Result.value.Log.sort((a, b) => {
        return a.Max - b.Max;
      });
      break;
  }
}

/**
 * 查看更多学习记录
 */
async function to_more() {
  store.set("active", Active.value);
  ShowTab.value = !ShowTab.value;
  Active.value = 4;
  Logs.value = Result.value.ULog;
}
function down() {
  showLoadingToast({
    message: "模板正在准备\n客官请稍后！",
  });
}

/**
 * 筛选
 */
function onClickButton() {
  switch (Active.value) {
    case 2:
      Logs.value = Logs.value.filter((v: any) =>
        yStore.UserMap[v.CUID].Name.includes(SearchValue.value)
      );
      break;
    case 3:
      Rank.value = Rank.value.filter((v: any) =>
        yStore.UserMap[v.CUID].Name.includes(SearchValue.value)
      );
  }
}
/**
 * 计时开关
 */
const TimeOnOff = ref(false);
/**
 * 记录学习时长
 */
async function study() {
  let rs = await TrainsApi.studyByTrainID(
    TrainID,
    yStore.User.UnitID,
    yStore.User.PostID
  );
  Result.value.User.LastTLID = rs.TLID;
}
/**
 * 开始计时
 */
async function begin_time() {
  await study();
  let n = 0;
  while (TimeOnOff.value) {
    await timeout(1000);
    Time.value++;
    n++;
    if (n % 10 == 0) {
      await study();
    }
  }
}

function submit() {
  if (Result.value.PaperID && Time.value >= Result.value.Min) {
    location.href = location.href.includes("wechat.tansuyun.cn")
      ? `https://wechat.tansuyun.cn/y5/answer/#/Paper/${EID}/${Result.value.PaperID}?trainID=${Result.value.TrainID}`
      : `http://192.168.31.132:5174/#/Paper/${EID}/${Result.value.PaperID}?trainID=${Result.value.TrainID}`;
  } else {
    if (Time.value >= MinReadTime.value) {
      ShowSign.value = true;
    }
  }
}

async function success(URL: string) {
  let rs = await wait(
    TrainsApi.signByTrainID(TrainID, URL, Result.value.User.LastTLID)
  );
  await search();
  ShowSign.value = !ShowSign.value;
  TimeOnOff.value = false;
  router.push(`/train/list/${EID}`);
}

function cancel() {
  ShowSign.value = !ShowSign.value;
}

const AvgScore = computed(() => {
  let total = 0;
  Result.value.ULog.forEach(
    (v) => (total += (v.Score / Result.value.Score) * 100)
  );

  return Math.ceil(total / Result.value.ULog.length);
});

const TAvgScore = computed(() => {
  let total = 0;
  Result.value.Log.forEach(
    (v) => (total += (v.Max / Result.value.Score) * 100)
  );
  return Math.ceil(total / Result.value.Log.length);
});

const Max = computed(() => {
  let max = 0;
  let arr: number[] = [];
  Result.value.Log.forEach((v) => {
    arr.push(v.Max);
  });
  max = Math.max(...arr);
  return max;
});

const TSeconds = computed(() => {
  let seconds = 0;
  Result.value.Log.forEach((v) => (seconds += v.Seconds));
  let m = Math.ceil((seconds % 3600) / 60);
  let h = Math.floor(m / 60);

  return `${h}小时${m}分钟`;
});

const Average = computed(() => {
  let total = 0;
  Result.value.Log.forEach((v) => (total += v.Max));
  return Math.round(total / Result.value.Log.length);
});

function change() {
  switch (Active.value) {
    case 2:
      SearchValue.value.length
        ? (Logs.value = Result.value.Log.filter((v) =>
            v.Name.includes(SearchValue.value)
          ))
        : (Logs.value = Result.value.Log);
      break;
    case 3:
      SearchValue.value.length
        ? (Rank.value = Result.value.Log.sort((a, b) => {
            return a.Max - b.Max;
          }).filter((v) => v.Name.includes(SearchValue.value)))
        : (Rank.value = Result.value.Log.sort((a, b) => {
            return a.Max - b.Max;
          }));
      break;
  }
}

async function search() {
  Result.value = await wait(TrainsApi.read(yStore.User.UID, EID, TrainID));
  MinReadTime.value = Result.value.Min;
}
let TrainID = 0;
let EID = 0;
//只读状态
let Readonly = ref(false);
//随便看看
let JustSee = ref(false);

onMounted(async () => {
  TrainID = Number(route.params.TrainID);
  EID = Number(route.params.EID);
  if (route.query.Type == "readonly") {
    Readonly.value = true;
  }
  addEventListener("scroll", () => {
    let hidden = document.querySelector(".hidden");
    let margintop15 = document.querySelector(".margin15_top");
    if (document.documentElement.scrollTop > 100) {
      //@ts-ignore
      hidden.style.display = "none";
      //@ts-ignore
      margintop15.style.marginTop = "0";
    } else {
      //@ts-ignore
      hidden.style.display = "flex";
      //@ts-ignore
      margintop15.style.marginTop = "15px";
    }
  });

  await search();
  Active.value = cState.Active || 0;
  if (!Readonly.value && Active.value == 0) {
    showConfirmDialog({
      cancelButtonText: "随便看看",
      cancelButtonColor: "#007dff",
      confirmButtonText: "开始培训",
      confirmButtonColor: "#32c846",
      message: "是否开始？",
      title: `您正在参加“${Result.value.Name}”的培训`,
    })
      .then(() => {
        if (Result.value.User.LastState == 1) {
          Time.value = 0;
          TimeOnOff.value = true;
          begin_time();
        } else if (Number(Result.value.User.LastState) == 0) {
          Time.value = Result.value.User.LastSeconds;
          TimeOnOff.value = true;
          begin_time();
        } else {
          Time.value = Result.value.User.LastSeconds;
          showConfirmDialog({
            message: "您有未签字的培训，请签字！",
            cancelButtonText: "继续学习",
            cancelButtonColor: "007dff",
            confirmButtonText: `${Result.value.PaperID ? "开始答题" : "签字"}`,
          })
            .then(() => {
              TimeOnOff.value = false;
              submit();
            })
            .catch(() => {
              Time.value = Result.value.User.LastSeconds;
              TimeOnOff.value = true;
              begin_time();
            });
        }

        Rank.value = [];
        Logs.value = [];
      })
      .catch(() => {
        JustSee.value = !JustSee.value;
        console.log("预习");
      });
  }
});
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

.rate {
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  border: 8px solid #32c846ff;
  margin-left: 25%;
  position: relative;

  .absolute {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.green {
  color: #32c846ff;
}

.font32 {
  font-size: 32px;
}

.avg {
  color: #b9b9b9;
  font-size: 15px;
  padding: 10px 0;
}

.margintop35 {
  margin-top: 35px;
}

.margin_30_0 {
  margin: 30px 0;
}
.margin15_top {
  background: linear-gradient(rgb(27, 111, 254) 75%, rgb(255, 255, 255) 75%);
}
.bcfaf6e6 {
  background: #faf6e6;
}
</style>
