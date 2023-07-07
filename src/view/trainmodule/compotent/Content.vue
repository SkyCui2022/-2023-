<template>
  <van-row class="block content">
    <van-col :span="24">
      <div v-if="Type < 3">
        <div v-html="Content"></div>
      </div>
      <div v-else-if="Type == 3">
        <div id="video"></div>
      </div>
      <div v-else-if="Type == 4">暂不支持富文本</div>
      <div v-else-if="Type == 5">暂不支持MarkDown</div>
      <!-- <div v-else-if="Type == 6">暂不支持Word预览</div>
      <div v-else-if="Type == 7">暂不支持PDF预览</div> -->
      <div v-else-if="[6, 7, 8].includes(Type)">
        <!-- 多图 -->
        <van-row>
          <van-col span="22" offset="1" v-for="(v, p) in ImgURLs">
            <van-image :src="v" @click="showImagePreview(ImgURLs, p)"></van-image>
          </van-col>
        </van-row>
      </div>
      <div v-else>
        <div>{{ Content }}</div>
      </div>
    </van-col>
  </van-row>
</template>

<script setup lang="ts">
import { watch, ref, nextTick, onMounted } from "vue";
import { showImagePreview } from "vant";
import { delay_cb } from "@ctsy/common";

// 引入组件

const Props = defineProps({
  Type: { type: Number, default: 0 },
  Content: { type: [Array<String>, String], default: "" || [""] },
});

const ImgURLs = ref([] as string[]);

const Content = ref("");

watch(
  () => Props.Type,
  () => {
    init();
  }
);

const VideoURL = ref("");

var player: any;

function play() {
  if (player) {
    player.destroy();
  }
  nextTick(() => {
    //@ts-ignore
    player = new Player({
      id: "video",
      url: VideoURL.value,
      width: "100%",
    });
  });
}

function init() {
  switch (Props.Type) {
    case 0:
      //@ts-ignore
      Content.value = Props.Content;
      break;
    case 1:
      //@ts-ignore
      Content.value = Props.Content;
      break;
    case 3:
      //@ts-ignore
      VideoURL.value = Props.Content;
      if (VideoURL.value.startsWith("http")) {
        play();
      }
      break;
    case 8:
    case 6:
    case 7:
      try {
        if ("string" == typeof Props.Content) {
          ImgURLs.value = JSON.parse(Props.Content || "[]");
          if (!(ImgURLs.value instanceof Array)) {
            ImgURLs.value = [];
          }
        } else if (Props.Content instanceof Array) {
          ImgURLs.value = Props.Content;
        }
      } catch (error) { }
      break;
  }
}
onMounted(() => {
  nextTick(() => {
    init();
  });
  Props.Type == 0
    ? delay_cb("nextTick", 500, () => {
      init();
    })
    : true;
});
</script>

<style lang="less" scoped>
.content {
  max-width: 100%;
  overflow-x: scroll;
}

/deep/img {
  max-width: 100% !important;
}
</style>
