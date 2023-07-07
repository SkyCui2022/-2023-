<template>
  <van-row class="bg white">
    <van-col span="22" offset="1" class="margin20_top">
      <Title
        Title=""
        EnterSize="13"
        EnterIconSize="12"
        EnterColor="#acd5fdff"
        @go="router.go(-1)"
      ></Title>
    </van-col>
    <van-col span="24">
      <van-search
        v-model="KeyWord"
        placeholder="搜索课件名称"
        input-align="left"
      />
    </van-col>
  </van-row>
  <van-row>
    <van-col span="24" class="line"></van-col>
  </van-row>
  <Tree2 :Lists="Lists" @toDetail="toDetail" @edit="edit"> </Tree2>
  <van-row class="fixed_bottom height50 gray">
    <van-col
      span="10"
      offset="1"
      class="font18 blue flex"
      @click="addGroup(true)"
    >
      <i class="yan5 yan5-anquanhuodong_chuangjianhuodong font23"></i>
      <div class="width4"></div>
      <span class="font16">添加分组</span>
    </van-col>
    <van-col
      span="10"
      offset="2"
      class="font18 blue flex"
      @click="router.push(`/train/list/${EID}`)"
    >
      <i class="yan5 yan5-xueshimao_fill font23"></i>
      <div class="width4"></div>
      <span class="font16">查看培训</span>
    </van-col>
  </van-row>
  <!-- 后续可能需要的功能 -->
  <!-- <van-popup
    v-model:show="ShowEditPopup"
    position="bottom"
    :style="{
    height:
      EditData?.DID != -1
        ? EditData?.children?.length &&
          EditData?.children.some((v: any) => v.TrainID)
          ? '39%'
          : '33%'
        : '17%',
  }"
    round
  >
    <van-row class="margin_25_0" v-if="EditData.DID != -1">
      <van-col span="24" class="font16" @click="importData">导入资料</van-col>
    </van-row>
    <van-row class="margin_25_0" v-if="EditData.DID != -1">
      <van-col span="24" class="font16" @click="addGroup">添加分组</van-col>
    </van-row>
    <van-row class="margin_25_0" v-if="EditData.DID != -1">
      <van-col span="24" class="font16" @click="changeGroupName"
        >修改分组名称</van-col
      >
    </van-row>
    <van-row class="margin_25_0" v-if="EditData.DID != -1">
      <van-col span="24" class="font16" @click="delGroup">删除分组</van-col>
    </van-row>
    <van-row
      class="margin_25_0"
      v-if="EditData?.children?.length && EditData?.children?.some((v: any) => v.TrainID)
      "
    >
      <van-col span="24" class="font16" @click="delTrain">删除课件</van-col>
    </van-row>
    <van-row class="line">
      <van-col></van-col>
    </van-row>
    <van-row class="margin_15_0">
      <van-col span="24" class="font16" @click="ShowEditPopup = false"
        >取消</van-col
      >
    </van-row>
  </van-popup>
  <van-popup
    v-model:show="ShowEditListPopup"
    position="bottom"
    round
    :style="{ height: '80%' }"
  >
    <van-row>
      <van-col> </van-col>
    </van-row>
    <van-row class="margin_15_0">
      <van-col span="22" offset="1">
        <van-search
          v-model="SearchTrain"
          placeholder="请输入课件名称"
        ></van-search
      ></van-col>
    </van-row>
    <van-row>
      <van-col span="22" offset="1">
        <van-checkbox-group v-model="OperateList">
          <template v-for="(v, k) in OperateData" :key="k">
            <van-checkbox :name="v.TrainID">
              <van-row class="operatecard block">
                <van-col span="24">
                  <van-row align="center">
                    <van-col>
                      <van-image
                        width="150px"
                        height="80px"
                        :src="v.Head"
                      ></van-image>
                    </van-col>
                    <van-col offset="1">
                      <van-row class="font14">
                        {{ v.Name }}
                      </van-row>
                      <van-row class="font13"
                        >创建人:{{ State.UserMap[v.CUID]?.Name }}</van-row
                      >
                      <van-row class="datecolor">
                        {{ timeFormat(v.CTime, DateFMT.YMD) }}
                      </van-row>
                    </van-col>
                  </van-row>
                </van-col>
              </van-row>
            </van-checkbox>
          </template>
        </van-checkbox-group>
      </van-col>
    </van-row>
    <van-row class="height50">
      <van-col span="24"></van-col>
    </van-row>
    <van-sticky position="bottom">
      <van-row class="back_gray padding_5_0">
        <van-col span="22" offset="1">
          <van-row class="block" align="center" justify="space-between">
            <van-col class="blue">已选:{{ OperateList.length }}</van-col>
            <van-col>
              <van-button
                class="width105 radiusleft"
                @click="ShowEditListPopup = false"
                color="#5493ff"
                >取消</van-button
              >
              <van-button
                class="width105 radiusright"
                color="#1b6ffe"
                @click="confrim"
                >确认</van-button
              >
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-sticky>
  </van-popup> -->
</template>
<script lang="ts" setup>
import { ref, computed, h } from "vue";
import { onMounted } from "vue";
import { wait, timeFormat } from "../api/lib";
import { array_tree, format_date, DateFMT } from "@ctsy/common";
import {
  TrainsApi,
  EntityTrainTree,
  DicsApi,
  EntityDics,
  EntityTrains,
  UserApi,
} from "@yakj/sdk/sdk/sdk";
import { useRoute, useRouter } from "vue-router";
import {
  closeDialog,
  showDialog,
  Row,
  Field,
  Col,
  showConfirmDialog,
} from "vant";
import { delay_cb } from "@ctsy/common";
import { cloneDeep } from "lodash";
import useBaseData from "../hooks/BaseData";
import { useStore } from "../store";
import Title from ".././component/Title.vue";
import Tree2 from "../component/Tree2.vue";

const yStore = useStore();
let EID = 0;
const { State, getMember, getEnter } = useBaseData();
const route = useRoute();
const router = useRouter();
const KeyWord = ref("");

const Resault = ref<EntityTrainTree[]>([]);
const Lists = computed(() => {
  let rs: any[] = [];
  KeyWord.value.length
    ? (rs = Resault.value.filter((v) => v.Name.includes(KeyWord.value)))
    : (rs = Resault.value);
  return array_tree(rs, {
    pfield: "PDID",
    ufield: "DID",
    sub_name: "children",
  });
});

function toDetail(n: number) {
  router.push({
    path: `/train/${EID}/${n}`,
    query: { Type: "readonly" },
  });
}

//分组操作
const ShowEditPopup = ref(false);
const ShowEditListPopup = ref(false);
const EditData = ref<EntityTrainTree>(new EntityTrainTree());
function edit(d: any) {
  EditData.value = d;
  ShowEditPopup.value = !ShowEditPopup.value;
}

const OperateList = ref<number[]>([]);
const SearchTrain = ref("");
const OperateData = ref();
const EditKey = ref("");
/**
 * 导入资料
 */
async function importData() {
  EditKey.value = "importData";
  let rs = (await wait(TrainsApi._get("Trains/tree?System=1&PType=100"))).L;

  ShowEditListPopup.value = !ShowEditListPopup.value;
  //@ts-ignore
  OperateData.value = rs.filter((v) => v.TrainID != 0);
}
/**
 * 删除培训资料
 */
function delTrain() {
  EditKey.value = "delTrain";
  ShowEditListPopup.value = !ShowEditListPopup.value;
  //@ts-ignore
  OperateData.value = EditData.value.children;
}

/**
 * 确认删除
 */
async function confrim() {
  switch (EditKey.value) {
    case "importData":
      OperateList.value.map(async (v) => {
        let train = OperateData.value.filter(
          (d: EntityTrains) => d.TrainID == v
        );
        let data = await TrainsApi.getByTrainID(train[0].TrainID);
        await wait(
          TrainsApi.adds([
            Object.assign(cloneDeep(data), {
              PType: 100,
              EID: EID,
              RefID: v,
              //@ts-ignore
              GDID: EditData.value.DID,
            }),
          ])
        );
        delay_cb("importData", 500, async () => {
          ShowEditListPopup.value = !ShowEditListPopup.value;
          ShowEditPopup.value = !ShowEditPopup.value;
          await search();
        });
      });
      break;
    case "delTrain":
      OperateList.value.map(async (v) => {
        await wait(TrainsApi.delByTrainID(v), "正在删除，请稍后。");
      });
      ShowEditListPopup.value = !ShowEditListPopup.value;
      ShowEditPopup.value = !ShowEditPopup.value;
      delay_cb("delTrain", 500, async () => {
        await search();
      });
      break;
  }
}
/**
 * 添加分组
 */
async function addGroup(flag: boolean = false) {
  let groups = "";
  showConfirmDialog({
    title: "添加分组",
    confirmButtonText: "确认添加",
    confirmButtonColor: "#1b6ffe",
    cancelButtonText: "取消",
    message: () =>
      h(Row, {}, () => [
        h(
          Col,
          { span: 22, offset: 1, class: "font18" },
          () => "可添加多个分组，使用“，”分隔。"
        ),
        h(Col, { span: 22, offset: 1 }, () => [
          h(Field, {
            placeholder: "请输入分组名称",
            "onUpdate:modelValue": (val: string) => {
              groups = val;
            },
          }),
        ]),
      ]),
  })
    .then(async () => {
      groups
        .replace(/[,，.。、\；;]/g, ",")
        .split(",")
        .map(async (v) => {
          await wait(
            DicsApi.adds([
              Object.assign(new EntityDics(), {
                PDID: flag == true ? 0 : EditData.value?.DID,
                Name: v,
                GID: EID,
                TID: 4,
              }),
            ])
          );
          closeDialog();
          !flag && (ShowEditPopup.value = !ShowEditPopup.value);

          delay_cb("add", 500, async () => {
            await search();
          });
        });
    })
    .catch(() => {
      console.log("取消");
    });
}

/**
 * 修改分组名称
 */
function changeGroupName() {
  let changeName = "";
  showConfirmDialog({
    title: "修改分组名称",
    cancelButtonText: "取消",
    confirmButtonText: "确认修改",
    message: () =>
      h(Row, {}, [
        h(
          Col,
          { span: 22, offset: 1, class: "font16" },
          //@ts-ignore
          `当前名称：${EditData.value.Name}`
        ),
        h(Col, { span: 22, offset: 1 }, [
          h(Field, {
            vModel: changeName,
            "onUpdate:modelValue": (val) => {
              changeName = val;
            },
            placeholder: "请输入修改后名称",
            class: "font14",
          }),
        ]),
      ]),
  })
    .then(async () => {
      await wait(
        DicsApi._patch(
          "Dics/save",
          Object.assign(new EntityDics(), {
            //@ts-ignore
            DID: EditData.value.DID,
            //@ts-ignore
            PDID: EditData.value.PDID,
            TID: 4,
            GID: EID,
            Name: changeName,
          })
        )
      );
      closeDialog();
      ShowEditPopup.value = !ShowEditPopup.value;
      delay_cb("add", 500, async () => {
        await search();
      });
    })
    .catch(() => {
      console.log("取消");
    });
}

/**
 *
 */
function delGroup() {
  //@ts-ignore
  EditData.value.children.length
    ? showDialog({ message: "该分组下有数据，不允许删除" })
    : showConfirmDialog({
        message: "确认删除分组？",
        confirmButtonText: "删除",
        cancelButtonText: "取消",
      })
        .then(async () => {
          //@ts-ignore
          await wait(DicsApi.del([EditData.value.DID]), "正在删除，请稍后！");
          delay_cb("delGroup", 500, () => {
            search();
            ShowEditPopup.value = !ShowEditPopup.value;
          });
        })
        .catch(() => {
          console.log("取消");
        });
}

async function search() {
  Resault.value = (await wait(TrainsApi.tree(EID))).L;
  Resault.value.push({
    TrainID: 0,
    DID: -1,
    PDID: 0,
    Name: "未分组",
    Sort: 0,
    CUID: 0,
    CTime: "",
    Head: "",
    $set: () => new EntityTrainTree(),
  });
  Resault.value.map((v) => {
    v.TrainID && !v.PDID ? (v.PDID = -1) : true;
  });
}

onMounted(async () => {
  EID = Number(route.params.EID);
  // await UserApi.relogin(false, EID);
  await search();
  await getMember(EID);
});
</script>
<style lang="less" scoped>
.bg {
  width: 100%;
  height: 180px;
  background-image: url("https://f.tansuyun.cn/api/yan/2023-05-12/企业培训课件库.jpg");
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.van-search {
  background: transparent;
  margin-top: 80px;
}

/deep/.van-field__control,
/deep/.van-field__left-icon {
  color: #498cfe;
}

/deep/.van-field__control,
/deep/.van-field__control--center {
  font-size: 14px;
}

/deep/.van-badge__wrapper,
/deep/.van-icon,
/deep/.van-icon-search {
  font-size: 18px;
}

/deep/.van-search__content--square {
  border-radius: 10px;
}

.operatecard {
  margin: 0px;
  padding: 10px;
  background: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 3px 6px rgba(116, 126, 167, 0.2);
  margin-bottom: 8px;
}

.back_gray {
  background: #f2f2f2;
}

.width105 {
  width: 105px;
}

.radiusleft {
  border-radius: 20px 0px 0px 20px;
}

.radiusright {
  border-radius: 0px 20px 20px 0px;
}

/deep/.van-checkbox__label {
  width: 84%;
}

.datecolor {
  color: #a1a1a1ff;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.width4 {
  height: 100%;
  width: 4px;
}
</style>
