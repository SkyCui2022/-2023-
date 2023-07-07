<template>
  <van-sticky>
    <van-row class="bg">
      <van-col span="22" offset="1">
        <van-row
          align="center"
          justify="space-between"
          class="margin20_top left white"
        >
          <van-col>
            <i class="yan5 yan5-anquanpeixuntubiao_fanhui font16"></i
          ></van-col>
          <van-col>
            <van-icon name="location-o" />{{
              yStore.Enter?.Simple || yStore.Enter?.Name
            }}</van-col
          >
        </van-row>
        <van-row>
          <van-col span="24" class="position_relative">
            <SearchVue
              :KeyWord="KeyWord"
              Background="#ffffff"
              BorderRadius="8px"
              @keywordChange="(s) => (KeyWord = s)"
            ></SearchVue>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </van-sticky>
  <van-row class="hbg block">
    <van-col span="24">
      <van-row class="bcffffff">
        <van-col span="22" offset="1">
          <van-row
            class="block"
            align="center"
            justify="space-between"
            gutter="10"
          >
            <van-col span="6">
              <ConditionSelect
                :ModelValue="LevelData"
                @select="select"
              ></ConditionSelect>
            </van-col>
            <van-col span="6">
              <ConditionSelect
                :ModelValue="StatusData"
                @select="select"
              ></ConditionSelect>
            </van-col>
            <van-col span="6">
              <ConditionSelect
                :ModelValue="MemberData"
                @select="select"
              ></ConditionSelect>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <Tree :Lists="List"></Tree>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { RisksApi, EntityRiskTree } from "@yakj/sdk/sdk/sdk";
import { wait, cCondition, iCondition } from "../../api/lib";
import { array_tree, timeout } from "@ctsy/common";
import { useStore } from "../../store";
import Tree from "/src/component/Tree.vue";
import { cloneDeep } from "lodash";
import SearchVue from "../../component/Search.vue";
import ConditionSelect from "../../component/ConditionSelect.vue";

const route = useRoute();
const yStore = useStore();
const Height = computed(() => {
  return window.innerHeight - 180 + "px";
});

const KeyWord = ref("");
const Result = ref<EntityRiskTree[]>([]);
const List = computed(() => {
  let rs: EntityRiskTree[] | any = Result.value;
  if (LevelData.value.Value > 0) {
    rs = Result.value.filter((v) => LevelData.value.Value.includes(v.Level));
  }
  if (MemberData.value.Value > 0) {
    rs = Result.value.filter((v) => MemberData.value.Value.includes(v.MUID));
  }
  if (KeyWord.value.length > 0) {
    rs = Result.value.filter((v) => v.Name.includes(KeyWord.value));
  }
  StatusData.value.Value > 0
    ? StatusData.value.Value == 1
      ? (rs = Result.value.filter((v) => !v.Unfix))
      : StatusData.value.Value == 2
      ? (rs = Result.value.filter((v) => v.Unfix))
      : true
    : true;
  rs = array_tree(rs, {
    pfield: "PDID",
    ufield: "DID",
    sub_name: "children",
  });
  return rs;
});

const LevelData = ref<iCondition>({
  Name: "全部等级",
  Key: "level",
  Value: 0,
  List: [
    { Name: "一级", Value: 1 },
    { Name: "二级", Value: 2 },
    { Name: "三级", Value: 3 },
    { Name: "四级", Value: 4 },
    { Name: "五级", Value: 5 },
  ],
});
const StatusData = ref<iCondition>({
  Name: "整改状态",
  Key: "status",
  Value: 0,
  List: [
    { Name: "已整改", Value: 1 },
    { Name: "未整改", Value: 2 },
  ],
});
const MenberOption = computed(() => {
  let rs = [];
  rs.push(
    ...Object.values(yStore.UserMap).map((z) => {
      return {
        Name: z.Name,
        Value: z.UID,
      };
    })
  );
  return rs;
});
const MemberData = ref<iCondition>({
  Name: "责任人",
  Key: "status",
  Value: 0,
  List: MenberOption.value,
});

function select(d: any) {
  let name: string[] = [];
  let rs: any[] = [];
  switch (d.Key) {
    case "level":
      LevelData.value.Value = d.Value;
      if (d.Value.length) {
        name = [];
        rs = LevelData.value.List.filter((v) =>
          d.Value.includes(v.Value)
        ).forEach((v) => name.push(v.Name));
        LevelData.value.Name = name.join(",");
      }
      console.log(LevelData.value.Value);
      break;
    case "member":
      MemberData.value.Value = d.Value;
      if (d.Value.length) {
        name = [];
        rs = MemberData.value.List.filter((v) =>
          d.Value.includes(v.Value)
        ).forEach((v) => name.push(v.Name));
        MemberData.value.Name = name.join(",");
      }
      break;
    case "status":
      StatusData.value.Value = d.Value;
      if (d.Value.length) {
        name = [];
        rs = StatusData.value.List.filter((v) =>
          d.Value.includes(v.Value)
        ).forEach((v) => name.push(v.Name));
        StatusData.value.Name = name.join(",");
      }
      break;
  }
}

async function search() {
  Result.value = (await wait(RisksApi.tree(EID.value))).L;
  Result.value.map(async (v: any) => {
    if (v.MUID > 0) {
      yStore.getAccount(v.MUID);
    }
    v.RiskID && !v.PDID ? (v.PDID = -1) : true;
  });
  Result.value.push(
    Object.assign(new EntityRiskTree(), {
      Name: "未分组",
      DID: -1,
    })
  );
}

const EID = ref(0);
onMounted(async () => {
  EID.value = Number(route.params.EID);
  search();
});
</script>
<style scoped lang="less">
.bg {
  width: 100%;
  height: 180px;
  background-image: url("https://f.tansuyun.cn/api/yan/2023-03-29/风险点顶图.jpg");
  background-size: 100% 100%;
}

.hbg {
  min-height: v-bind(Height);
  background-color: #f7f9fc;
}

.card {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 0px 3px rgba(116, 126, 167, 0.2);

  .radius {
    border-radius: 6px;
  }
}

.position_relative {
  position: relative;
  top: 100px;
}

.van-search {
  padding: 0;
  border-radius: 10px;

  /deep/.van-search__content {
    background: #fff;
    border-radius: 10px;
  }
}

/deep/.van-dropdown-menu__bar {
  border-radius: 50px;
  background: #fff;
  height: 33px;
}
</style>
