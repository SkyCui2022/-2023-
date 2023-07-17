<template>
  <van-row class="head">
    <van-row justify="space-between" class="block margin20">
      <van-col>
        <i
          @click="router.go(-1)"
          class="yan5 yan5-anquanpeixuntubiao_fanhui font16"
        ></i>
        &nbsp;
        <span class="font20">{{ yStore.Enter?.Simple }}</span>
      </van-col>
      <van-col @click="toOrgDetail" class="font16">
        <!-- <i class="yan5 yan5-zuzhijiagou_jinruxiangqing-yuan font17"></i> -->
      </van-col>
    </van-row>
    <van-row justify="space-around" class="block">
      <van-col>
        <van-col class="font20">{{ PostNum }}</van-col>
        <van-col class="font14 smallblue"
          ><i class="yan5 yan5-zuzhijiagou_gangwei-xianxing font16"></i
          >岗位数</van-col
        >
      </van-col>

      <van-col>
        <van-col class="font20">{{ MemNums }}</van-col>
        <van-col class="font14 smallblue"
          ><i class="yan5 yan5-zuzhijiagou_renyuan-xianxing font16"></i
          >员工数</van-col
        >
      </van-col>
    </van-row>
    <van-row class="block">
      <van-col span="22" offset="1">
        <van-search v-model="Search" placeholder="搜索部门/岗位"></van-search>
      </van-col>
    </van-row>
  </van-row>
  <van-row class="bg">
    <van-col span="22" offset="1">
      <template v-for="(i, k) in OrgList" :key="k">
        <van-row
          class="block card padding10"
          align="center"
          justify="space-between"
        >
          <van-col span="22" @click="showSon(k)">
            <van-row class="block" justify="space-between" align="center">
              <van-col class="font15 flex_center"
                ><i
                  :class="`yan5 ${
                    i.Type
                      ? 'yan5-zuzhijiagou_gangwei-xianxing'
                      : 'yan5-zuzhijiagou_bumen-biaotou'
                  } size27`"
                ></i
                >&nbsp;&nbsp;{{ i.Name }}</van-col
              >
              <van-col
                ><span v-if="i.children.length" class="font14"
                  ><i class="yan5 yan5-zuzhijiagou_gangwei-xianxing size14"></i
                  >{{
                    i.children.length > 9
                      ? i.children.length
                      : `0${i.children.length}`
                  }}</span
                >&nbsp;&nbsp;&nbsp;<span
                  class="blue font14"
                  v-if="Members.length"
                  ><i class="yan5 yan5-zuzhijiagou_renyuan-xianxing size14"></i
                  >{{
                    Members.length > 9 ? Members.length : `0${Members.length}`
                  }}</span
                ></van-col
              >
            </van-row>
          </van-col>
          <van-col span="1" class="font16" @click="toUnit(k)">
            <i class="yan5 yan5-anquanpeixuntubiao_jinru1"></i
          ></van-col>
          <template v-if="i.children.length && ShowList[k]">
            <van-divider class="block"></van-divider>
          </template>
          <template v-if="i.children.length && ShowList[k]">
            <van-row
              class="margin_10_0 block"
              align="center"
              justify="space-between"
              v-for="(d, v) in i.children"
              :key="v"
            >
              <van-col span="21" offset="1">
                <van-row class="block" justify="space-between" align="center">
                  <van-col class="font15 flex_center"
                    ><i class="yan5 yan5-zuzhijiagou_gangwei-biaotou size27"></i
                    >&nbsp;&nbsp;{{ d.Name }}</van-col
                  >
                  <van-col
                    ><span v-if="d.children.length" class="font14"
                      ><i class="yan5 yan5-zuzhijiagou-gangweitongji size14"></i
                      >{{
                        d.children.length > 9
                          ? d.children.length
                          : `${d.children.length}`
                      }}</span
                    >&nbsp;&nbsp;&nbsp;<span
                      class="blue font14"
                      v-if="d.UIDs.length"
                      ><i
                        class="yan5 yan5-zuzhijiagou_renyuan-xianxing size14"
                      ></i
                      >{{
                        d.UIDs.length > 9 ? d.UIDs.length : `0${d.UIDs.length}`
                      }}</span
                    ></van-col
                  >
                </van-row>
              </van-col>
              <van-col span="1" class="font16" @click="toPost(k, v)">
                <i class="yan5 yan5-anquanpeixuntubiao_jinru1"></i>
              </van-col>
            </van-row>
          </template>
        </van-row>
      </template>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { array_tree, timeout } from "@ctsy/common";
import { useRouter, useRoute } from "vue-router";
import { EntityOrgs, MemberApi } from "@yakj/sdk/sdk/sdk";
import { useStore } from "../store";
import { wait } from "../api/lib";
import { store } from "@ctsy/api-sdk/dist/lib";
const yStore = useStore();
const router = useRouter();
const route = useRoute();
const Reasult = ref<EntityOrgs[]>([]);
const Search = ref("");
const OrgList = computed(() => {
  let rs = array_tree([...Units.value, ...Posts.value], {
    pfield: "POrgID",
    ufield: "OrgID",
    sub_name: "children",
  });
  //@ts-ignore
  rs.forEach((item, key) => {
    ShowList.value[key] = false;
    item.children.length > 0 &&
      item.children.sort((a: any, b: any) => a.Sort - b.Sort);
  });
  //@ts-ignore
  rs.sort((a, b) => a.Sort - b.Sort);
  return rs?.filter((v) => {
    if (v.children.some((d: any) => d.Name.includes(Search.value))) {
      return v;
    } else if (v.Name.includes(Search.value)) {
      return v;
    }
  });
});
const PostNum = computed(() => {
  return Posts.value.length;
});
const MemNums = computed(() => {
  return Members.value.length;
});
const ShowList = ref([] as boolean[]);
function showSon(n: number) {
  ShowList.value[n] = !ShowList.value[n];
}
function toOrgDetail() {
  router.push(`/Org/Detail/${EID.value}`);
}
function toUnit(n: number) {
  router.push({
    //@ts-ignore
    path: `/Org/Unit/${EID.value}/${OrgList.value[n].OrgID}`,
    query: {
      //@ts-ignore
      UnitName: `${OrgList.value[n].Name}`,
    },
  });
}
function toPost(n: number, k: number) {
  router.push({
    //@ts-ignore
    path: `/Org/Post/${EID.value}/${OrgList.value[n]?.children[k]?.OrgID}`,
    query: {
      //@ts-ignore
      UnitName: `${OrgList.value[n].Name}`,
      //@ts-ignore
      PostName: `${OrgList.value[n].children[k].Name}`,
    },
  });
}

const BG = computed(() => {
  return window.innerHeight - 166 + "px";
});
const EID = ref(0);
const Units: any = ref([]);
const Posts: any = ref([]);
const Members: any = ref([]);

onMounted(async () => {
  EID.value = Number(route.params.EID);
  Reasult.value = Object.values(yStore.OrgMap);
  let map = <{ [index: number]: any }>{};
  let rs = await wait(MemberApi._get("Member/tree?Type[]=0&Type[]=1&Type[]=2"));
  rs.L.forEach((v: any) => {
    switch (v.Type) {
      case 0:
        Units.value.push(v);
        break;
      case 1:
        Posts.value.push(v);
        break;
      case 2:
        Members.value.push(v);
        break;
    }
    if (v.Type != 2) {
      map[v.OrgID] = v;
    } else {
      yStore.getAccount(v.UID);
    }
  });
  Object.values(map).map((v) => {
    v.UIDs = [];
    v.AdminUIDs = [];
  });
  Members.value.forEach((v) => {
    v.MOrgIDs.forEach((d) => map[d].UIDs.push(v.UID));
    v.AOrgIDs.forEach((d) => map[d].AdminUIDs.push(v.UID));
    yStore.getAccount(v.UID);
  });
  store.set("OrgMap", map);
  // OrgData.value = Orgs;
});
</script>
<style scoped lang="less">
.head {
  background: linear-gradient(180deg, #0086ff 0%, #007aff 100%);
  width: 100%;
  height: 166px;
  color: #fff;
}

.margin20 {
  margin: 20px;
}

.van-search {
  background: transparent;

  /deep/.van-search__content {
    background: #1e8cff;

    .van-search__field .van-field__left-icon,
    .van-field__control {
      color: #fff;
    }
  }
}

.smallblue {
  color: #5bb1ff;
}

.van-divider {
  margin: 5px 0;
}

.bg {
  min-height: v-bind(BG);
  background: #f7f9fc;
}
</style>
