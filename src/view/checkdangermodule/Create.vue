<template>
  <van-row class="bg">
    <van-col span="22" offset="1">
      <van-row align="center" justify="space-between" class="margin_20_0">
        <van-col class="white"
          ><van-icon size="16" name="arrow-left" />
        </van-col>
        <van-col class="white_small"
          ><van-icon name="location-o" /> {{ yStore.Enter?.Simple }}</van-col
        >
      </van-row>
    </van-col>
  </van-row>
  <van-row class="body">
    <van-col span="24">
      <van-row class="pt20 pb20">
        <van-col span="22" offset="1">
          <van-row
            align="center"
            justify="space-between"
            @click="ShowOrg = !ShowOrg"
          >
            <van-col class="font15 fc141414">
              &nbsp;&nbsp;部门岗位 &nbsp;&nbsp; &nbsp;
              {{
                Result.OrgID ? yStore.OrgMap[Result.OrgID].Name : ""
              }}</van-col
            >
            <van-col><van-icon name="arrow-down" size="16" /></van-col>
          </van-row>
        </van-col>
      </van-row>
      <van-row class="mt5">
        <van-col span="24">
          <OtherDangerVue
            :ModelValue="Other"
            :ShowCancel="false"
            @clearOtherimg="clearOtherimg"
            @addOthterImgs="upload"
          ></OtherDangerVue>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="fixed_bottom">
    <van-col span="24" :class="`height50 ${Reg ? 'selfblue' : 'smallgary'}`">
      <i class="yan5 yan5-anquanpeixuntubiao_qianzi font20"></i>
      <span class="font16" @click="Reg && showQr()"> 签字提交</span>
    </van-col>
  </van-row>
  <van-popup
    v-model:show="ShowOrg"
    position="bottom"
    :style="{ height: '80%' }"
    round
  >
    <van-row class="margin_20_0">
      <van-col span="24">
        <strong>请选择部门或者岗位</strong>
      </van-col>
    </van-row>
    <van-row>
      <van-col span="22" offset="1">
        <el-tree
          ref="treeRef"
          :props="props"
          :data="TreeData"
          show-checkbox
          node-key="id"
          @check="checkChange"
        />
      </van-col>
    </van-row>
  </van-popup>
  <Sign
    :modelValue="ShowSign"
    :Name="yStore.User?.Name"
    @cancel="ShowSign = false"
    @success="success"
  ></Sign>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed, watch } from "vue";
import { CheckApi, EntityDanger } from "@yakj/sdk/sdk/sdk";
import { useStore } from "../../store";
import { useRoute, useRouter } from "vue-router";
import { array_tree, timeout } from "@ctsy/common";
import { wait } from "../../api/lib";
import { showConfirmDialog, showImagePreview, showSuccessToast } from "vant";
import Sign from "../../component/Sign.vue";
import Upload from "@ctsy/api-sdk/dist/modules/Upload";
import { ElTree } from "element-plus";
import OtherDangerVue from "../../component/OtherDanger.vue";
import { OtherDanger } from "../../api/lib";

const yStore = useStore();
const route = useRoute();
const router = useRouter();
const Result = ref<EntityDanger>(new EntityDanger());
const Other = ref<OtherDanger>(new OtherDanger());
/**
 * 签字按钮状态
 */
const Reg = computed(() => {
  return Other.value.Name && Other.value.Memo.length && Other.value.Imgs.length;
});
/**
 * 控制部门岗位的显示
 */
const ShowOrg = ref(false);

/**
 * 选择照片并上传
 */
async function upload() {
  let rs = await wait(Upload.select_upload("danger", "image/*"));
  Other.value.Imgs.push(rs.url || rs.URL);
}

function clearOtherimg(n: number) {
  Other.value.Imgs.splice(n, 1);
}

/**
 * 显示签字组件
 */
const ShowSign = ref(false);
function showQr() {
  ShowSign.value = true;
}

/**
 * 树组件
 */
interface Tree {
  label: string;
  id: number;
  pid: number;
  children?: Tree[];
}
const treeRef = ref();
const TreeData = ref<Tree[]>([]);
const props = {
  label: "label",
  children: "children",
};

function checkChange(
  data: Tree,
  obj: {
    checkedKeys: number[];
    checkedNodes: Tree[];
    halfCheckedKeys: any[];
    halfCheckedNodes: any[];
  }
) {
  /**
   * 需求：只选择一个部门或岗位
   */
  Result.value.OrgID = obj.checkedKeys[0];
}
async function success(s: string) {
  ShowSign.value = false;
  (Result.value.Name = Other.value.Name),
    (Result.value.Memo = Other.value.Memo),
    (Result.value.EImgs = Other.value.Imgs);
  try {
    let rs = await wait(CheckApi.danger([Result.value]));
    // showSuccessToast({
    //   message: "上传成功",
    //   duration: 3000,
    // });
    showConfirmDialog({
      message: "上传成功",
      cancelButtonText: "返回",
      confirmButtonText: "查看隐患",
      cancelButtonColor: "#ff0000",
      confirmButtonColor: "#1b6ffe",
    })
      .then(() => {
        // location.href = `https://wechat.tansuyun.cn/y5/risk/#/checkdanger/detail/${EID.value}/${rs.IDs[0]}`;
        location.href = `http://192.168.31.132:5175/#/checkdanger/detail/${EID.value}/${rs.IDs[0]}`;
      })
      .catch(() => {
        console.log("取消");
        Result.value = new EntityDanger();
        Other.value = new OtherDanger();
        Result.value.OrgID = -1;
        treeRef.value!.setCheckedKeys([], false);
      });
  } catch (error) {}
}
const EID = ref(0);
onMounted(async () => {
  EID.value = Number(route.params.EID);
  await timeout(500);
  let rs = yStore.Enter.Orgs;
  console.log(rs);
  let r: any[] = [];
  rs.forEach((v: any) => {
    r.push({ id: v.OrgID, label: v.Name, pid: v.POrgID });
  });
  //@ts-ignore
  TreeData.value =
    array_tree(r, {
      ufield: "id",
      pfield: "pid",
      sub_name: "children",
    }) || {};
  Result.value.OType = "Danger";
  Result.value.CUID = yStore.User?.UID;
});
</script>
<style lang="less" scoped>
.bg {
  height: 180px;
  background: linear-gradient(11.55deg, #1f7aff 0%, #2e86fe 100%);
  background-image: url("https://f.tansuyun.cn/api/y5/top_image/createdanger.webp");
  background-size: 100% 100%;
}

/deep/.van-cell__title,
/deep/.van-field__label {
  label {
    font-size: 15px;
  }
}

.smallgary {
  color: #b3bdccff;
}

.selfblue {
  color: #1b6ffe;
}
</style>
