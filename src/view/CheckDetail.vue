<template>
  <van-row class="bg">
    <van-row align="center" class="title">
      <van-col @click="router.go(-1)" span="2">
        <van-icon name="arrow-left" size="16" />
      </van-col>
      <van-col>{{ Result.Name }}</van-col>
    </van-row>
    <van-row class="fff font12 block" align="center">
      <van-col offset="1" span="17">
        <van-row class="padding10">检查时间：{{ Result.CTime }}</van-row>
        <van-row class="padding10">签 字 人：{{ Result.Name }}</van-row>
      </van-col>
      <van-col span="6">
        <van-button
          color="#64A4FE"
          @click="down"
          class="font13"
          round
          size="small"
        >
          <van-icon name="down" size="14" />
          下载
        </van-button>
      </van-col>
    </van-row>
  </van-row>
  <van-row>
    <van-row class="block padding15">有隐患{{ Result.Unfix }}</van-row>
    <van-row
      v-for="(v, k) in List"
      :key="k"
      class="bottom_line block padding_10_15"
    >
      <van-row
        justify="space-between"
        :class="
          v.EImgs.length > 0
            ? 'bottom_line paddingbottom10 width100vw block marginbottom10'
            : 'block'
        "
      >
        <van-col :class="v.EImgs.length > 0 ? 'red' : ''">
          {{ k + 1 }}.{{ v.Name }}
        </van-col>
        <van-col>
          <van-icon
            size="1.2rem"
            :name="
              v.EImgs.length > 0
                ? 'https://f.tansuyun.cn/api/yan/2023-02-01/close-circle-filled.svg'
                : 'https://f.tansuyun.cn/api/yan/2023-02-01/check-circle-filled.svg'
            "
          />
        </van-col>
      </van-row>
      <van-row v-if="v.EMemo" class="box_red radius4 red block marginbottom10">
        <van-field
          v-model="v.EMemo"
          autosize
          type="textarea"
          disabled
        ></van-field>
      </van-row>
      <van-row v-if="v.EImgs" justify="space-between" class="block">
        <van-col>
          <template v-for="(d, i) in v.EImgs">
            <van-image
              :src="d"
              width="43"
              height="43"
              fit="fill"
              @click="imagePreview(v.EImgs, i)"
            ></van-image>
          </template>
        </van-col>
        <van-col span="5" v-if="v.EImgs.length > 0">
          <van-button
            color="#EFF4FC"
            size="small"
            class="rectify"
            @click="toRectify"
          >
            去整改>
          </van-button>
        </van-col>
      </van-row>
    </van-row>
  </van-row>
  <van-row class="box_gray margin15 font12">
    <van-row class="block" align="center">
      <van-col class="margin10 padding_4_6 backgroundgray" span="6">
        签名SVG
      </van-col>
      <van-col>{{ Result.CTime }}</van-col>
    </van-row>
    <van-row class="block">
      <van-col span="24">
        <van-image
          :width="Width"
          :height="Height"
          class="rotate"
          src="https://f.tansuyun.cn/api/yan/2023-02-03/sign1675386097561.png"
        ></van-image>
      </van-col>
    </van-row>
  </van-row>
  <van-row class="block enpty"></van-row>
  <van-row class="submit" @click="qr" align="center" justify="center">
    <van-button block color="#f2f2f2">
      <van-image :src="SignLogo" width="21" height="21"></van-image>
      <span>邀请签字</span>
    </van-button>
  </van-row>
</template>
<script setup lang="ts">
import { computed, defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { SearchResult } from '@ctsy/api-sdk'
import { SearchWhere } from '@ctsy/api-sdk/dist/lib'
import {
  EntityGetCheckRes,
  CheckApi,
  RootApi,
  EntitySubmitCheckReq,
  EntitySubmitCheckLog,
  EntitySigleCheckDetailRes,
  EntityUserInfoMap,
  EntitySign,
} from '../api/check'
import { useRoute, useRouter } from 'vue-router'
import { ImagePreview } from 'vant'
import { showQr } from '../api/lib'
const URL = 'https://f.tansuyun.cn/api/yan/'

const router = useRouter()
const route = useRoute()
const Result = ref(new EntitySigleCheckDetailRes())
const SignLogo = ref(`${URL}2023-02-01/signlogoactived.svg`)
const SignTextColor = ref('#1B6FFE')
const User = ref(new EntityUserInfoMap())
const Sign = ref(new EntitySign())
const List = computed(() => {
  return Result.value.Details
})
//下载
function down() {
  console.log('下载')
}
// 图片预览
function imagePreview(d: string[], n: number) {
  //@ts-ignore
  ImagePreview({
    images: d,
    startPosition: n,
  })
}
//去整改
function toRectify() {
  //todo 跳转至隐患，函数应该带有ID
  console.log('跳转至隐患详情')
  // router.push({
  //   path:'/Danger/Detail',
  //   params:{
  //     DID:0
  //   }
  // })
}

function qr() {
  showQr(Result.value.Name)
}

const Width = ref('')
const Height = ref('')
let mapUsers: EntityUserInfoMap[] = []
let mapSigns: EntitySign[] = []
onMounted(async () => {
  if (route.params.CheckID && route.params.CLID) {
    Result.value = await CheckApi.detailByCheckIDByCLID(
      Number(route.params.CheckID),
      Number(route.params.CLID),
    )
  }

  Result.value.Users.forEach((v) => {
    mapUsers[v.UID] = v
  })
  Result.value.Signs.forEach((v) => {
    mapSigns[v.UID] = v
  })
  setTimeout(() => {
    Width.value = (window.screen.width / 3).toFixed()
    Height.value = (window.screen.height / 3).toFixed()
  }, 200)
})
</script>
<style scoped lang="less">
.bg {
  width: 100vw;
  height: 120px;
  background-color: #1f7aff;
  .title {
    .fff();
    .block();
    padding: 10px 15px;
    font-size: 1rem;
  }
}

.fff {
  color: #fff;
}
.block {
  width: 100%;
}
.red {
  color: red;
}
.font12 {
  font-size: 12px;
}
.font14 {
  font-size: 13px;
}
.padding10 {
  padding: 10px;
}
.padding15 {
  padding: 15px;
}
.padding_10_15 {
  padding: 10px 15px;
}
.paddingbottom10 {
  padding-bottom: 10px;
}
.marginbottom10 {
  margin-bottom: 10px;
}
.width100vw {
  width: 100vw;
}
.submit {
  width: 100vw;
  position: fixed;
  text-align: center;
  bottom: 0;
  /deep/.van-button__text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: v-bind(SignTextColor);
  }
}
.block {
  width: 100%;
}
.bottom_line {
  border-bottom: 1px solid #e8e8e8;
}
.radius4 {
  border-radius: 4px;
}
.box_red {
  border: 1px solid red;
}
/deep/.van-field__control:disabled {
  -webkit-text-fill-color: red;
}
.rectify {
  /deep/.van-button__text {
    color: #1b6ffe;
  }
}
.enpty {
  height: 45px;
}
.positionrelative {
  position: relative;
}
.box_gray {
  border: 1px solid #cccccc;
}
.margin15 {
  margin: 15px;
}
.margin10 {
  margin: 10px;
}
.padding_4_6 {
  padding: 4px 6px;
}
.backgroundgray {
  background-color: #eeeeee;
  border-radius: 12px;
}
.rotate {
  transform: rotate(-90deg);
}
* {
  box-sizing: border-box;
}
</style>
