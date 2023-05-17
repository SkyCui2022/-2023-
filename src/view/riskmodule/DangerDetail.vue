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
                yStore.Enter.Simple
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
                  @click="Active = 1"
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
              <van-col span="24" class="padding10 backgroundy font15"
                >LS辨识结果：{{ ShowMapRiskLevel[Detail.Level] }}</van-col
              >
            </van-row>
            <van-row>
              <van-col span="22" offset="1">
                <van-row
                  align="center"
                  gutter="10"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col class="font15">事故类型</van-col>
                  <van-col span="18" class="font15 right">
                    <template v-for="(v, k) in Detail.AccidentDIDs" :key="k">
                      <span>{{ ShowMapAccidents[v] }}</span
                      >&nbsp;
                    </template>
                  </van-col>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col class="font15">法律依据</van-col>
                  <van-col span="18" class="font15">
                    <van-row class="block">
                      <template v-for="(v, k) in Detail.LawIDs" :key="k">
                        <van-col class="right font12" span="24">{{
                          v
                        }}</van-col>
                      </template>
                    </van-row>
                  </van-col>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                  v-if="Detail.Type"
                >
                  <van-col class="font15">是否为重点管控</van-col>
                  <van-col class="font15">{{
                    Detail.IsWatch ? "是" : "否"
                  }}</van-col>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col class="font15">使用状态</van-col>
                  <van-col class="font15 flexcenter">
                    <van-switch
                      v-model="TurnOFFON"
                      size="18px"
                      @click="changeSwitch"
                    />&nbsp;&nbsp;{{ TurnOFFON ? "开" : "关" }}
                  </van-col>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col class="font15">所在分组</van-col>
                  <van-col class="font15">{{ OrgMap[Detail.GDID] }}</van-col>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col class="font15">责任人</van-col>
                  <van-col class="font15">
                    <van-row class="block">
                      <van-col class="right" span="24">{{
                        yStore.UserMap[Detail.MUID]?.Name
                      }}</van-col>
                      <van-col class="right" span="24">{{
                        Detail.MUTel
                      }}</van-col>
                    </van-row>
                  </van-col>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col class="font15">巡检频次</van-col>
                  <van-col class="font15">
                    每{{ Detail.Cycle > 1 ? Detail.Cycle : ""
                    }}{{ ShowMapCycleUnit[Detail.CycleUnit]
                    }}{{ Detail.Freq }}次
                  </van-col>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col class="font15">所在位置</van-col>
                  <van-col class="font15">
                    {{ Detail.Addr || "暂无" }}
                  </van-col>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col class="font15">经纬度</van-col>
                  <van-col class="font15">
                    {{ Detail.Lng + "，" + Detail.Lat }}
                  </van-col>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col class="font15">西安坐标</van-col>
                  <van-col class="font15">
                    {{ Detail.XLng + "，" + Detail.XLat }}
                  </van-col>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col class="font15">隐患推送人</van-col>
                  <van-col class="font15"> </van-col>
                  <van-row class="block">
                    <van-col span="24">
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
                    </van-col>
                  </van-row>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col
                    class="font15 blue font15"
                    @click="Show.Danger = !Show.Danger"
                    >危险有害因素
                    <i
                      :class="`yan5 ${
                        Show.Danger
                          ? 'yan5-anquanpeixuntubiao_xiala-copy'
                          : 'yan5-anquanpeixuntubiao_jinru1'
                      }`"
                    ></i
                  ></van-col>
                  <van-col class="font15"> </van-col>
                  <van-row class="block margin10_top" v-if:show="Show.Danger">
                    <van-col span="24" class="left">
                      <template v-for="(v, k) in Detail.Dangers" :key="k">
                        <span>{{ v.Text }}</span>
                      </template>
                    </van-col>
                  </van-row>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                  v-if="Detail.Type != 1"
                >
                  <van-col
                    class="font15 blue font15"
                    @click="Show.Measure = !Show.Measure"
                    >{{ Detail.Type ? "安全防范措施" : "管控措施 "
                    }}<i
                      :class="`yan5 ${
                        Show.Measure
                          ? 'yan5-anquanpeixuntubiao_xiala-copy'
                          : 'yan5-anquanpeixuntubiao_jinru1'
                      }`"
                    ></i
                  ></van-col>
                  <van-col class="font15"> </van-col>
                  <van-row class="block margin10_top" v-if:show="Show.Measure">
                    <van-col span="24" class="left">
                      <template v-for="(v, k) in Detail.Measures" :key="k">
                        <span>{{ v.Text }}</span>
                      </template>
                    </van-col>
                  </van-row>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                  v-if="Detail.Type"
                >
                  <van-col
                    class="font15 blue font15"
                    @click="Show.Guide = !Show.Guide"
                    >作业浓度要求
                    <i
                      :class="`yan5 ${
                        Show.Guide
                          ? 'yan5-anquanpeixuntubiao_xiala-copy'
                          : 'yan5-anquanpeixuntubiao_jinru1'
                      }`"
                    ></i
                  ></van-col>
                  <van-col class="font15"> </van-col>
                  <van-row class="block margin10_top" v-if:show="Show.Guide">
                    <van-col span="24" class="left">
                      <template v-for="(v, k) in Detail.Works" :key="k">
                        <van-row align="center" justify="space-between">
                          <van-col>{{ v.Name }}</van-col>
                          <van-col>{{ v.Text }}</van-col>
                        </van-row>
                      </template>
                    </van-col>
                  </van-row>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                  v-if="Detail.Type"
                >
                  <van-col
                    class="font15 blue font15"
                    @click="Show.Disposal = !Show.Disposal"
                    >应急处置措施
                    <i
                      :class="`yan5 ${
                        Show.Disposal
                          ? 'yan5-anquanpeixuntubiao_xiala-copy'
                          : 'yan5-anquanpeixuntubiao_jinru1'
                      }`"
                    ></i
                  ></van-col>
                  <van-col class="font15"> </van-col>
                  <van-row class="block margin10_top" v-if:show="Show.Disposal">
                    <van-col span="24" class="left">
                      <template v-for="(v, k) in Detail.Disposals" :key="k">
                        <van-row align="center" justify="space-between">
                          <van-col>{{ v.Name }}</van-col>
                          <van-col>{{ v.Text }}</van-col>
                        </van-row>
                      </template>
                    </van-col>
                  </van-row>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                  v-if="Detail.Type"
                >
                  <van-col
                    class="font15 blue font15"
                    @click="Show.Icon = !Show.Icon"
                    >标识标志
                    <i
                      :class="`yan5 ${
                        Show.Icon
                          ? 'yan5-anquanpeixuntubiao_xiala-copy'
                          : 'yan5-anquanpeixuntubiao_jinru1'
                      }`"
                    ></i
                  ></van-col>
                  <van-col class="font15"> </van-col>
                  <van-row class="block margin10_top" v-if:show="Show.Icon">
                    <van-col span="24" class="left">
                      <template v-for="(v, k) in Detail.IconIDs" :key="k">
                        <van-col>{{ v }}</van-col>
                      </template>
                    </van-col>
                  </van-row>
                </van-row>
                <van-row
                  align="center"
                  justify="space-between"
                  class="padding17 borderline"
                >
                  <van-col
                    class="font15 blue font15"
                    @click="Show.Imgs = !Show.Imgs"
                    >现场照片
                    <i
                      :class="`yan5 ${
                        Show.Imgs
                          ? 'yan5-anquanpeixuntubiao_xiala-copy'
                          : 'yan5-anquanpeixuntubiao_jinru1'
                      }`"
                    ></i
                  ></van-col>
                  <van-col class="font15"> </van-col>
                  <van-row class="block margin10_top" v-if:show="Show.Imgs">
                    <van-col>
                      <template v-for="(v, k) in Detail.Imgs" :key="k">
                        <van-image
                          width="45%"
                          height="150"
                          :src="v"
                          @click="showImagePreview(Detail.Imgs, k)"
                        ></van-image>
                      </template>
                    </van-col>
                  </van-row>
                </van-row>
                <van-row align="center" justify="center" class="margin17">
                  <van-col>
                    <van-image
                      :scr="yStore.UserMap[Detail.LUID]?.Avatar"
                      width="40"
                      height="40"
                    ></van-image>
                  </van-col>
                  <van-col offset="1">
                    <van-row class="block">
                      <van-col span="24">
                        <van-row align="center" justify="space-between">
                          <van-col>
                            更新人：{{ yStore.UserMap[Detail.LUID]?.Name }}
                          </van-col>
                          <van-col class="blue font13"
                            ><i class="yan5 yan5-xiugaishijian"></i>
                            {{
                              format_date(Detail.LTime, DateFMT.YMDHm)
                            }}</van-col
                          >
                        </van-row>
                      </van-col>
                      <van-col
                        >岗位：{{ Detail.UnitID }}-{{ Detail.PostID }}</van-col
                      >
                    </van-row>
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
            <template v-if:show="ShowBack">
              <van-row @click="backTop">
                <van-col class="flexd">
                  <i
                    class="yan5 yan5-anquanpeixuntubiao_fanhuidingbu font18"
                  ></i
                ></van-col>
              </van-row>
            </template>

            <van-row class="block" @click="showQr(Detail.Name)">
              <van-col span="24" class="gray blue font16 height50">
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
                    <van-row class="card block radius6">
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
                                  format_date(v.LTime, DateFMT.YMDHm)
                                }}</van-col
                              >
                              <van-col offset="1" class="font12"
                                >{{ yStore.UserMap[v.LFixUID]?.Name }}
                                <i
                                  class="yan5 yan5-jianchabiao-_nan-xianxing blue"
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
            <CheckDanger :ModelValue="RiskDanger"></CheckDanger>
          </template>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { store, format_date, DateFMT } from "@ctsy/common";
import {
  CheckApi,
  EntityRisks,
  EntityCheckRs,
  EntityDangerSearchReq,
  EntityDanger,
} from "@yakj/sdk/sdk/sdk";
import {
  ShowMapCycleUnit,
  ShowMapRiskColor,
  ShowMapAccidents,
  ShowMapRiskLevel,
} from "@yakj/sdk/sdk/maps";
import { showImagePreview } from "vant";
import get_yan_store from "../../store/yan";
import { wait } from "../../api/lib";
import { RisksApi } from "@yakj/sdk/sdk/sdk";
import { OrgMap } from "../../api/lib";
import CheckDanger from "../troublemodule/HiddenTrouble.vue";
import { showQr } from "../../api/lib";

const yStore = get_yan_store();
const router = useRouter();
const route = useRoute();
const Detail = ref(new EntityRisks());
const Active = ref(0);
const TurnOFFON = ref(false);
const changeSwitch = async (v: any) => {
  TurnOFFON.value ? (Detail.value.Status = 1) : (Detail.value.Status = 0);
  let rs = await wait(RisksApi.saveByRiskID(Detail.value.RiskID, Detail.value));
};
const CheckList = ref<EntityDanger[]>([]);
const Show = ref({
  Danger: false,
  Measure: false,
  Operate: false,
  Guide: false,
  Imgs: false,
  Disposal: false,
  Icon: false,
});

const MinHeight = computed(() => {
  return `${window.innerHeight - 144}px`;
});
const Color = computed(() => {
  return ShowMapRiskColor[Detail.value.Level];
});

const ShowBack = ref(false);
const backTop = () => {
  document.documentElement.scrollTop = 0;
};

const RiskDanger = ref<any[]>([]);
let RiskID = Number(route.params.RiskID);
const RiskDangerMap: { [index: number]: string } = {
  1: "未整改",
  2: "待复核",
  3: "已整改",
};
onMounted(async () => {
  Detail.value = store.get("riskdetail");
  Active.value = Number(route.query.Active);
  Detail.value.Status ? (TurnOFFON.value = true) : (TurnOFFON.value = false);
  await Promise.all(
    Detail.value?.CheckIDs.map((item) => CheckApi.getByCheckID(item))
  );
  RiskDanger.value = (
    await wait(
      CheckApi.dangerSearch(
        Object.assign(new EntityDangerSearchReq(), {
          W: { OType: "Risk", OID: RiskID },
        })
      )
    )
  ).L;
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
  padding: 0 15px 11px 15px;
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
</style>
