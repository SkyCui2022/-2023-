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
        <van-row class="padding10">检 查 人：{{ Result.Name }}</van-row>
      </van-col>
      <van-col span="6">
        <van-button color="#64A4FE" @click="down" class="font13" round size="small">
          <van-icon name="down" size="14" />
          下载
        </van-button>
      </van-col>
    </van-row>
  </van-row>
  <van-row>
    <van-row class="block padding15" v-if:show="Result.Unfix">有隐患{{ Result.Unfix }}</van-row>
    <Detail :ModelValue="List" @toRectify="toRectify"></Detail>
  </van-row>
  <van-row class="box_gray margin15 font12">
    <template v-for="(v, k) in Result.Signs" :key="k">
      <van-row class="block" align="center">
        <van-col class="margin10 padding_4_6 backgroundgray" span="6">
          {{ yStore.UserMap[v.UID].Name }}
        </van-col>
        <van-col>{{ format_date(v.CTime) }}</van-col>
      </van-row>
      <van-row class="block">
        <van-col span="24">
          <van-image :width="Width" :height="Height" class="rotate" :src="v.Sign"></van-image>
        </van-col>
      </van-row>
    </template>
  </van-row>
  <van-row class="block enpty"></van-row>
  <van-row class="submit" @click="qr" align="center" justify="center">
    <van-button block color="#f2f2f2">
      <i class="iconfont icon-shouxieqianming"></i>
      <span>邀请签字</span>
    </van-button>
  </van-row>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { CheckApi, EntitySigleCheckDetailRes, URL } from '../../api/check'
import Detail from './component/Detail.vue'
import { useRoute, useRouter } from 'vue-router'
import { showQr, wait } from '../../api/lib'
import { format_date } from '@ctsy/common'
import get_yan_stroe from '../../store/yan'

const yStore = get_yan_stroe()
const router = useRouter()
const route = useRoute()
const Result = ref(new EntitySigleCheckDetailRes())
const SignTextColor = ref('#1B6FFE')
const List = computed(() => {
  return Result.value.Details
})
//下载
function down() {
  console.log('下载')
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
//邀请签字，显示二维码
function qr() {
  showQr(Result.value.Name)
}

const Width = ref('')
const Height = ref('')
onMounted(async () => {
  if (route.params.CheckID && route.params.CLID) {
    Result.value = await wait(
      CheckApi.detailByCheckIDByCLID(
        Number(route.params.CheckID),
        Number(route.params.CLID),
      ),
    )
    Result.value.Signs.forEach((v) => yStore.getUserInfo(v.UID))
  }
  setTimeout(() => {
    Width.value = (window.screen.width / 8).toFixed()
    Height.value = (window.screen.height / 8).toFixed()
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
}</style>
