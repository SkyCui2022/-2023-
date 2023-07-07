<template>
  <van-row class="block">
    <van-col span="24">
      <van-row>
        <van-col span="22" offset="1">
          <van-row align="center" justify="space-between">
            <van-col
              ><span class="fcff0000">*</span
              ><span class="font15 fc141414">隐患名称</span></van-col
            >
            <van-col>
              <van-button size="mini" @click="cancel" type="danger"
                >取消</van-button
              >
            </van-col>
          </van-row>
        </van-col>
        <van-col span="22" offset="1">
          <van-row
            ><van-field
              placeholder="请输入隐患名称"
              v-model="ModelValue.Name"
              class="borderbottom1"
            ></van-field
          ></van-row>
        </van-col>
      </van-row>
      <van-row class="mt10">
        <van-col span="24">
          <van-row>
            <van-col offset="1"
              ><span class="fcff0000">*</span
              ><span class="font15 fc141414">隐患描述</span></van-col
            >
          </van-row>
        </van-col>
        <van-col span="22" offset="1" class="mt5">
          <van-row
            ><van-field
              placeholder="请输入隐患描述"
              class="border1"
              autosize
              rows="2"
              type="textarea"
              v-model="ModelValue.Memo"
            ></van-field
          ></van-row>
        </van-col>
      </van-row>
      <van-row class="block mt10">
        <van-col span="22" offset="1" class="left font14">
          <span class="fcff0000">*</span
          ><span class="font15 fc141414">隐患图片</span>
        </van-col>
      </van-row>
      <van-row class="block mt5">
        <van-col span="22">
          <van-row class="block" align="center">
            <template v-for="(v, k) in ModelValue.Imgs">
              <van-col offset="1" class="position">
                <van-image
                  :src="v"
                  width="50"
                  height="50"
                  @click="showImagePreview(ModelValue.Imgs, k)"
                ></van-image>
                <van-row class="clear" @click="clearOtherimg(k)">
                  <van-icon name="clear" color="#fff" />
                </van-row>
              </van-col>
            </template>
            <van-col offset="1" @click="addOthterImgs">
              <van-icon
                name="photograph"
                class="bcf1f3f6 fcd5d6d8 pl10 pr10 pt10 pb10"
                size="30"
              />
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
  <van-row class="empty"></van-row>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { OtherDanger } from "../api/lib";
import { showImagePreview } from "vant";

const props = defineProps({
  ModelValue: {
    type: OtherDanger,
    default: () => new OtherDanger(),
  },
});

const emits = defineEmits(["clearOtherimg", "addOthterImgs", "cancel"]);
function clearOtherimg(n: number) {
  emits("clearOtherimg", n);
}
function addOthterImgs() {
  emits("addOthterImgs");
}
function cancel() {
  emits("cancel");
}
</script>
<style lang="less" scoped>
.borderbottom1 {
  border-bottom: 1px solid #f4f4f4;
}
.border1 {
  border: 1px solid #f4f4f4;
}
.position {
  position: relative;
}

.clear {
  position: absolute;
  top: 0;
  right: 0;
}
.empty {
  height: 50px;
  width: 100%;
}
</style>
