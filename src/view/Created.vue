<template>
  <van-row class="bg">
    <van-row align="center" class="title">
      <van-col @click="router.go(-1)" span="2">
        <van-icon name="arrow-left" size="16" />
      </van-col>
      <van-col class="title">{{ Title }}</van-col>
    </van-row>
    <van-row align="center" justify="space-around" class="block margintop15">
      <van-col class="flex_dir" span="8" @click="to_danger_list">
        <van-image
          width="37"
          height="37"
          src="https://f.tansuyun.cn/api/yan/2023-02-01/setdanger.svg"
        ></van-image>
        <van-row class="font12 fff margintop5">整改隐患</van-row>
      </van-col>
      <van-col class="flex_dir" span="8" @click="to_create_danger">
        <van-image
          width="37"
          height="37"
          src="https://f.tansuyun.cn/api/yan/2023-02-01/otherdanger.svg"
        ></van-image>
        <van-row class="font12 fff margintop5">其他隐患</van-row>
      </van-col>
      <van-col class="flex_dir" span="8" @click="to_check_logs">
        <van-image
          width="37"
          height="37"
          src="https://f.tansuyun.cn/api/yan/2023-02-01/checklog.svg"
        ></van-image>
        <van-row class="font12 fff margintop5">检查统计</van-row>
      </van-col>
    </van-row>
    <van-row class="box">
      <template v-if="Logs">
        <van-row
          v-for="(v, k) in Logs"
          :key="k"
          class="block padding15 logheight"
          align="center"
          justify="space-between"
        >
          <van-col>
            <van-row class="margin5">
              {{ k == 0 ? '上次检查' : '检查人' }}：{{
                v.CUID ? userMap[`${v.CUID}`] : '暂无数据'
              }}
            </van-row>
            <van-row gutter="20" class="margintop5">
              <van-col>{{ v.CTime }}</van-col>
              <van-col v-if="v.Details.length > 0">
                有隐患{{ v.Details.length }}
              </van-col>
              <van-col class="blue" v-if="v.Details.length > 0">
                已整改{{ v.Fixed }}
              </van-col>
            </van-row>
          </van-col>
          <van-col v-if="k == 0" @click="change_height">
            {{ Unfold ? '收起' : '更多' }}
            <van-icon :name="Unfold ? 'arrow-up' : 'arrow-down'" />
          </van-col>
        </van-row>
      </template>
      <template v-else><strong>暂无检查记录</strong></template>
    </van-row>
  </van-row>
  <van-row class="list padding15">
    <van-row class="padding_bottom_10 block">
      <van-radio-group v-model="AllRight">
        <van-radio name="0" @click="all_right">
          全部符合
          <template #icon="props">
            <img
              width="16"
              height="16"
              :src="
                props.checked
                  ? 'https://f.tansuyun.cn/api/yan/2023-02-01/alltrue.svg'
                  : 'https://f.tansuyun.cn/api/yan/2023-02-01/unalltrue.svg'
              "
            />
          </template>
        </van-radio>
      </van-radio-group>
    </van-row>
    <van-row class="block">
      <van-row
        class="block padding10_bottom"
        v-for="(v, k) in SubmitCheck.Items"
        :key="k"
      >
        <van-col class="left" span="20">{{ k + 1 }}.{{ map[v.CIID] }}</van-col>
        <van-col span="4">
          <van-icon
            size="1.2rem"
            :name="
              v.Result == 0
                ? 'https://f.tansuyun.cn/api/yan/2023-02-01/check-circle-filled.svg'
                : 'https://f.tansuyun.cn/api/yan/2023-02-01/check-circle.svg'
            "
            @click="radio(k, 0)"
          />
          &nbsp;
          <van-icon
            size="1.2rem"
            :name="
              v.Result == 1
                ? 'https://f.tansuyun.cn/api/yan/2023-02-01/close-circle-filled.svg'
                : 'https://f.tansuyun.cn/api/yan/2023-02-01/close-circle.svg'
            "
            @click="radio(k, 1)"
          />
        </van-col>
        <van-row class="block" v-if="v.Result == 1">
          <van-form class="block">
            <van-cell-group>
              <van-field
                type="textarea"
                rows="2"
                v-model="v.Memo"
                placeholder="请对不符合项进行描述"
              ></van-field>
            </van-cell-group>
          </van-form>
          <van-row
            gutter="5"
            justify="space-between"
            align="center"
            class="block"
          >
            <template v-for="(d, i) in v.Imgs">
              <van-col class="position">
                <van-image
                  :src="d"
                  width="43"
                  height="43"
                  fit="fill"
                  @click="show_image(v.Imgs, i)"
                ></van-image>
                <van-row
                  class="clear"
                  @click="clear(v.Imgs, i)"
                  v-if="!RectifyList.includes(v.CIID)"
                >
                  <van-icon name="clear" />
                </van-row>
              </van-col>
            </template>

            <van-col @click="upload(k)">
              <van-icon name="photograph" size="43" />
            </van-col>
            <van-col v-if="RectifyList.includes(v.CIID)">
              <van-button
                color="#EFF4FC"
                size="small"
                class="rectify"
                @click="to_rectify"
              >
                去整改>
              </van-button>
            </van-col>
          </van-row>
        </van-row>
      </van-row>
    </van-row>
    <van-row class="other" @click="to_create_danger">其 他 更 多 ></van-row>
  </van-row>
  <van-row class="enpty"></van-row>
  <van-row class="submit" @click="submit" align="center" justify="center">
    <van-button block color="#f2f2f2">
      <van-image :src="SignLogo" width="21" height="21"></van-image>
      <span>签字提交</span>
    </van-button>
  </van-row>
  <Sign v-model="ShowSign" @success="success" :Name="store.Nick"></Sign>
</template>
<script setup lang="ts">
import { computed, defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { SearchResult } from '@ctsy/api-sdk'
import { SearchWhere } from '@ctsy/api-sdk/dist/lib'
import { useRouter } from 'vue-router'
import {
  EntityGetCheckRes,
  CheckApi,
  RootApi,
  EntitySubmitCheckReq,
  EntitySubmitCheckLog,
} from '../api/check'
import UploadApi from '@ctsy/api-sdk/dist/modules/Upload'
import { showFailToast, showImagePreview, Toast, ImagePreview } from 'vant'
import Sign from '../component/Sign.vue'
import { useStore } from '../store'
const URL = 'https://f.tansuyun.cn/api/yan/'

const store = useStore()
const router = useRouter()
const Result = ref(new EntityGetCheckRes())
const SubmitCheck = ref(new EntitySubmitCheckReq())
const Logs = computed(() => {
  return Result.value.Logs
})
const Title = ref('检查表名称')
function to_danger_list() {
  //TODO 跳转至隐患列表
  console.log('跳转至隐患列表')
  // router.push('javascript:;')
}
function to_create_danger() {
  //TODO 跳转至创建隐患
  console.log('跳转至创建隐患')
  // router.push('javascript:;')
}
function to_check_logs() {
  //TODO 跳转至检查统计
  console.log('跳转至检查统计')
  // router.push('javascript:;')
}
//检查记录逻辑
const Unfold = ref(false)
const LogHeight = ref('0px')
const MarginTop = ref('0px')
let rs = 0
function change_height() {
  Unfold.value = !Unfold.value
  let height = Number(LogHeight.value.replace('px', ''))
  if (height == rs) {
    LogHeight.value = `${rs * Logs.value.length}px`
  } else {
    LogHeight.value = `${rs}px`
  }
}

// 全选
const AllRight = ref('')
const MarginTopList = ref('0px')
function all_right() {
  SubmitCheck.value.Items.map((v) => {
    return (v.Result = 0)
  })
  SignTextColor.value = '#1B6FFE'
  SignLogo.value = `${URL}2023-02-01/signlogoactived.svg`
}
// 选项单选
function radio(obj: any, num: number) {
  SubmitCheck.value.Items[obj].Result = num
  if (SubmitCheck.value.Items.some((v) => v.Result == 1)) {
    AllRight.value = ''
    SignTextColor.value = '#b3bdcc'
    SignLogo.value = `${URL}2023-02-01/signlogo.svg`
  }
  if (SubmitCheck.value.Items.every((v) => v.Result == 0)) {
    AllRight.value = '0'
  }
  if (SubmitCheck.value.Items.every((v) => v.Result !== 999)) {
    SignTextColor.value = '#1B6FFE'
    SignLogo.value = `${URL}2023-02-01/signlogoactived.svg`
  }
}
// 图片上传
async function upload(num: number) {
  try {
    let file = await UploadApi.select_upload('file', '.png,.gif,.jpg')
    //@ts-ignore
    SubmitCheck.value.Items[num].Imgs.push(file.URL || file.url)
    Toast.loading({
      message: '数据加载中，请稍后...',
      forbidClick: true,
      duration: 0,
    })
  } catch (error) {
    Toast.fail(`${error}`)
  } finally {
    Toast.clear()
  }
}
// 图片预览
function show_image(d: string[], n: number) {
  //@ts-ignore
  ImagePreview({
    images: d,
    startPosition: n,
  })
}
// 删除图片
function clear(imgs: string[], num: number) {
  imgs.splice(num, 1)
}

//去整改
const RectifyList = ref([] as number[])
function to_rectify() {
  //todo 跳转至隐患，函数应该带有ID
  console.log('跳转至隐患详情')
  // router.push({
  //   path:'/Danger/Detail',
  //   params:{
  //     DID:0
  //   }
  // })
}
// 提交检查结果逻辑
async function submit() {
  try {
    if (SubmitCheck.value.Items.some((v) => v.Result == 999)) {
      Toast.fail('请按要求检查完整')
    } else if (
      SubmitCheck.value.Items.some((v) => v.Result == 1 && v.Imgs.length == 0)
    ) {
      Toast.fail('不符合项必须添加图片')
    } else if (
      SubmitCheck.value.Items.some((v) => v.Result == 1 && v.Memo == '')
    ) {
      Toast.fail('不符合项必须添加文本')
    } else {
      ShowSign.value = true
    }
  } catch (error) {
    Toast.fail(`${error}`)
  }
}
//签字及保存检查结果逻辑
const SignLogo = ref(`${URL}2023-02-01/signlogo.svg`)
const SignTextColor = ref('#b3bdcc')
const ShowSign = ref(false)
async function success(URL: string) {
  Toast.loading({
    message: '数据加载中，请稍后...',
    forbidClick: true,
    duration: 0,
  })
  SubmitCheck.value.Sign = URL
  try {
    let rs = await CheckApi.submit(SubmitCheck.value)
    Toast.success('保存成功')
    router.push(`/check/detail/${Result.value.CheckID}/${rs.CLID}`)
  } catch (error) {
    Toast.fail(`${error}`)
  } finally {
    Toast.clear()
  }
}

let map: { [index: string]: any } = {}
let userMap: { [index: string]: any } = {}
onMounted(async () => {
  try {
    Result.value = await RootApi.Check(4)
  } catch (error) {
    Toast.fail(`${error}`)
  }
  localStorage.setItem('CheckObj', JSON.stringify(Result.value))
  SubmitCheck.value.CheckID = Result.value.CheckID
  for (let i of Result.value.Items) {
    let items = new EntitySubmitCheckLog()
    items.CIID = i.CIID
    items.Result = 999
    SubmitCheck.value.Items.push(items)
    map[`${i.CIID}`] = i.Name
  }
  if (Result.value.Logs.length > 0) {
    for (let i of Result.value.Logs[0].Details) {
      SubmitCheck.value.Items.forEach((v, k) => {
        if (v.CIID == i.CIID && i.Result == 1) {
          v.Imgs = i.Imgs
          v.Memo = i.Memo
          v.Result = i.Result
          RectifyList.value.push(i.CIID)
        }
      })
    }
  }
  for (let i of Result.value.Users) {
    userMap[`${i.UID}`] = { Name: i.Name, Url: i.Avatar, Sex: i.Sex }
  }
  Title.value = Result.value.Name
  setTimeout(() => {
    //@ts-ignore
    rs = document.querySelector('.logheight')?.offsetHeight
    LogHeight.value = `${rs}px`
    MarginTop.value = `${rs / 3}px`
    MarginTopList.value = `${rs / 3 + 10}px`
  }, 200)
})
</script>
<style scoped lang="less">
.red {
  color: red;
}
.green {
  color: green;
}
.flex_dir {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
.block {
  width: 100%;
}
.left {
  text-align: left;
}
.position {
  position: relative;
}
.clear {
  position: absolute;
  top: 0;
  right: 0;
}
.font12 {
  font-size: 12px;
}
.fff {
  color: #fff;
}

.margintop5 {
  margin-top: 5px;
}
.margintop15 {
  margin-top: 15px;
}
.blue {
  color: #1b6ffe;
}
.padding15 {
  padding: 15px;
}
.bg {
  width: 100vw;
  height: 180px;
  background-color: #1f7aff;
  .title {
    .fff();
    .block();
    padding: 15px;
    font-size: 1rem;
  }
  .box {
    width: 90vw;
    border-radius: 10px;
    background-color: #fff;
    margin: 0 auto;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    font-size: 12px;
    max-height: v-bind(LogHeight);
    margin-top: v-bind(MarginTop);
    overflow: hidden;
    z-index: 1;
  }
}
.list {
  margin-top: v-bind(MarginTopList);
}
.padding_bottom_10 {
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}
.padding10_bottom {
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
}
.other {
  font-size: 15px;
  color: #1b6ffe;
  padding: 10px;
}
.enpty {
  width: 100vw;
  height: 50px;
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
.rectify {
  /deep/.van-button__text {
    color: #1b6ffe;
  }
}
</style>
