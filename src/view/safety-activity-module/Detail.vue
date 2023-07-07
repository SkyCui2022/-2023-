<template>
  <van-row class="block backblueb">
    <van-col :span="22" offset="1">
      <GoBack :Name="`${Type}详情`"></GoBack>
    </van-col>
  </van-row>
  <van-row class="block">
    <van-col :span="24">
      <van-cell-group>
        <van-cell
          title-class="left font15"
          title="会议主题"
          :value="Result.Name"
        />
        <van-cell
          title-class="left font15"
          title="会议地点"
          :value="Result.Addr"
        />
        <van-cell
          title-class="left font15"
          title="开始时间"
          :value="timeFormat(Result.STime, DateFMT.YMDHm)"
        />
        <van-cell
          title-class="left font15"
          title="结束时间"
          :value="timeFormat(Result.ETime, DateFMT.YMDHm)"
        />
        <van-cell
          title-class="left font15"
          title="主持人"
          :value="Result.Teacher"
        />
        <van-cell
          title-class="left font15"
          title="参与部门/岗位"
          :value="OrgIDs"
        />
      </van-cell-group>
    </van-col>
  </van-row>
  <van-row class="block line_gray"> </van-row>
  <van-row class="block margin20_top">
    <van-col span="22" offset="1">
      <van-row align="center" justify="space-between">
        <van-col class="font18 blue">会议详情</van-col>
        <van-col @click="ShowDetail = !ShowDetail">
          <i
            :class="`grey yan5 ${
              ShowDetail
                ? 'yan5-anquanpeixuntubiao_xiala-copy'
                : 'yan5-anquanpeixuntubiao_jinru1'
            }`"
          ></i>
        </van-col>
      </van-row>
      <van-row v-if:show="ShowDetail" class="margin10_top">
        <van-col v-html="Result.Content"></van-col>
        <van-col span="24">
          <template v-for="(v, k) in Result.URLs" :key="k">
            <van-image
              @click="showImagePreview(Result.URLs, k)"
              :src="v"
              width="100%"
              height="200"
            ></van-image>
          </template>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="block margin20_top">
    <van-col span="22" offset="1">
      <van-row align="center" justify="space-between">
        <van-col class="font18 blue">会议纪要</van-col>
        <van-col @click="edit" placeholder="请输入会议纪要" class="blue">
          <i class="yan5 yan5-bianji1"></i><span class="font13">编辑</span>
        </van-col>
      </van-row>
      <van-row class="block">
        <van-col span="24" class="left">
          {{ Result.Summary }}
        </van-col>
        <van-col span="24">
          <template v-for="(v, k) in Result.SummaryURLs" :key="k">
            <van-image
              @click="showImagePreview(Result.SummaryURLs, k)"
              :src="v"
              width="50%"
              height="150"
            ></van-image>
          </template>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="block backblueb margin20_top">
    <van-col span="22" offset="1">
      <van-row align="center" justify="space-between">
        <van-col class="white font18"
          >签到人员&nbsp;{{ Result.Signs.length }}人</van-col
        >
        <van-col span="10">
          <van-search placeholder="搜索姓名" v-model="Keyword"></van-search>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="block">
    <van-col span="22" offset="1">
      <van-row align="center" justify="space-between">
        <van-col>
          <van-dropdown-menu @change="changeTime">
            <van-dropdown-item v-model="SignTime" :options="SignTimeOption" />
          </van-dropdown-menu>
        </van-col>
        <van-col>
          <van-dropdown-menu @change="changePost">
            <van-dropdown-item v-model="SignPost" :options="SignPostOption" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="5" class="font15" @click="sort">
          {{ Study.length }}人
          <span class="position_relative">
            <i
              :class="`position_absolute font12 yan5 yan5-anquanhuodong_paixu-shang ${
                DECS ? 'blue' : ''
              } `"
            ></i
            ><i
              :class="`position_absolute yan5 yan5-anquanhuodong_paixu-xia font12 ${
                DECS ? '' : 'blue'
              }`"
            ></i>
          </span>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="block">
    <van-col span="22" offset="1">
      <van-row align="center" justify="space-between">
        <template v-for="(v, k) in Study" :key="k">
          <van-col class="card font13" @click="seeSign(k)">
            {{
              yStore.UserMap[v.UID]?.Name.length > 3
                ? yStore.UserMap[v.UID]?.Name.slice(0, 2) + "..."
                : yStore.UserMap[v.UID]?.Name
            }}&nbsp;{{ timeFormat(v.CTime, DateFMT.YMDHm).slice(10) }}
          </van-col>
        </template>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="height50"></van-row>
  <van-row class="height50"></van-row>

  <van-row class="fixed_bottom" align="center" justify="center">
    <van-col @click="ShowQr = true" class="blue font16 font_bold" span="11">
      <i class="yan5 yan5-anquanhuodong_fenxiang"></i> 分享</van-col
    >
    <van-col class="line"></van-col>
    <van-col class="blue font16 font_bold" span="11" @click="showSign">
      <i class="yan5 yan5-anquanpeixuntubiao_qianzi"></i> 签到</van-col
    >
  </van-row>

  <van-popup
    v-model:show="ShowPopup"
    round
    :style="{ height: '70%' }"
    position="bottom"
  >
    <van-row class="block">
      <van-col span="22" offset="1">
        <van-row class="block">
          <van-col span="24">
            <van-field
              v-model="Summary"
              label="会议纪要"
              class="column"
              input-align="left"
              type="textarea"
              placeholder="请输入会议纪要"
            ></van-field>
          </van-col>
        </van-row>
        <van-row class="block relative">
          <template v-for="(v, k) in SummaryURLs" :key="k">
            <van-image
              :src="v"
              @click="showImagePreview(SummaryURLs, k)"
              width="43"
              height="43"
              class="magrin10_left"
            ></van-image>
            <van-icon name="close" @click="SummaryURLs.splice(k, 1)"></van-icon>
          </template>
          <van-col class="magrin10_left" @click="uploadImg">
            <i class="yan5 yan5-anquanhuodong_tianjiazhaopian size43 gray"></i>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
    <van-row class="block height50 position_absolute">
      <van-col span="12"
        ><van-button @click="ShowPopup = !ShowPopup" size="large" type="danger"
          >取消</van-button
        ></van-col
      >
      <van-col span="12"
        ><van-button @click="saveSummary" size="large" type="success"
          >保存</van-button
        ></van-col
      >
    </van-row>
  </van-popup>
  <van-overlay :show="ShowOverlay" @click="ShowOverlay = false">
    <van-row class="whiteback trainsform">
      <van-col span="24" class="left padding10">
        <van-tag color="#eeeeee" size="medium" text-color="#000" round
          >签字人</van-tag
        >&nbsp;&nbsp;<span>{{
          timeFormat(Result.Signs[Select].CTime, DateFMT.YMDHm)
        }}</span>
      </van-col>
      <van-col span="24">
        <van-image
          class="sign-img"
          :src="Result.Signs[Select].Sign"
        ></van-image>
      </van-col>
    </van-row>
  </van-overlay>
  <Sign
    :Name="yStore.User?.Name"
    :modelValue="ShowSign"
    @cancel="ShowSign = !ShowSign"
    @success="success"
  ></Sign>
  <Qr :ShowQr="ShowQr" :Name="Result.Name" @change="ShowQr = false"></Qr>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import GoBack from "../component/GoBack.vue";
import { useRoute } from "vue-router";
import { TrainsApi, EntityGetTrainsRes } from "@yakj/sdk/sdk/sdk";
import { ShowMapTrainPublishType } from "@yakj/sdk/sdk/maps";
import { format_date, DateFMT, timeout } from "@ctsy/common";
import { wait, timeFormat } from "../api/lib";
import { showFailToast, showImagePreview } from "vant";
import Upload from "@ctsy/api-sdk/dist/modules/Upload";
import Sign from "../component/Sign.vue";
import { useStore } from "../store";
import Qr from "../component/Qr.vue";

const yStore = useStore();
const route = useRoute();
const Type = ref("");
const Result = ref(new EntityGetTrainsRes());
const ShowDetail = ref(true); //会议详情展开/收缩，默认展开
const OrgIDs = computed(() => {
  let rs = Result.value.OrgIDs;
  let s: string[] = [];
  rs.forEach((v) => s.push(yStore.OrgMap[v]?.Name));
  return s.join();
});
const Keyword = ref("");
const Study = computed(() => {
  let rs = Result.value.Signs;
  new Date(SignTime.value).getTime()
    ? (rs = rs.filter(
        (v) => new Date(v.CTime).getTime() >= new Date(SignTime.value).getTime()
      ))
    : true;
  SignPost ? rs.filter((v) => v.OrgID == SignPost.value) : true;
  Keyword.value.length
    ? (rs = rs.filter((v) => {
        yStore.UserMap[v.UID]?.Name.includes(Keyword.value);
      }))
    : true;
  return rs;
});

//会议纪要弹窗
const ShowPopup = ref(false);
const uploadImg = async (file: File) => {
  let rs = await wait(Upload.select_upload("active", "image/*"));
  SummaryURLs.value.push(rs.url || rs.URL);
};
const Summary = ref("");
const SummaryURLs = ref([]);
const saveSummary = async () => {
  Result.value.Summary = Summary.value;
  Result.value.SummaryURLs = SummaryURLs.value;
  let rs = await wait(TrainsApi.saveByTrainID(TrainID.value, Result.value));
  ShowPopup.value = !ShowPopup.value;
};
//人员签到筛选
const SignTime = ref("");
const SignTimeOption = ref([{ text: "", value: "" }]);
const SignPost = ref(0);
const SignPostOption = ref([{ text: "部门岗位", value: 0 }]);
const DECS = ref(true);
const changeTime = (v: string) => {
  Result.value.Studys.filter(
    (d) => timeFormat(d.CTime, DateFMT.YMDHm.slice(10)) == v
  );
};
const changePost = (v: number) => {
  Result.value.Studys.filter((d) => d.UnitID == v);
};
const sort = () => {
  DECS.value
    ? Result.value.Studys.sort((a: any, b: any) => {
        return a.CTime - b.CTime;
      })
    : Result.value.Studys.sort((a: any, b: any) => b.CTime - a.CTime);
};

const ShowQr = ref(false);

//查看人员签字详情
const ShowOverlay = ref(false);
const Select = ref(0);
const seeSign = (n: number) => {
  ShowOverlay.value = !ShowOverlay.value;
  Select.value = n;
};
//编辑会议纪要
function edit() {
  yStore.UID == Result.value.CUID
    ? (ShowPopup.value = !ShowPopup.value)
    : showFailToast({ message: "非创建者不允许编辑！", duration: 2000 });
}

//活动签到逻辑
const ShowSign = ref(false);
const showSign = () => {
  if (new Date().getTime() > new Date(Result.value.ETime).getTime()) {
    showFailToast({
      message: "活动已结束",
      duration: 2000,
    });
  } else if (new Date().getTime() < new Date(Result.value.STime).getTime()) {
    showFailToast({
      message: "活动未开始",
      duration: 2000,
    });
  } else {
    ShowSign.value = !ShowSign.value;
  }
};
//签到成功逻辑
const success = async (url: string) => {
  ShowSign.value = !ShowSign.value;
  await wait(TrainsApi.signByTrainID(TrainID.value, url));
  await timeout(200);
  init();
};

function setDate(d: Date | string) {
  return new Date(d).getTime();
}
function getDay(e: Date | string, s: Date | string) {
  let rs = Math.floor((setDate(e) - setDate(s)) / 1000 / 60 / 60 / 24);
  let day = [];
  for (let i = 0; i < rs; i++) {
    day.push(setDate(s) + 1000 * 60 * 60 * 24 * (i + 1));
  }
  day.push(setDate(e), setDate(s));
  day.sort((a, b) => a - b);
  return day;
}

async function init() {
  //@ts-ignore
  Type.value = ShowMapTrainPublishType[PType.value].slice(2);
  let rs: EntityGetTrainsRes =
    (await wait(TrainsApi._get(`Trains/get/${TrainID.value}?Studys=1`))) ||
    new EntityGetTrainsRes();
  await timeout(500);
  rs.Signs.map((item) => yStore.getAccount(item.UID));
  SignTime.value = timeFormat(rs.STime, DateFMT.YMD);
  if (timeFormat(rs.STime, DateFMT.YMD) != timeFormat(rs.ETime, DateFMT.YMD)) {
    let days = getDay(rs.ETime, rs.STime);
    days.forEach((v) =>
      SignTimeOption.value.push({
        text: timeFormat(v, DateFMT.YMD),
        value: timeFormat(v, DateFMT.YMD),
      })
    );
  } else {
    SignTimeOption.value = [
      {
        text: timeFormat(rs.STime, DateFMT.YMD),
        value: timeFormat(rs.STime, DateFMT.YMD),
      },
    ];
  }
  Result.value = rs;
  Result.value.OrgIDs.length
    ? true
    : Result.value.OrgIDs.push(yStore.User.UnitID);
  SignPostOption.value = [{ value: 0, text: "部门岗位" }];
  rs.OrgIDs.forEach((v) => {
    SignPostOption.value.push({ value: v, text: yStore.OrgMap[v]?.Name });
  });
  Summary.value = rs.Summary;
  SummaryURLs.value = rs.SummaryURLs;
}
const TrainID = ref(0);
const PType = ref(0);
const EID = ref(0);
onMounted(async () => {
  TrainID.value = Number(route.params.TrainID);
  PType.value = Number(route.params.PType);
  EID.value = Number(route.params.EID);
  yStore.getAcc();
  await init();
});
</script>
<style scoped lang="less">
.van-search {
  background: #1b6ffe;

  /deep/ .van-search__content {
    border-radius: 33px;

    /deep/.van-icon,
    /deep/.van-field__control {
      color: #1b6ffe;
    }
  }
}

/deep/.van-popup {
  /deep/.van-field__body {
    /deep/.van-cell__value,
    /deep/.van-field__value {
      /deep/.van-field__body {
        border: 1px solid #cccccc;
        border-radius: 4px;
      }
    }
  }
}

.card {
  width: 32%;
  padding: 10px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 3px rgba(116, 126, 167, 0.2);
}

.van-dropdown-menu {
  /deep/.van-dropdown-menu__bar {
    box-shadow: initial;

    .van-ellipsis {
      color: #1b6ffe;
    }
  }
}

.position_absolute {
  position: absolute;
}
</style>
