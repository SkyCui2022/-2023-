<template>
  <van-sticky>
    <van-row class="bg">
      <van-col span="22" offset="1">
        <Title class="mt20 mb20" Title="隐患台账"></Title>
        <Search
          :KeyWord="KeyWord"
          Placeholder="隐患关键字"
          BorderRadius="10px"
          Background="#238affff"
          IconColor="#86befeff"
          @keywordChange="changeKeyword"
          class="marginbottom15"
        ></Search>
      </van-col>
      <van-col span="24">
        <van-row class="pop bcffffff">
          <!-- 筛选条件 -->
          <van-col span="22" offset="1">
            <van-row
              class="block pt12 pb12"
              align="center"
              justify="space-between"
            >
              <van-col>
                <DateSelect @cancel="cancel" @confirm="confirm"></DateSelect>
              </van-col>
              <!-- <van-col>
                <template v-for="(v, k) in ModelValue" :key="k">
                  <ConditionSelect
                    :ModelValue="v"
                    @selectUser="select"
                  ></ConditionSelect>
                </template>
              </van-col> -->
              <van-col
                ><span class="fc666666 font14">筛选</span>
                <i
                  class="ml5 yan5 yan5-anquanpeixuntubiao_shaixuan fc141414 font13"
                ></i
              ></van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </van-sticky>
  <van-row ref="body" class="body">
    <van-col span="22" offset="1">
      <van-row class="block margin_15_0" align="center" justify="space-between">
        <van-col span="5" v-for="(v, k) in StatusList" :key="k">
          <!-- 全部隐患、未整改、待复核、已整改 -->
          <Status
            :Title="v.Title"
            :Length="v.Length"
            :Key="k"
            :Active="Active"
            :Actived="v.Actived"
            :UnActived="v.UnActived"
            @changeActive="Active = k"
          ></Status>
        </van-col>
      </van-row>
      <van-row class="block">
        <van-col class="font13 font_bold margin_10_0"
          >隐患列表 {{ Detail.length }}</van-col
        >
      </van-row>
      <van-list
        v-model:loading="Loadding"
        :finished="Finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <DangerList :Detail="Detail" @toDetail="toDetail"></DangerList>
      </van-list>
    </van-col>
  </van-row>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import {
  CheckApi,
  EntityDanger,
  EntityDangerSearchReq,
  EntityDangerSearchRes,
} from "@yakj/sdk/sdk/sdk";
import { EOType, wait } from "../../api/lib";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store";
import DangerList from "../../component/DangerList.vue";
import { cCondition } from "../../api/lib";
import ConditionSelect from "../../component/ConditionSelect.vue";
import useDate from "../../hooks/Date";
import { cloneDeep } from "lodash";
import Title from "../../component/Title.vue";
import Search from "../../component/Search.vue";
import Status from "../../component/Status.vue";
import DateSelect from "../../component/DateSelect.vue";

const route = useRoute();
const router = useRouter();
const yStore = useStore();
/**
 * 请求结果
 */
const Resault = ref<Array<EntityDanger>>([]);
/**
 * 关键词
 */
const KeyWord = ref("");
/**
 * 隐患列表
 */
const Detail = computed(() => {
  let rs = cloneDeep(Resault.value);
  Active.value == 1
    ? (rs = rs.filter((v) => v.Result == 1))
    : Active.value == 2
    ? (rs = rs.filter((v) => v.Result == 2))
    : Active.value == 3
    ? (rs = rs.filter((v) => v.Result == 3))
    : KeyWord.value.length
    ? (rs = rs.filter((v) => v.Name.includes(KeyWord.value)))
    : true;

  CUID.value.length
    ? (rs = rs.filter((v) => CUID.value.includes(v.CUID)))
    : true;
  OrgID.value.length
    ? (rs = rs.filter((v) => OrgID.value.includes(v.OrgID)))
    : true;
  OType.value.length
    ? (rs = rs.filter((v) => OType.value.includes(v.OType)))
    : true;
  new Date(STime.value).getTime() && new Date(ETime.value).getTime()
    ? (rs = rs.filter(
        (v) =>
          new Date(STime.value).getTime() - 8 * 1000 * 60 * 60 <=
            new Date(v.CTime).getTime() &&
          new Date(ETime.value).getTime() + 16 * 1000 * 60 * 60 - 1000 >=
            new Date(v.CTime).getTime()
      ))
    : true;
  return rs;
});
const StatusList = computed(() => {
  return [
    {
      Title: "全部隐患",
      Key: 0,
      Length: Resault.value.length,
      Actived: "smallcard",
      UnActived: "smallcard",
    },
    {
      Title: "未整改",
      Key: 1,
      Length: Resault.value.filter((z) => z.Result == 1).length,
      Actived: "smallcard_orange",
      UnActived: "orange",
    },
    {
      Title: "待复核",
      Key: 2,
      Length: Resault.value.filter((z) => z.Result == 2).length,
      Actived: "smallcard_blue ",
      UnActived: "blue",
    },
    {
      Title: "已整改",
      Key: 3,
      Length: Resault.value.filter((z) => z.Result == 3).length,
      Actived: "smallcard_green",
      UnActived: "green",
    },
  ];
});

/**
 * 查看隐患详情
 * @param n
 */
function toDetail(n: number) {
  router.push(`/checkdanger/detail/${EID}/${Resault.value[n].CDID}`);
}

/**
 * 隐患状态选择：未整改、待复核、已整改
 */
const Active = ref(0);

/**
 * 日期选择逻辑
 */
const { STime, ETime } = useDate();

function cancel(d: { STime: string | Date; ETime: string | Date }) {
  STime.value = d.STime;
  ETime.value = d.ETime;
}

function confirm(d: { STime: string | Date; ETime: string | Date }) {
  STime.value = d.STime;
  ETime.value = d.ETime;
}
/**
 * 检查人
 */
const CUID = ref<number[]>([]);
/**
 * 部门/岗位
 */
const OrgID = ref<number[]>([]);

/**
 * 来源
 */
const OType = ref("");
/**
 * 弹出层初始化数据
 */
const ModelValue = ref<Array<cCondition>>([
  // {
  //   Name: "来源",
  //   Key: "OType",
  //   Value: 0,
  //   List: [],
  // },
  // {
  //   Name: "检查人",
  //   Key: "CUID",
  //   Value: 0,
  //   List: [],
  // },
  {
    Name: "部门/岗位",
    Key: "OrgID",
    Value: 0,
    List: [],
  },
]);
/**
 * 选择的检查人、部门/岗位、等级逻辑
 * @param d
 */
function select(d: { Key: string; Value: number[] }) {
  switch (d.Key) {
    case "OType":
      //@ts-ignore
      OType.value = d.Value;
      //@ts-ignore
      if (d.Value != 0) {
        let rs = ModelValue.value[0].List.filter((v) =>
          //@ts-ignore
          d.Value.includes(v.Value)
        );
        if (rs.length) {
          let s: string[] = [];
          rs.forEach((v) => s.push(v.Name));
          ModelValue.value[0].Name = s.join();
        }
      } else {
        ModelValue.value[0].Name = "来源";
      }

      break;
    case "CUID":
      CUID.value = d.Value;
      //@ts-ignore
      if (d.Value != 0) {
        let rsc = ModelValue.value[1].List.filter((v) =>
          //@ts-ignore
          d.Value.includes(v.Value)
        );
        if (rsc.length) {
          let s: string[] = [];
          rsc.forEach((v) => s.push(v.Name));
          ModelValue.value[1].Name = s.join();
        }
      } else {
        ModelValue.value[1].Name = "检查人";
      }

      break;
    case "OrgID":
      OrgID.value = d.Value;
      if (d.Value.length != 0) {
        let rso = ModelValue.value[2].List.filter((v) =>
          //@ts-ignore
          d.Value.includes(v.Value)
        );
        if (rso.length) {
          let s: string[] = [];
          rso.forEach((v) => s.push(v.Name));
          ModelValue.value[2].Name = s.join();
        }
      } else {
        ModelValue.value[2].Name = "部门/岗位";
      }
      break;
  }
}

function changeKeyword(s: string) {
  KeyWord.value = s;
}
/**
 * 隐患列表请求条件
 */
const Where = ref(new EntityDangerSearchReq());
/**
 * 列表请求的loadig状态
 */
const Loadding = ref(false);
/**
 * 请求结束的状态
 */
const Finished = ref(false);
/**
 * 隐患列表的总数
 */
const Total = ref(0);
/**
 * 列表请求逻辑
 */
let n = 0;
async function onLoad() {
  n++;
  Where.value.N = 10 * n;
  await search();
  Loadding.value = false;
  if (Resault.value.length >= Total.value) {
    Finished.value = true;
  }
}
/**
 * 隐患数据接口
 */
async function search() {
  let rs: EntityDangerSearchRes = await wait(
    CheckApi.dangerSearch(Where.value)
  );
  Resault.value = rs.L;
  Total.value = rs.T;
  rs.L.map(async (v: EntityDanger) => {
    if (v.CUID > 0) {
      yStore.getAccount(v.CUID);
    }
  });
  let arr = Object.keys(yStore.UserMap);
  arr.forEach((v) => {
    ModelValue.value[1].List.push({
      Value: Number(v),
      Name: yStore.UserMap[Number(v)].Name,
    });
  });
}

const Height = computed(() => {
  let bg = document.querySelector(".bg");
  //@ts-ignore
  return `${window.innerHeight - bg?.clientHeight}px`;
});
let EID = 0;
onMounted(async () => {
  EID = Number(route.params.EID);
  let arr = Object.keys(yStore.OrgMap);
  arr.map((v) => {
    let name = yStore.OrgMap[Number(v)]?.Name;
    if (yStore.OrgMap[Number(v)].Type == 1) {
      let pname = yStore.OrgMap[yStore.OrgMap[Number(v)].POrgID]?.Name;
      name = name + "（隶属：" + pname + ")";
    }
    if (yStore.OrgMap[Number(v)].Type !== 2) {
      ModelValue.value[2].List.push({
        Value: Number(v),
        Name: name,
      });
    }
  });
  ModelValue.value[0].List = [
    {
      Value: "Danger",
      Name: "上报",
    },
    {
      Value: "Check",
      Name: "检查表",
    },
    {
      Value: "Risk",
      Name: "风险点",
    },
    {
      Value: "Post",
      Name: "岗位",
    },
  ];
});
</script>
<style lang="less" scoped>
.Actived {
  > .smallcard {
    background-color: #fff;
    border: 1px solid;
    border-color: #666666;
    border-radius: 8px;
    box-shadow: 0px 1px 1px rgb(0, 0, 0);
    color: #141414;
  }
  > .smallcard_orange {
    background-color: #fff;
    border: 1px solid;
    border-color: #ff9600ff;
    border-radius: 8px;
    box-shadow: 0px 1px 1px #ff9600ff;
    color: #ff9600ff;
  }
  > .smallcard_blue {
    background-color: #fff;
    border: 1px solid;
    border-color: #1b6ffecc;
    border-radius: 8px;
    box-shadow: 0px 1px 1px #1b6ffecc;
    color: #1b6ffecc;
  }
  > .smallcard_green {
    background-color: #fff;
    border: 1px solid;
    border-color: #00be96ff;
    border-radius: 8px;
    box-shadow: 0px 1px 1px #00be96ff;
    color: #00be96ff;
  }
}
.bg {
  background: linear-gradient(180deg, #0086ff 0%, #007aff 100%);
}
.van-search {
  padding: 0;
  background: #238affff;
  border-radius: 6px;
  /deep/.van-search__content {
    background: transparent;
  }
  /deep/.van-search__field .van-field__left-icon,
  /deep/.van-cell__value,
  /deep/.van-field__control {
    color: #86befe;
  }
}
.body {
  background: #f7f9fc;
  height: v-bind(Height);
}
:deep.pop {
  > .margin_15_0 {
    max-width: 33% !important;
    div {
      max-width: 100%;
      .van-button__text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
.pt12 {
  padding-top: 12px;
}
.pb12 {
  padding-bottom: 12px;
}
</style>
