<template>
  <van-sticky>
    <van-row class="bg">
      <van-col span="22" offset="1" class="margin10_top left white">
        <i class="yan5 yan5-anquanpeixuntubiao_fanhui font16"></i>
      </van-col>

      <van-col span="22" offset="1" class="position_relative">
        <van-search v-model="Search" placeholder="搜索风险点名称"></van-search>
      </van-col>
    </van-row>
  </van-sticky>
  <van-row class="hbg block">
    <van-col span="24">
      <van-row>
        <van-col span="22" offset="1" class="margin10_top">
          <van-row
            class="block"
            align="center"
            justify="space-between"
            gutter="10"
          >
            <van-col span="6">
              <van-dropdown-menu>
                <van-dropdown-item v-model="Levels" :options="LevelOption" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="6">
              <van-dropdown-menu>
                <van-dropdown-item v-model="Status" :options="StatusOption" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="6">
              <van-dropdown-menu>
                <van-dropdown-item v-model="Menber" :options="MenberOption" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="4" class="font14"
              >筛选<i class="yan5 yan5-anquanpeixuntubiao_shaixuan"></i
            ></van-col>
          </van-row>
        </van-col>
      </van-row>
      <Tree :Lists="List"></Tree>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { RisksApi, EntityRiskTree } from "@yakj/sdk/sdk/sdk";
import { OrgMap, wait } from "../../api/lib";
import { array_tree } from "@ctsy/common";
import { computed } from "@vue/reactivity";
import get_yan_store from "../../store/yan";

const route = useRoute();
const yStore = get_yan_store();
const Height = computed(() => {
  return window.innerHeight - 180 + "px";
});

const Search = ref("");
const Resault = ref([] as EntityRiskTree[]);
const List = computed(() => {
  let rs: EntityRiskTree[] = Resault.value.flat(10);
  Levels.value > 0 ? (rs = rs.filter((v) => v.Level == Levels.value)) : true;
  Status.value > 0
    ? Status.value == 1
      ? (rs = rs.filter((v) => !v.Unfix))
      : Status.value == 2
      ? (rs = rs.filter((v) => v.Unfix))
      : true
    : true;
  Menber.value > 0 ? (rs = rs.filter((v) => v.MUID == Menber.value)) : true;
  return rs;
});

const Levels = ref(0);
const LevelOption = ref([
  { text: "全部等级", value: 0 },
  { text: "一级", value: 1 },
  { text: "二级", value: 2 },
  { text: "三级", value: 3 },
  { text: "四级", value: 4 },
  { text: "五级", value: 5 },
]);
const Status = ref(0);
const StatusOption = ref([
  { text: "整改状态", value: 0 },
  { text: "已整改", value: 1 },
  { text: "未整改", value: 2 },
]);
const Menber = ref(0);
const MenberOption = ref([{ text: "责任人", value: 0 }]);

let EID = 0;
onMounted(async () => {
  let tree = await wait(RisksApi.tree());
  tree.L.forEach(async (v: any) => {
    yStore.getUserInfo(v.MUID);
    if (MenberOption.value.some((z) => z.value == v.MUID)) {
    } else {
      MenberOption.value.push({
        text: yStore.UserMap[v.MUID].Name,
        value: v.MUID,
      });
    }
    if (v.RiskID == 0) {
      OrgMap[v.DID] = v.Name;
    }
  });

  //@ts-ignore
  Resault.value = array_tree(tree.L, {
    pfield: "PDID",
    ufield: "DID",
    sub_name: "children",
  });
  EID = Number(route.params.EID);
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
  top: 50px;
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
