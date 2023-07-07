<template>
  <van-row>
    <van-col span="24">
      <van-sticky>
        <van-row id="top" class="bg block">
          <van-col span="22" offset="1">
            <van-row
              align="center"
              justify="space-between"
              class="white margin20_top"
            >
              <van-col @click="router.go(-1)"
                ><i class="yan5 yan5-anquanpeixuntubiao_fanhui font16"></i>
                &nbsp;<span class="font20">{{ Detail.Name }}</span></van-col
              >
              <van-col class="font13 white_small">{{
                yStore.Enter?.Simple
              }}</van-col>
            </van-row>
          </van-col>
          <van-col span="22" offset="1">
            <van-row align="center" justify="space-around">
              <van-col>
                <van-row
                  @click="Active = 0"
                  :class="Active == 0 ? 'actived' : 'unactive'"
                  justify="center"
                >
                  <van-col
                    ><i
                      class="yan5 yan5-fengxiandian_jichuziliao size37 backwhite"
                    ></i
                  ></van-col>
                  <van-col span="24" class="margin10_top">风险点资料</van-col>
                </van-row>
              </van-col>
              <van-col>
                <van-row
                  @click="checkDanger"
                  :class="Active == 1 ? 'actived' : 'unactive'"
                  justify="center"
                >
                  <van-col
                    ><i
                      class="yan5 yan5-fengxiandian_anquanjiancha size37 backwhite"
                    ></i
                  ></van-col>
                  <van-col span="24" class="margin10_top">隐患排查</van-col>
                </van-row>
              </van-col>
              <van-col>
                <van-row
                  @click="Active = 2"
                  :class="Active == 2 ? 'actived' : 'unactive'"
                  justify="center"
                >
                  <van-col
                    ><i
                      class="yan5 yan5-fengxiandian_yinhuantaizhang size37 backwhite"
                    ></i
                  ></van-col>
                  <van-col span="24" class="margin10_top">隐患台账</van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-sticky>
      <van-row class="block back_white minheight position_relative height">
        <van-col span="24">
          <template v-if:show="Active == 0">
            <van-row>
              <van-col span="24" class="padding10 backgroundy font15 white"
                >LS辨识结果：{{ ShowMapRiskLevel[Detail.Level] }}</van-col
              >
            </van-row>
            <van-row>
              <van-col span="22" offset="1">
                <Cell Label="事故类型">
                  <template #value>
                    <template v-for="(v, k) in Detail.AccidentDIDs" :key="k">
                      <span>{{ yStore.AccMap[v]?.Name }}</span
                      >&nbsp;
                    </template>
                  </template>
                </Cell>
                <Cell Label="法律依据">
                  <template #value>
                    <template v-for="(v, k) in Detail.LawIDs" :key="k">
                      <van-col class="right font12" span="24">{{ v }}</van-col>
                    </template>
                  </template>
                </Cell>
                <Cell
                  Label="是否为重点管控"
                  :Value="Detail.IsWatch ? '是' : '否'"
                >
                </Cell>
                <Cell Label="使用状态">
                  <template #value>
                    <van-col class="font15 flexcenter">
                      <van-switch
                        v-model="TurnOFFON"
                        size="18px"
                        @click="changeSwitch"
                      />&nbsp;&nbsp;{{ TurnOFFON ? "开" : "关" }}
                    </van-col>
                  </template>
                </Cell>
                <Cell Label="所在分组">
                  <template #value>
                    <template v-for="(v, k) in Detail.OrgIDs" :key="k">
                      <span>{{ yStore.OrgMap[v]?.Name }}</span
                      >&nbsp;
                    </template>
                  </template>
                </Cell>
                <Cell Label="责任人">
                  <template #value>
                    <van-row class="block">
                      <van-col class="right" span="24">{{
                        yStore.UserMap[Detail.MUID]?.Name
                      }}</van-col>
                      <van-col class="right" span="24">{{
                        Detail.MUTel
                      }}</van-col>
                    </van-row>
                  </template>
                </Cell>
                <Cell
                  Label="巡检频次"
                  :Value="`每${Detail.Cycle > 1 ? Detail.Cycle : ''}${
                    ShowMapCycleUnit[Detail.CycleUnit]
                  }${Detail.Freq}次`"
                ></Cell>
                <Cell Label="所在位置" :Value="Detail.Addr || '暂无'"></Cell>
                <Cell
                  Label="经纬度"
                  :Value="Detail.Lng + '，' + Detail.Lat"
                ></Cell>
                <Cell
                  Label="西安坐标"
                  :Value="Detail.XLng + '，' + Detail.XLat"
                ></Cell>
                <Cell Label="隐患推送人">
                  <template #value>
                    <template v-for="(v, k) in Detail.PushUIDs" :key="k">
                      <van-row
                        class="block card"
                        align="center"
                        justify="space-between"
                      >
                        <van-col>
                          <van-row class="block">
                            <van-col>
                              <van-image
                                :src="yStore.UserMap[v]?.Avatar"
                                width="40"
                                height="40"
                              ></van-image>
                            </van-col>
                            <van-col>
                              <van-row>
                                <van-col
                                  >{{ k + 1 }} {{ yStore.UserMap[v]?.Name }}
                                  <i
                                    :class="`yan5 ${
                                      yStore.UserMap[v]?.Sex
                                        ? 'yan5-jianchabiao-_nan-xianxing blue'
                                        : 'yan5-jianchabiao-_nv-xianxing red'
                                    } `"
                                  ></i
                                ></van-col>
                                <van-col
                                  >岗位：{{ Detail.UnitID }}-{{
                                    Detail.PostID
                                  }}</van-col
                                >
                              </van-row>
                            </van-col>
                          </van-row>
                        </van-col>
                        <van-col
                          ><i class="yan5 yan5-anquanpeixuntubiao_jinru1"></i
                        ></van-col>
                      </van-row>
                    </template>
                  </template>
                </Cell>
                <template v-for="(v, k) in CollapseList" :key="k">
                  <Collapse
                    :Title="v.Title"
                    :Text="v.Text"
                    :Imgs="v.Imgs"
                    :Show="ShowList[k]"
                    :Key="k"
                    @show="show"
                  ></Collapse>
                </template>
                <van-row align="center" justify="center" class="margin17">
                  <van-col span="3">
                    <van-image
                      :scr="yStore.UserMap[Detail.LUID]?.Avatar"
                      width="40"
                      height="40"
                    ></van-image>
                  </van-col>
                  <van-col offset="1" span="20">
                    <van-row class="block">
                      <van-col span="24">
                        <van-row align="center" justify="space-between">
                          <van-col>
                            更新人：{{ yStore.UserMap[Detail.UUID]?.Name }}
                          </van-col>
                          <van-col class="fc1b6fff font13"
                            ><i class="yan5 yan5-xiugaishijian"></i>
                            {{
                              timeFormat(Detail.UTime, DateFMT.YMDHm)
                            }}</van-col
                          >
                        </van-row>
                      </van-col>
                      <van-col
                        >岗位：{{ Detail.Unit }}-{{ Detail.Post }}</van-col
                      >
                    </van-row>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
            <template v-if:show="ShowBack">
              <van-row @click="backTop">
                <van-col class="flexd width26">
                  <i
                    class="yan5 yan5-anquanpeixuntubiao_fanhuidingbu font18"
                  ></i
                ></van-col>
              </van-row>
            </template>

            <van-row class="block" @click="ShowQr = !ShowQr">
              <van-col span="24" class="grays share font16 height50">
                <i class="yan5 yan5-anquanhuodong_fenxiang"></i>
                分享
              </van-col>
            </van-row>
          </template>
          <template v-if:show="Active == 1">
            <van-row>
              <van-col span="22" offset="1">
                <van-row>
                  <van-col span="22" offset="1" class="left margin17"
                    >检查表
                    <strong>{{ Detail.CheckIDs?.length }}</strong></van-col
                  >
                </van-row>
                <template v-if="CheckList.length">
                  <template v-for="(v, k) in CheckList" :key="k">
                    <van-row
                      class="card block radius6"
                      @click="toCheckDetail(v.CheckID)"
                    >
                      <van-col span="24">
                        <van-row
                          class="block"
                          align="center"
                          justify="space-between"
                        >
                          <van-col>
                            {{ k + 1 }}.
                            <span class="font14">{{ v.Name }}</span>
                          </van-col>
                          <van-col></van-col>
                        </van-row>
                        <van-row
                          class="block borderline padding_10_0"
                          align="center"
                        >
                          <van-col class="font13"
                            >检查项：{{ v.Items.length }}</van-col
                          >
                          <van-col offset="1" class="font13"
                            >巡检频次：每 {{ Detail.Cycle ? Detail.Cycle : ""
                            }}{{ ShowMapCycleUnit[Detail.CycleUnit] }}
                            {{ Detail.Freq }}次</van-col
                          >
                        </van-row>
                        <van-row
                          align="center"
                          justify="space-between"
                          class="padding_10_0"
                        >
                          <van-col span="14">
                            <van-row align="center">
                              <van-col class="font12"
                                ><i
                                  class="yan5 yan5-zuzhijiagou_zuijinjiancha"
                                ></i>
                                {{
                                  timeFormat(v.LTime, DateFMT.YMDHm)
                                }}</van-col
                              >
                              <van-col offset="1" class="font12"
                                >{{ yStore.UserMap[v.LUID || v.CUID]?.Name }}
                                <i
                                  :class="`yan5 yan5-jianchabiao-${
                                    yStore.UserMap[v.LUID || v.CUID]?.Sex
                                      ? '_nan-xianxing blue'
                                      : '_nv-xianxing red'
                                  }`"
                                ></i
                              ></van-col>
                            </van-row>
                          </van-col>
                          <van-col span="9">
                            <van-row align="center" justify="space-between">
                              <van-col class="font13"
                                >有隐患 {{ v.Error }}</van-col
                              >
                              <van-col class="font13"
                                >已整改 {{ v.Fixed }}</van-col
                              >
                            </van-row>
                          </van-col>
                        </van-row>
                      </van-col>
                    </van-row>
                  </template>
                </template>
                <template v-else>
                  <van-empty>暂未添加检查表</van-empty>
                </template>
              </van-col>
            </van-row>
          </template>
          <template v-if:show="Active == 2">
            <van-row class="block">
              <van-col span="24">
                <van-search
                  class="backblue"
                  v-model="KeyWord"
                  placeholder="隐患关键字"
                ></van-search>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="22" offset="1">
                <van-row
                  class="block margin_15_0"
                  align="center"
                  justify="space-between"
                >
                  <van-col span="5" v-for="(v, k) in StatusList" :key="k">
                    <!-- 全部隐患、未整改、待复核、已整改 -->
                    <Status
                      :Title="v.Title"
                      :Length="v.Length"
                      :Key="k"
                      :Active="DangerActive"
                      :Actived="v.Actived"
                      :UnActived="v.UnActived"
                      @changeActive="DangerActive = k"
                    ></Status>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="22" offset="1">
                <DangerList
                  :Detail="DangerData"
                  @toDetail="toDetail"
                ></DangerList>
              </van-col>
            </van-row>
          </template>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <Qr :ShowQr="ShowQr" @change="ShowQr = !ShowQr" :Name="Detail.Name"></Qr>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store, format_date, DateFMT, delay_cb } from "@ctsy/common";
import {
  CheckApi,
  EntityRisks,
  EntityDanger,
  EntityGetCheckRes,
  EntityDangerSearchReq,
} from "@yakj/sdk/sdk/sdk";
import {
  ShowMapCycleUnit,
  ShowMapRiskLevel,
  ShowMapRiskColor,
} from "@yakj/sdk/sdk/maps";
import { showImagePreview } from "vant";
import { wait, timeFormat } from "../../api/lib";
import { RisksApi } from "@yakj/sdk/sdk/sdk";
import DangerList from "../../component/DangerList.vue";
import Qr from "../../component/Qr.vue";
import { useStore } from "../../store";
import { store as lstore } from "@ctsy/common";
import Status from "../../component/Status.vue";
import Cell from "../../component/Cell.vue";
import Collapse from "../../component/Collapse.vue";

const yStore = useStore();
const router = useRouter();
const route = useRoute();
const Detail = ref(new EntityRisks());
const Active = ref(0);
const DangerActive = ref(0);
const TurnOFFON = ref(false);
const changeSwitch = async (v: any) => {
  TurnOFFON.value ? (Detail.value.Status = 1) : (Detail.value.Status = 0);
  let rs = await wait(
    RisksApi._post(`Risks/save/${Detail.value.RiskID}`, {
      Data: { RiskID: Detail.value.RiskID, Status: Detail.value.Status },
      W: {},
    })
  );
};
const CheckList = ref<EntityGetCheckRes[]>([]);
const Show = ref({
  Danger: false,
  Measure: false,
  Operate: false,
  Guide: false,
  Imgs: false,
  Disposal: false,
  Icon: false,
});

const ShowQr = ref(false);

const MinHeight = computed(() => {
  return `${window.innerHeight - 144}px`;
});

const StatusList = computed(() => {
  return [
    {
      Title: "全部隐患",
      Key: 0,
      Length: RiskDanger.value.length,
      Actived: "smallcard",
      UnActived: "smallcard",
    },
    {
      Title: "未整改",
      Key: 1,
      Length: RiskDanger.value.filter((z) => z.Result == 1).length,
      Actived: "smallcard_orange",
      UnActived: "smallcard",
    },
    {
      Title: "待复核",
      Key: 2,
      Length: RiskDanger.value.filter((z) => z.Result == 2).length,
      Actived: "smallcard_blue ",
      UnActived: "smallcard",
    },
    {
      Title: "已整改",
      Key: 3,
      Length: RiskDanger.value.filter((z) => z.Result == 3).length,
      Actived: "smallcard_green",
      UnActived: "smallcard",
    },
  ];
});

const CollapseList = ref<{ Title: string; Text: string; Imgs?: string[] }[]>(
  []
);
const ShowList = ref<Boolean[]>([]);
function show(n: number) {
  ShowList.value[n] = !ShowList.value[n];
}

const ShowBack = ref(false);
const backTop = () => {
  document.documentElement.scrollTop = 0;
};
const KeyWord = ref("");
watch(
  KeyWord,
  () => {
    delay_cb("changekeyword", 500, () => {
      KeyWord.value.length > 0
        ? RiskDanger.value.filter((v) => v.Name.includes(KeyWord.value))
        : RiskDanger.value;
    });
  },
  { deep: true }
);
const RiskDanger = ref<EntityDanger[]>([]);
let RiskID = Number(route.params.RiskID);
function toCheckDetail(n: number) {
  location.href = `https://wechat.tansuyun.cn/y5/check/#/check/created/${EID.value}/${n}?OType=Risk&&OID=${RiskID}`;
}
/**
 * 隐患台账
 */
function toDetail(n: number) {
  lstore.set("active", Active.value);
  router.push(`/checkdanger/detail/${EID}/${RiskDanger.value[n].CDID}`);
}

/**
 * 隐患排查
 */
function checkDanger() {
  Active.value = 1;
  lstore.set("active", Active.value);
  CheckList.value.length == 1
    ? (location.href = `https://wechat.tansuyun.cn/y5/check/#/check/created/${EID.value}/${CheckList.value[0].CheckID}?OType=Risk&&OID=${RiskID}`)
    : true;
}
const DangerData = computed(() => {
  let rs = RiskDanger.value;
  DangerActive.value
    ? (rs = rs.filter((v) => v.Result == DangerActive.value))
    : true;
  KeyWord.value.length
    ? (rs = rs.filter((v) => v.Name.includes(KeyWord.value)))
    : true;

  return rs;
});

const Color = computed(() => {
  return ShowMapRiskColor[Detail.value.Level];
});
const EID = ref(0);
onMounted(async () => {
  yStore.getAcc();
  EID.value = Number(route.params.EID);
  Detail.value = store.get("riskdetail");
  Active.value = lstore.get("active");
  Detail.value.Status ? (TurnOFFON.value = true) : (TurnOFFON.value = false);
  CollapseList.value = [
    {
      Title: "危险有害因素",
      Text: Detail.value.Dangers[0].Text,
    },
    {
      Title: `${Detail.value.Type ? "安全防范措施" : "管控措施 "}`,
      Text: Detail.value.Measure,
    },
    {
      Title: "作业浓度要求",
      Text: Detail.value.Works[0].Text,
    },
    {
      Title: "应急处置措施",
      Text: Detail.value.Scene,
    },
    {
      Title: "标识标志",
      Text: "",
    },
    {
      Title: "现场照片",
      Text: "",
      Imgs: Detail.value.Imgs,
    },
  ];
  RiskDanger.value = (
    await wait(
      CheckApi.dangerSearch(
        Object.assign(new EntityDangerSearchReq(), {
          W: { OType: "Risk", OID: RiskID },
        })
      )
    )
  ).L;
  CheckList.value = await Promise.all(
    Detail.value?.CheckIDs.map((item) => CheckApi.getByCheckID(item))
  );
  CheckList.value.forEach((v) => yStore.getAccount(v.LUID));
  addEventListener("scroll", () => {
    document.documentElement.scrollTop >= 215
      ? (ShowBack.value = true)
      : (ShowBack.value = false);
  });
});
</script>
<style scoped lang="less">
.bg {
  background: linear-gradient(180deg, #0086ff 0%, #007aff 100%);
  height: 144px;
}
.blue {
  background: transparent;
  box-shadow: none;
}
.minheight {
  min-height: v-bind(MinHeight);
  background: #f7f9fc;
}

.backgroundy {
  background: v-bind(Color);
}

* {
  box-sizing: border-box;
}

.smallcard {
  background: #fff;
}

.backblue {
  background-color: #007aff;
}

/deep/.van-search__content {
  background-color: #238aff;
}

.flexd {
  position: fixed;
  bottom: 60px;
  right: 30px;
  width: 80px;
  font-size: 14px;
  text-align: center;
}
/deep/.van-field__control,
/deep/.van-search__field .van-field__left-icon {
  color: #fff;
}
.share {
  color: #007dff;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 1px rgba(116, 126, 167, 0.2);
}
.width26 {
  width: 26px;
  height: 26px;
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.16);
  line-height: 26px;
}
.grays {
  background-color: #f2f2f2ff;
}
.Actived {
  .smallcard_orange {
    background-color: #fff;
    border: 1px solid;
    border-color: #ff9600ff;
    border-radius: 8px;
    box-shadow: 0px 1px 1px #ff9600ff;
    color: #ff9600ff;
  }
  .smallcard_blue {
    background-color: #fff;
    border: 1px solid;
    border-color: #1b6ffecc;
    border-radius: 8px;
    box-shadow: 0px 1px 1px #1b6ffecc;
    color: #1b6ffecc;
  }
  .smallcard_green {
    background-color: #fff;
    border: 1px solid;
    border-color: #00be96ff;
    border-radius: 8px;
    box-shadow: 0px 1px 1px #00be96ff;
    color: #00be96ff;
  }
}
.blue {
  color: #1b6ffe;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 0px 1px rgba(116, 126, 167, 0.2);
}
</style>
