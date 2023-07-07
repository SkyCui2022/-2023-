<template>
  <van-row class="backblueb">
    <van-col span="22" offset="1">
      <GoBack :Name="'创建' + TrainType"></GoBack>
    </van-col>
  </van-row>
  <van-row>
    <van-form input-align="right">
      <van-field
        v-model="Safety.Name"
        required
        :label="TrainType + '主题'"
        placeholder="请输入主题"
      ></van-field>
      <van-field
        v-model="Safety.Address"
        required
        :label="TrainType + '地点'"
        placeholder="请输入地点"
      ></van-field>
      <van-field
        label="开始时间"
        required
        v-model="Safety.STime"
        readonly
        placeholder="请选择开始时间"
        @click="showDate('s')"
      >
      </van-field>
      <van-field
        label="结束时间"
        required
        v-model="Safety.ETime"
        readonly
        placeholder="请选择结束时间"
        @click="showDate('e')"
      >
      </van-field>
      <van-field
        v-model="Safety.Compere"
        label="主持人"
        placeholder="请输入主持人姓名"
      ></van-field>
      <van-row class="margin_10_0">
        <van-col span="22" offset="1">
          <van-row align="center" justify="space-between">
            <van-col> 选择部门 </van-col>
            <van-col span="16" @click="ShowPopup = !ShowPopup" class="right">
              <template v-for="(v, k) in Safety.OrgIDs" :key="k">
                {{ yStore.OrgMap[v]?.Name }}
                <span v-if="k !== Safety.OrgIDs.length - 1">、</span> </template
              ><van-icon name="arrow-down" size="16"></van-icon>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-col span="24" class="line_gray"></van-col>
      <van-field
        label="会议详情"
        class="column"
        v-model="Safety.Content"
        placeholder="请输入内容..."
        type="textarea"
        input-align="left"
      >
      </van-field>
      <van-col span="22" offset="1">
        <van-row align="center">
          <template v-if="Safety.Imgs.length">
            <template v-for="(file, key) in Safety.Imgs" :key="key">
              <van-col class="position_relative margin_4_8">
                <van-image
                  @click="showImagePreview(Safety.Imgs, key)"
                  :src="file"
                  fit="fill"
                  width="43"
                  height="43"
                ></van-image>
                <van-icon
                  name="close"
                  size="16"
                  class="close"
                  @click="Safety.Imgs.splice(key, 1)"
                />
              </van-col>
            </template>
          </template>
          <van-col @click="uploadImg">
            <i class="yan5 yan5-anquanhuodong_tianjiazhaopian size43 gray"></i>
          </van-col>
        </van-row>
      </van-col>
    </van-form>
    <van-col
      @click="addActivity"
      span="24"
      :class="`gray height50 block positionbottom ${
        Safety.Name.length > 0 &&
        Safety.Address.length > 0 &&
        Safety.STime.length > 0 &&
        Safety.ETime.length > 0
          ? 'blue'
          : 'grey'
      }`"
    >
      <i class="yan5 yan5-fabu size23"></i>&nbsp;&nbsp;<span class="font16"
        >保存发布</span
      >
    </van-col>
    <van-popup
      v-model:show="ShowDate"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <nut-date-picker
        v-model="CurrentDate"
        type="datetime"
        title="日期选择"
        :min-date="MinDate"
        :max-date="MaxDate"
        @confirm="confirmDate"
        @cancel="ShowDate = false"
      ></nut-date-picker>
    </van-popup>
  </van-row>
  <van-popup
    v-model:show="ShowPopup"
    position="bottom"
    :style="{ height: '80%' }"
    round
  >
    <van-row class="position_relative">
      <van-col span="24" class="margin_10_0">
        <strong class="font16">请选择部门岗位</strong>
      </van-col>
      <van-col :span="22" offset="1">
        <el-tree
          @check="currentChange"
          :data="TreeData"
          :props="props"
          show-checkbox
          class="left"
        />
      </van-col>
      <van-col class="height50"></van-col>
    </van-row>
    <van-row class="block fixed_bottom" align="center" justify="space-around">
      <van-col span="12"
        ><van-button @click="cancel" type="danger" size="large"
          >取消</van-button
        ></van-col
      >
      <van-col span="12">
        <van-button @click="confirm" type="primary" size="large"
          >确定</van-button
        ></van-col
      >
    </van-row>
    <template #reference>
      <van-row class="block">
        <van-col span="22" offset="1">
          <van-row class="block right" align="center" justify="end">
            <template v-if="Safety.OrgIDs.length">
              <template v-for="(v, k) in Safety.OrgIDs" :key="k">
                <van-tag
                  closeable
                  size="medium"
                  type="primary"
                  @close="close(k)"
                >
                  {{ TreeMap[v].label }}
                </van-tag>
              </template>
            </template>
            <van-col
              ><i
                :class="`yan5 ${
                  ShowPopup
                    ? 'yan5-anquanpeixuntubiao_xiala-copy'
                    : 'yan5-anquanpeixuntubiao_jinru1'
                }`"
              ></i
            ></van-col>
          </van-row>
        </van-col>
      </van-row>
    </template>
  </van-popup>
</template>
<script setup lang="ts">
import {
  computed,
  defineComponent,
  ref,
  reactive,
  onMounted,
  watch,
} from "vue";
import { Toast, showImagePreview, showFailToast } from "vant";
import GoBack from "../component/GoBack.vue";
import { array_tree, format_date, DateFMT, timeout } from "@ctsy/common";
import useTree from "../hooks/Tree";
import { wait, timeFormat } from "../api/lib";
import { ElTree } from "element-plus";
import Upload from "@ctsy/api-sdk/dist/modules/Upload";
import { useRouter, useRoute } from "vue-router";
import {
  TrainsApi,
  EntityTrains,
  EntitySaveTrainsReq,
} from "@yakj/sdk/sdk/sdk";
import { ShowMapTrainPublishType } from "@yakj/sdk/sdk/maps";
import { useStore } from "../store";

const yStore = useStore();
const router = useRouter();
const route = useRoute();
const TrainID = computed(() => {
  return Number(route.query.TrainID);
});
const TrainType = computed(() => {
  //@ts-ignore
  return ShowMapTrainPublishType[PType.value].slice(2);
});
let TreeMap: { [index: string]: any } = {};
const Safety = reactive({
  Name: "",
  Address: "",
  STime: "",
  ETime: "",
  Compere: "",
  OrgIDs: <number[]>[],
  Content: "",
  Imgs: <string[]>[],
});

//日期时间选择逻辑
const ShowDate = ref(false);
const CurrentDate = ref("");
const ActiveDate = ref("");
//日期选择期最小时间
const MinDate = new Date("2023-01-01 00:00:00");
//日期选择器最大时间
const MaxDate = new Date("2025-12-31 23:59:59");
const showDate = (s: string) => {
  ShowDate.value = !ShowDate.value;
  ActiveDate.value = s;
};
const confirmDate = ({ selectedValue = [] }) => {
  let date = selectedValue.slice(0, 3).join("-");
  let time = selectedValue.slice(3).join(":");
  let s = `${date} ${time}`;
  switch (ActiveDate.value) {
    case "s":
      if (Safety.ETime.length > 0 && s > Safety.ETime) {
        Toast.fail("请选择正确时间");
      } else {
        Safety.STime = s;
      }
      break;
    case "e":
      if (Safety.STime.length > 0 && Safety.STime > s) {
        Toast.fail("请选择正确时间");
      } else {
        Safety.ETime = s;
      }
      break;
  }
  ShowDate.value = !ShowDate.value;
};

//部门岗位逻辑
const Search = ref("");
const ShowPopup = ref(false);
const SelectArr = ref([]);
const currentChange = (node: any, arr: any) => {
  SelectArr.value = [];
  arr.checkedNodes.forEach((item: any) => {
    SelectArr.value.push(item.id);
  });
};
const close = (n: number) => {
  Safety.OrgIDs.splice(n, 1);
};
const cancel = () => {
  ShowPopup.value = false;
};
const confirm = () => {
  ShowPopup.value = !ShowPopup.value;
  Safety.OrgIDs = SelectArr.value;
};
function setTree(arr: Array<any>) {
  let arrs: any = [];
  arr.forEach((item) => {
    let obj: {
      id: number;
      label: string;
      children?: { [index: string]: any };
    } = {
      id: item.OrgID,
      label: item.Name,
    };
    if (item.children && item.children.length > 0) {
      obj.children = setTree(item.children);
    }
    TreeMap[item.OrgID] = obj;
    arrs.push(obj);
  });
  return arrs;
}
const { props, TreeData } = useTree();

//会议详情图片
const uploadImg = async (file: File) => {
  let rs = await wait(Upload.select_upload("active", "image/*"));
  Safety.Imgs.push(rs.url || rs.URL);
};

//保存发布
const addActivity = async () => {
  if (
    Safety.Name.length > 0 &&
    Safety.Address.length > 0 &&
    Safety.STime.length > 0 &&
    Safety.ETime.length > 0
  ) {
    if (!TrainID.value) {
      await wait(
        TrainsApi.adds([
          Object.assign(new EntityTrains(), {
            PType: PType.value,
            Addr: Safety.Address,
            STime: Safety.STime,
            ETime: Safety.ETime,
            Teacher: Safety.Compere,
            OrgIDs: Safety.OrgIDs,
            Content: Safety.Content,
            URLs: Safety.Imgs,
            Name: Safety.Name,
          }),
        ])
      );
      router.push(`/logs/${EID.value}/${PType.value}`);
    } else {
      await wait(
        TrainsApi.saveByTrainID(
          TrainID.value,
          Object.assign(new EntitySaveTrainsReq(), {
            PType: PType.value,
            Addr: Safety.Address,
            STime: Safety.STime,
            ETime: Safety.ETime,
            Teacher: Safety.Compere,
            OrgIDs: Safety.OrgIDs,
            Content: Safety.Content,
            URLs: Safety.Imgs,
            Name: Safety.Name,
            TrainID: TrainID.value,
          })
        )
      );
      router.push(`/logs/${EID.value}/${PType.value}`);
    }
  } else {
    showFailToast("请将带“☆”必填项填写完整");
  }
};

//init
const EID = ref(0);
const PType = ref(0);
onMounted(async () => {
  PType.value = Number(route.params.PType);
  EID.value = Number(route.params.EID);
  let tree = array_tree(yStore.Enter.Orgs, {
    pfield: "POrgID",
    ufield: "OrgID",
    sub_name: "children",
    remove_null: true,
  });
  //@ts-ignore
  TreeData.value = setTree(tree);
  if (TrainID.value) {
    let result: EntityTrains = await wait(
      TrainsApi.getByTrainID(Number(route.query.TrainID))
    );
    yStore.getAccount(result.CUID);
    await timeout(200);
    Safety.Address = result.Addr;
    Safety.Compere = yStore.UserMap[result.CUID]?.Name;
    Safety.ETime = timeFormat(result.ETime, DateFMT.YMDHm);
    Safety.STime = timeFormat(result.STime, DateFMT.YMDHm);
    Safety.Imgs = result.URLs;
    Safety.Content = result.Content;
    Safety.Compere = result.Teacher;
    Safety.Name = result.Name;
    Safety.OrgIDs = result.OrgIDs;
  }
});
</script>
<style scoped lang="less">
.van-form {
  width: 100%;
}

/deep/svg {
  width: 12px;
}

/deep/.van-field__control {
  color: #1b6ffe;
  font-size: 15px;
}

/deep/textarea {
  display: block;
  border: 1px solid #e2e2e2;
  margin-top: 10px;
  font-size: 12px;
}

/deep/.van-popover__wrapper {
  width: 100%;
}
</style>
