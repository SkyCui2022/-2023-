<template>
  <van-row class="bg">
    <van-col span="22" offset="1">
      <GoBack :Name="'安全活动'"></GoBack>
      <van-row class="block bottom">
        <van-col
          class="backwhite padding_10_12 margintop15 borderradius_50"
          span="22"
        >
          <van-row
            @click="toLog(0)"
            align="center"
            justify="space-between"
            class=""
          >
            <van-col class="flexcenter">
              <div class="size45 inlineblock backblue borderradius50">
                <i
                  class="yan5 yan5-anquanhuodong_huiyi size37 lineheight45 blue"
                ></i>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="font17 weight500 black"
                >安&nbsp;全&nbsp;会&nbsp;议</span
              >
            </van-col>
            <van-col @click.stop="create(0)" class="paddingright5">
              <i class="yan5 yan5-anquanhuodong_chuangjianhuodong size30"></i>
            </van-col>
          </van-row>
        </van-col>
        <van-col
          class="backwhite padding_10_12 margintop15 borderradius_50"
          span="22"
        >
          <van-row
            @click="toLog(1)"
            align="center"
            justify="space-between"
            class=""
          >
            <van-col class="flexcenter">
              <div class="size45 inlineblock backgreen borderradius50">
                <i
                  class="yan5 yan5-anquanhuodong_xianxiapeixun size37 lineheight45 green"
                ></i>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="font17 weight500 black"
                >线&nbsp;下&nbsp;培&nbsp;训</span
              >
            </van-col>
            <van-col @click.stop="create(1)" class="paddingright5">
              <i class="yan5 yan5-anquanhuodong_chuangjianhuodong size30"></i>
            </van-col>
          </van-row>
        </van-col>
        <van-col
          class="backwhite padding_10_12 margintop15 borderradius_50"
          span="22"
        >
          <van-row
            @click="toLog(2)"
            align="center"
            justify="space-between"
            class=""
          >
            <van-col class="flexcenter">
              <div class="size45 inlineblock backred borderradius50">
                <i
                  class="yan5 yan5-anquanhuodong_yanlian size37 lineheight45 red"
                ></i>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="font17 weight500 black"
                >应&nbsp;急&nbsp;演&nbsp;练</span
              >
            </van-col>
            <van-col @click.stop="create(2)" class="paddingright5">
              <i class="yan5 yan5-anquanhuodong_chuangjianhuodong size30"></i>
            </van-col>
          </van-row>
        </van-col>
        <van-col
          class="backwhite padding_10_12 margintop15 borderradius_50 margingbottom30"
          span="22"
        >
          <van-row
            @click="toLog(3)"
            align="center"
            justify="space-between"
            class=""
          >
            <van-col class="flexcenter">
              <div class="size45 inlineblock backorange borderradius50">
                <i
                  class="yan5 yan5-anquanhuodong_huodong size37 lineheight45 orange"
                ></i>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;<span class="font17 weight500 black"
                >其&nbsp;他&nbsp;活&nbsp;动</span
              >
            </van-col>
            <van-col @click.stop="create(3)" class="paddingright5">
              <i class="yan5 yan5-anquanhuodong_chuangjianhuodong size30"></i>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import GoBack from "../component/GoBack.vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../store";

const yStore = useStore();
const router = useRouter();
const route = useRoute();
const create = (n: number) => {
  router.push({
    path: `/create/${EID.value}/${n}`,
  });
};
const toLog = (n: number) => {
  router.push({
    path: `/logs/${EID.value}/${n}`,
  });
};

const EID = ref(0);
onMounted(() => {
  EID.value = Number(route.params.EID);
});
</script>
<style scoped lang="less">
.bg {
  width: 100vw;
  height: 100vh;
  background: #007aff
    url("https://f.tansuyun.cn/api/yan/2023-03-24/安全活动图3.png") 0 0
    no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  position: relative;
}

.bottom {
  position: absolute;
  bottom: 0;
}

.backwhite {
  background: white;
}
</style>
