<template>
  <van-row class="bg">
    <van-row align="center" class="title">
      <van-col @click="router.go(-1)" span="2">
        <van-icon name="arrow-left" size="16" />
      </van-col>
      <van-col class="title">{{ Result.Name }}</van-col>
    </van-row>
    <van-row align="center" justify="space-around" class="block">
      <template v-for="(v, k) in ButtonGroups" :key="k">
        <ButtonGroup :ModelValue="v" @click="click"></ButtonGroup>
      </template>
    </van-row>
    <van-row class="box">
      <template v-if="Logs">
        <van-row v-for="(v, k) in Logs" :key="k" class="block padding15 logheight" align="center" justify="space-between">
          <van-col>
            <van-row class="margin5">
              {{ k == 0 ? '上次检查' : '检查人' }}：{{
                yStore.UserMap[v.CUID].Name || '暂无数据'
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
          <van-col v-if="k == 0" @click="change_height(Logs)">
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
            <i :class="`iconfont icon-${props.checked
              ? 'zhengqve font18 green'
              : 'weixuanzhong font16 gray'
              }`"></i>
          </template>
        </van-radio>
      </van-radio-group>
    </van-row>
    <van-row class="block">
      <van-row class="block padding10_bottom" v-for="(v, k) in SubmitCheck.Items" :key="k">
        <van-col class="left" span="20">
          {{ k + 1 }}.{{ mapItem[v.CIID] }}
        </van-col>
        <van-col span="4">
          <i @click="radio(k, 0)" :class="`iconfont icon-${v.Result == 0 ? 'zhengqve green font18' : 'dui gray font18'
            }`"></i>
          &nbsp;
          <i @click="radio(k, 1)" :class="`iconfont icon-${v.Result == 1 ? 'cuowu red font18' : 'cuo gray font18'
            }`"></i>
        </van-col>
        <van-row class="block" v-if="v.Result == 1">
          <van-form class="block">
            <van-cell-group>
              <van-field type="textarea" rows="2" v-model="v.Memo" placeholder="请对不符合项进行描述"></van-field>
            </van-cell-group>
          </van-form>
          <van-row gutter="5" justify="space-between" align="center" class="block">
            <van-col class="flex_start">
              <template v-for="(d, i) in v.Imgs">
                <van-col class="position">
                  <van-image :src="d" width="43" height="43" fit="fill" @click="
                    ImagePreview({
                      images: v.Imgs,
                      startPosition: i,
                    })
                  "></van-image>
                  <van-row class="clear" @click="clear(v.Imgs, i)" v-if="!RectifyList.includes(v.CIID)">
                    <van-icon name="clear" />
                  </van-row>
                </van-col>
              </template>
              <van-col @click="upload(v.Imgs)">
                <van-icon name="photograph" size="43" />
              </van-col>
            </van-col>
            <van-col v-if="RectifyList.includes(v.CIID)">
              <van-button color="#EFF4FC" size="small" class="rectify" @click="to_rectify">
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
      <i class="iconfont icon-shouxieqianming"></i>
      <span>签字提交</span>
    </van-button>
  </van-row>
  <Sign v-model="ShowSign" @success="success" :Name="yStore.User.Name"></Sign>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  RootApi,
  EntitySubmitCheckLog,
  CheckID,
  EntityGetCheckRes,
} from '../api/check'
import { Toast, ImagePreview } from 'vant'
import Sign from '../component/Sign.vue'
import { store } from '@ctsy/common'
import get_yan_store from '../store/yan'
import ButtonGroup from '../component/ButtonGroup.vue'
import { wait } from '../api/lib'
import useRadio from '../hooks/RadioGroup'
import useCheckLog from '../hooks/CheckLog'
import useGroup from '../hooks/ButtonGroup'
import useImage from '../hooks/Image'
import useRectify from '../hooks/Rectify'
import useSign from '../hooks/Sign'

const yStore = get_yan_store()
const router = useRouter()
const Logs = computed(() => {
  return Result.value.Logs
})
//按钮组
const { ButtonGroups, click, to_create_danger } = useGroup()

//检查记录逻辑
const { Unfold, LogHeight, logHeight, change_height } = useCheckLog()

//全选，单选逻辑
const { AllRight, SignTextColor, SubmitCheck, all_right, radio } = useRadio()

// 有隐患的情况下，图片处理
const { upload, clear } = useImage()

//去整改
const { RectifyList, to_rectify } = useRectify()

// 提交检查结果逻辑
function submit() {
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
}

//签字及保存检查结果逻辑
const { ShowSign, success } = useSign(SubmitCheck.value)

const Result = ref(new EntityGetCheckRes())
let mapItem: { [index: string]: any } = {}
const MarginTopList = ref('0px')
const MarginTop = ref('0px')
onMounted(async () => {
  Result.value = await wait(RootApi.Check(CheckID), '数据加载中，请稍后')
  Result.value.Logs.forEach((v) => yStore.getUserInfo(v.CUID))
  store.set('CheckObj', Result.value)
  SubmitCheck.value.CheckID = Result.value.CheckID
  for (let i of Result.value.Items) {
    let items = new EntitySubmitCheckLog()
    items.CIID = i.CIID
    items.Result = 999
    SubmitCheck.value.Items.push(items)
    mapItem[`${i.CIID}`] = i.Name
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
  setTimeout(() => {
    //@ts-ignore
    logHeight.value = document.querySelector('.logheight')?.offsetHeight
    LogHeight.value = `${logHeight.value}px`
    MarginTop.value = `${logHeight.value / 3}px`
    MarginTopList.value = `${logHeight.value / 3 + 10}px`
  }, 200)
})
</script>
<style scoped lang="less">
.red {
  color: red;
}

.green {
  color: #32c846;
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

.font16 {
  font-size: 16px;
}

.font18 {
  font-size: 18px;
}

.white {
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
    .white();
    padding: 10px 15px;
    font-size: 1rem;
  }

  .box {
    width: 90vw;
    border-radius: 10px;
    background-color: #fff;
    margin: 0 auto;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    font-size: 12px;
    height: v-bind(LogHeight);
    max-height: 350px;
    margin-top: v-bind(MarginTop);
    overflow: auto;
    z-index: 1;
  }
}

//隐藏滚轮
::-webkit-scrollbar {
  display: none;
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

.flex_start {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
