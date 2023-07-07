<template>
  <van-row class="block backblueb">
    <van-col span="22" offset="1">
      <GoBack :Name="'活动记录'"></GoBack>
      <van-row align="center" justify="space-between">
        <van-col
          @click="change(1)"
          :class="`${Active == 1 ? 'actived' : 'unactive'}`"
        >
          <i
            :class="`yan5 yan5-anquanhuodong_huiyi size37 backwhite borderradius4 `"
          ></i>
          <van-row class="margin4_top">
            <van-col span="24" class="font13"> 会议 </van-col>
          </van-row>
        </van-col>
        <van-col
          :class="`${Active == 2 ? 'actived' : 'unactive'}`"
          @click="change(2)"
        >
          <i
            :class="`yan5 yan5-anquanhuodong_xianxiapeixun size37 backwhite borderradius4 `"
          ></i>
          <van-row class="margin4_top">
            <van-col span="24" class="font13"> 线下培训 </van-col>
          </van-row>
        </van-col>
        <van-col
          @click="change(3)"
          :class="`${Active == 3 ? 'actived' : 'unactive'}`"
        >
          <i
            :class="`yan5 yan5-anquanhuodong_yanlian size37 backwhite borderradius4 `"
          ></i>
          <van-row class="margin4_top">
            <van-col span="24" class="font13"> 应急演练 </van-col>
          </van-row>
        </van-col>
        <van-col
          @click="change(4)"
          :class="`${Active == 4 ? 'actived' : 'unactive'}`"
        >
          <i
            :class="`yan5 yan5-anquanhuodong_huodong size37 backwhite borderradius4 `"
          ></i>
          <van-row class="margin4_top">
            <van-col span="24" class="font13"> 其他活动 </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="padding_10_0">
        <van-col span="24">
          <van-search
            background="#1b6ffe"
            v-model="SearchValue"
            placeholder="活动关键字"
          >
            <template #right-icon>
              <van-col>
                <i class="yan5 yan5-anquanpeixuntubiao_shaixuan"></i>
                筛选</van-col
              >
            </template>
          </van-search>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="bg">
    <van-col span="22" offset="1">
      <van-row class="font14 margin_10_0">
        {{
          Active == 1
            ? "会议"
            : Active == 2
            ? "培训"
            : Active == 3
            ? "演练"
            : Active == 4
            ? "活动"
            : ""
        }}列表 &nbsp;<span class="font15 font_bold">{{ List.length }}</span>
      </van-row>
      <van-list
        v-model:loading="Loadding"
        :finished="Finished"
        finishedText="没有更多了"
        @load="onLoad"
      >
        <template v-for="(v, k) in List" :key="k">
          <Card
            :Key="k"
            :ModelValue="v"
            :Active="Active"
            @showPropup="showPropup"
          ></Card>
        </template>
      </van-list>
    </van-col>
  </van-row>
  <van-row class="positionbottom block height50 gray">
    <van-col span="24" class="blue flexcenter" @click="create">
      <i class="yan5 yan5-anquanhuodong_chuangjianhuodong size21"></i>
      &nbsp;<span class="font16">创建{{ ActiveMap[Active] }}</span>
    </van-col>
  </van-row>
  <van-popup
    v-model:show="ShowPropup"
    position="bottom"
    round
    :style="{ height: '25%' }"
  >
    <van-row>
      <van-col span="24" class="font16 margin20_top" @click="seeDetail"
        >查看详情</van-col
      >
      <van-col span="24" class="font16 margin20_top" @click="edit"
        >编辑</van-col
      >
      <van-col span="24" class="font16 margin20_top" @click="del">删除</van-col>
      <van-col
        span="24"
        class="font16 margin20_top"
        @click="ShowPropup = !ShowPropup"
        >取消</van-col
      >
    </van-row>
  </van-popup>
</template>
<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import GoBack from "../component/GoBack.vue";
import Card from "../component/Card.vue";
import { useRouter, useRoute } from "vue-router";
import {
  TrainsApi,
  EntitySearchTrainsReq,
  EntitySearchTrainsRes,
  EntityTrains,
} from "@yakj/sdk/sdk/sdk";
import { wait } from "../api/lib";
import { store } from "@ctsy/common";

enum ActiveMap {
  "会议" = 1,
  "培训",
  "演练",
  "活动",
}
enum ActiveMaps {
  "会议" = "Meet",
  "培训" = "Train",
  "演练" = "Rehearsal",
  "活动" = "Active",
}
const router = useRouter();
const route = useRoute();
const SearchValue = ref("");
const Active = ref(1);
const change = (n: number) => {
  Active.value = n;
  store.set("active", Active.value);
  onLoad();
};
const Result = ref([new EntityTrains()]);

const List = computed(() => {
  let rs = Result.value;
  SearchValue.value.length
    ? (rs = rs.filter((v) => v.Name.includes(SearchValue.value)))
    : true;
  return rs;
});
const Loadding = ref(false);
const Finished = ref(false);
const Total = ref(0);
const Num = ref(1);
const onLoad = async () => {
  let rs = await init(1, Num.value++);
  Loadding.value = false;
  if (Result.value.length >= Total.value) {
    Finished.value = true;
  }
  Total.value = rs.T;
  Result.value = rs.L;
};

const create = () => {
  router.push({
    path: `/create/${EID.value}/${Active.value - 1}`,
  });
};

const Select = ref(0);
const ShowPropup = ref(false);
const showPropup = (n: number) => {
  Select.value = n;
  ShowPropup.value = !ShowPropup.value;
};

const seeDetail = () => {
  router.push({
    path: `/detail/${EID.value}/${Active.value - 1}/${
      Result.value[Select.value].TrainID
    }`,
  });
};
const edit = () => {
  router.push({
    path: `/create/${EID.value}/${Active.value - 1}`,
    query: {
      TrainID: Result.value[Select.value].TrainID,
    },
  });
};
const del = () => {
  Result.value.splice(Select.value, 1);
  ShowPropup.value = !ShowPropup.value;
};

const Height = computed(() => {
  return `${window.innerHeight - 50 - 180}px`;
});

const init = async (p: number = 1, n: number = 1) => {
  let rs: EntitySearchTrainsRes = await wait(
    TrainsApi.search(
      Object.assign(new EntitySearchTrainsReq(), {
        W: { PType: Active.value - 1 },
        P: p,
        N: n * 10,
      })
    )
  );
  return rs;
};

const EID = ref(0);
const OType = ref("");
onMounted(async () => {
  EID.value = Number(route.params.EID);
  // PType.value = Number(route.params.PType);
  OType.value = String(route.query.Type);
  store.get("active") > 0
    ? (Active.value = store.get("active"))
    : (Active.value = 1);
});
</script>
<style scoped lang="less">
/deep/.van-search__content {
  background: #238aff;

  .van-field__right-icon,
  i {
    color: #86befe;
  }
}

.bg {
  background-color: #f7f9fc;
  min-height: v-bind(Height);
}

.van-search {
  padding: 10px 0;
}
.actived {
  > i {
    color: #1b6ffe;
    background-color: #fff;
  }
}
</style>
