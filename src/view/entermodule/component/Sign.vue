<template>
  <van-popup
    uir="signPage"
    closeable
    v-model:show="show"
    v-if="show"
    close-icon-position="bottom-right"
    class="sign"
    :style="{ height: '100%', width: '100%' }"
    @contextmenu="
      () => {
        return false;
      }
    "
  >
    <van-col span="24" class="signature">
      <VueSignaturePad
        id="sign"
        class="sign"
        :width="screen.availWidth + 'px'"
        saveType="image/png"
        :options="options"
        :height="screen.availHeight + 'px'"
        ref="signaturePad"
      />
    </van-col>
    <van-col span="24">
      <van-row class="posi">
        <van-col span="6" style="text-align: center">
          <van-button @click="submit" size="small">
            {{ props.Name }}
          </van-button>
        </van-col>
        <van-col span="5" style="text-align: center; margin-left: 8px">
          <van-button @click="cancel" size="small"> 取消 </van-button>
        </van-col>
        <van-col span="5" style="text-align: center; margin-left: 8px">
          <van-button type="primary" @click="reSign" size="small">
            重签
          </van-button>
        </van-col>
        <van-col span="5" style="text-align: center; margin-left: 8px">
          <van-button type="primary" @click="submit" size="small">
            确认
          </van-button>
        </van-col>
      </van-row>
    </van-col>
  </van-popup>

  <van-image
    src="https://f.tansuyun.cn/api/yan/2023-04-13/expression_chaoxing_1.gif"
    width="100"
    height="100"
  ></van-image>
</template>

<script lang="ts" setup>
import {
  computed,
  defineComponent,
  ref,
  reactive,
  onMounted,
  watch,
  defineEmits,
  h,
  createRenderer,
} from "vue";
import { timeout } from "@ctsy/common";
import { showFailToast, showLoadingToast } from "vant";
import Upload from "@ctsy/api-sdk/dist/modules/Upload";
import { dataurl_to_file } from "@ctsy/api-sdk/dist/lib";

// import { } from '../api/lib'
const props = defineProps({
  modelValue: Boolean,
  Name: String,
});
const emit = defineEmits(["update:modelValue", "success", "cancel"]);
const show: any = computed({
  get() {
    return props.modelValue || false;
  },
  set(v) {
    emit("update:modelValue", v);
  },
});
const screen = ref(window.screen);
const signaturePad = ref(null);
const customStyle = ref({
  userSelect: "none",
  KhtmlUserSelect: "none",
  WebkitUserSelect: "none",
  MozUserSelect: "none",
  MsUserSelect: "none",
});
const options = ref({
  dotSize: (0.5 + 2.5) / 2,
  minWidth: 3,
  maxWidth: 3,
  throttle: 16,
  minDistance: 5,
  backgroundColor: "rgba(0,0,0,0)",
  penColor: "black",
  velocityFilterWeight: 0.7,
  onBegin: (e: Event) => {
    // e.preventDefault();
  },
  onEnd: (e: any) => {
    // e.preventDefault();
  },
});
//答题提交和签名提交
async function submit() {
  //@ts-ignore
  const { isEmpty, data } = signaturePad.value.saveSignature();
  if (!data) {
    return showFailToast("请先签名");
  }

  show.value = false;
  let rs = {
    File: dataurl_to_file(data, "sign" + Date.now() + ".png"),
    URL: data,
  };
  try {
    showLoadingToast({
      mask: true,
    });
    let ds: any = await Upload.upload_file(
      <any>rs.File,
      <any>{
        what: "Sign",
        expire: false,
        acl: "read",
        onUploadProgress: (progressEvent: any) => {
          let uploadMessage = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100
          );
        },
      }
    );
    emit("success", ds.URL);
    reSign();
  } catch (error) {
    //@ts-ignore
    showFailToast(error.message);
  }
  // this.$emit("success", rs);
}
//签名回退
function reSign() {
  if (signaturePad.value) (<any>signaturePad.value).clearSignature();
}
function cancel() {
  show.value = false;
  emit("cancel");
}
</script>

<style lang="less">
.signature {
  position: relative;
  width: 95%;
  height: 95%;
  background-size: 100% 100%;
  background-image: url(https://f.tansuyun.cn/img/signbg.svg) !important;

  div {
    canvas {
      // -webkit-touch-callout: none;
      -webkit-touch-callout: none;
      /*系统默认菜单被禁用*/

      -webkit-user-select: none;
      /*webkit浏览器*/

      -khtml-user-select: none;
      /*早期浏览器*/

      -moz-user-select: none;
      /*火狐*/

      -ms-user-select: none;
      /*IE10*/

      user-select: none;
    }
  }
}

.posi {
  position: absolute;
  top: 50%;
  left: -42%;
  transform: rotate(90deg);
  width: 100%;

  button {
    text-align: center;
    width: 100%;
  }
}
</style>
