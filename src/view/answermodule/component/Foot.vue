<template>
  <van-row class="foot">
    <van-row class="block">
      <van-col @click.stop="show" span="5" class="font14 spacing3 blue">
        <i class="yan5 yan5-anquanpeixuntubiao_timuzhiyin"></i>
        &nbsp;
        <span class="blue">
          <i class="yan5 yan-xuanxiang"></i>
          {{ props.Active + 1 }}
        </span>
        / <span class="font12">{{ props.QusetionsLen }}</span>
      </van-col>
      <van-col
        @click="props.Status ? again() : submit()"
        span="5"
        class="font15 spacing3 full"
      >
        {{ props.Status ? "再考一次" : "交卷" }}
      </van-col>
      <van-col span="13">
        <van-row>
          <van-col
            @click="up"
            span="12"
            :class="Active ? 'back_blue white font15 up' : 'gay  font15 up'"
          >
            <span class="f2"><van-icon name="arrow-left" /> 上一题</span>
          </van-col>
          <van-col @click="next" span="12" class="back_blue white font15 next">
            {{ Type.length || Active + 1 !== QusetionsLen ? "下一题" : "交卷" }}
            <van-icon name="arrow" />
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </van-row>
</template>
<script setup lang="ts">
interface Props {
  ModelValue: boolean;
  Active: number;
  QusetionsLen: number;
  Status: number;
  UnAnswerd: number;
  Type: string;
}

const props = withDefaults(defineProps<Props>(), {
  ModelValue: false,
  Active: 0,
  QuestionsLen: 0,
  Status: 0,
  UnAnswerd: 0,
  Type: "",
});

const emits = defineEmits(["show", "submit", "next", "up", "again"]);

function show() {
  emits("show");
}
function submit() {
  emits("submit");
}
function next() {
  emits("next");
}
function up() {
  emits("up");
}
function again() {
  emits("again");
}
</script>
<style scoped lang="less">
.gay {
  background-color: #ccc;
}
.f2 {
  color: #f2f2f2;
}
</style>
