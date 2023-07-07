<template>
  <van-col span="22" offset="1">
    <span class="font14 bold">
      &nbsp;{{ props.k + 1 }}.&nbsp;&nbsp;{{ props.v.Name }}
    </span>
    &nbsp; ({{ v.Score }}分) &nbsp;
    <van-tag plain type="primary">
      {{ props.Type }}
    </van-tag>
  </van-col>
  <template v-if="props.v.Type == 0">
    <van-col span="24" class="relatives">
      <van-col
        class="font14 margin_18_top flexs"
        span="22"
        offset="1"
        v-for="(item, index) in props.v.Items"
        :key="index"
      >
        <i
          :class="`yan5 yan5-${
            props.AnswerList[props.k].PIIDs.includes(item.PIID)
              ? item.Right || item.Score
                ? 'anquanpeixuntubiao_xuanze-yuan font20 green'
                : 'tubiaoheji_butongguo font20 red'
              : 'weixuanzhong1 font20 gray'
          }`"
        ></i>
        &nbsp;<span class="font13">{{ item.Name }}</span>
      </van-col>
      <van-col>
        <i
          :class="
          Err.some((i:any)=>i.PQID==v.PQID)?'yan5 yan5-timupanduan_cuowu red size131 fiexd': 'yan5 yan5-timupanduan_zhengque green size131 fiexd'
        "
        ></i>
      </van-col>
    </van-col>
  </template>
  <template v-if="props.v.Type == 1">
    <van-col span="24" class="relatives">
      <van-col
        class="font14 margin_18_top flexs"
        span="22"
        offset="1"
        v-for="(item, index) in props.v.Items"
        :key="index"
      >
        <i
          :class="`yan5 yan5-${
            props.AnswerList[props.k].PIIDs.includes(item.PIID)
              ? item.Right || item.Score
                ? 'anquanpeixuntubiao_xuanze-yuan font20 green'
                : 'tubiaoheji_butongguo font20 red'
              : 'weixuanzhong1 font20 gray'
          }`"
        ></i>

        &nbsp;<span class="font13">{{ item.Name }}</span>
      </van-col>
      <van-col>
        <i
          :class="
          Err.some((i:any)=>i.PQID==v.PQID)?'yan5 yan5-timupanduan_cuowu red size131 fiexd': 'yan5 yan5-timupanduan_zhengque green size131 fiexd'
        "
        ></i>
      </van-col>
    </van-col>
  </template>
  <template v-if="props.v.Type == 2">
    <van-col span="24" class="relatives">
      <van-col
        class="font14 margin_18_top flexs"
        span="22"
        offset="1"
        v-for="(item, index) in props.v.Items"
        :key="index"
      >
        <i
          :class="`yan5 yan5-${
            props.AnswerList[props.k].PIIDs.includes(item.PIID)
              ? item.Right || item.Score
                ? 'anquanpeixuntubiao_xuanze-yuan font20 green'
                : 'tubiaoheji_butongguo font20 red'
              : 'weixuanzhong1 font20 gray'
          }`"
        ></i>

        &nbsp;<span class="font13">{{ item.Name }} </span>
      </van-col>
      <van-col>
        <i
          :class="
          Err.some((i:any)=>i.PQID==v.PQID)?'yan5 yan5-timupanduan_cuowu red size131 fiexd': 'yan5 yan5-timupanduan_zhengque green size131 fiexd'
        "
        ></i>
      </van-col>
    </van-col>
  </template>
  <template v-if="v.Type == 3">
    <van-col span="22" offset="1">
      {{ props.AnswerList[props.k].Answer }}
    </van-col>
  </template>
  <van-row class="block margin_18_top">
    <van-col span="22" offset="1" class="back_gray blue padding_6_9 font14">
      正确答案：
      <template v-for="(d, i) in props.v.Items" :key="i">
        <div class="font12 left">
          {{ d.Right == 1 || d.Score ? `${d.Name};` : "" }}
        </div>
      </template>
    </van-col>
  </van-row>
  <van-row class="margin_18_top block" v-if="props.v.Memo">
    <van-col span="22" offset="1" class="padding_6_9 font14">
      考题解析：
      <van-col>{{ props.v.Memo }}</van-col>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { array_key_set } from "@ctsy/common";
import { EntityPaperQuestion } from "@yakj/sdk/sdk/sdk";
import { onMounted, ref } from "vue";
import { store } from "@ctsy/common";

const Err = ref([] as any);

interface Props {
  v: EntityPaperQuestion;
  k: number;
  Type: string;
  AnswerList: { [index: string]: any }[];
}
const props = withDefaults(defineProps<Props>(), {
  v: () => {
    return new EntityPaperQuestion();
  },
  k: 0,
  Type: "",
  AnswerList: () => [],
});
onMounted(() => {
  if (store.get("err")) {
    Err.value = store.get("err");
  }
});
</script>
<style scoped lang="less">
.size131 {
  font-size: 131px;
}
.fiexd {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0.3;
}
.relatives {
  position: relative;
}
.flexs {
  display: flex;
}
</style>
