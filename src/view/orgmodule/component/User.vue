<template>
  <van-row class="block">
    <van-col span="22" offset="1">
      <van-row
        class="margin_10_0 small_white padding12"
        align="center"
        justify="space-between"
      >
        <van-col>
          <van-row align="center">
            <van-col>
              <van-row class="avatar">
                <van-col
                  span="24"
                  v-if="yStore.UserMap[ModelValue.UID]?.Avatar.length"
                >
                  <van-image
                    :src="yStore.UserMap[ModelValue.UID]?.Avatar"
                  ></van-image>
                </van-col>
                <van-col span="24" class="bc1b6fff" v-else>
                  <strong class="fcffffff">
                    {{
                      yStore.UserMap[ModelValue.UID]?.Name.slice(
                        yStore.UserMap[ModelValue.UID]?.Name.length - 2
                      )
                    }}
                  </strong>
                </van-col>
              </van-row>
            </van-col>
            <van-col class="margin10left">
              <van-row class="block"
                ><strong class="font14 black"
                  ><span>{{ K + 1 }}.</span>&nbsp;{{ ModelValue.Name }}</strong
                >
                &nbsp;
                <i
                  :class="`flex yan5 ${
                    ModelValue.Sex
                      ? 'yan5-jianchabiao-_nan-xianxing blue size12'
                      : 'yan5-jianchabiao-_nv-xianxing red size12'
                  }`"
                ></i
                >&nbsp;
              </van-row>
              <van-row class="block garys"
                >岗位：{{ OrgMap[ModelValue.PostID]?.Name }}</van-row
              >
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-col>
  </van-row>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useStore } from "../store";
import { store } from "@ctsy/common";
import DefaultAvatar from "./DefaultAvatar.vue";
const yStore = useStore();

interface Props {
  ModelValue: {
    Name: string;
    PostID: number;
    Sex: number;
    UID: number;
  };
  K: number;
  Width: number;
  Height: number;
}

const props = withDefaults(defineProps<Props>(), {
  ModelValue: () => {
    return {
      Name: "",
      PostID: 0,
      Sex: 0,
      UID: 0,
    };
  },
  K: 0,
  Width: 40,
  Height: 40,
});
const OrgMap = ref({});
const Width = computed(() => {
  return props.Width + "px";
});
const Height = computed(() => {
  return props.Height + "px";
});
onMounted(() => {
  OrgMap.value = store.get("OrgMap");
});
</script>
<style scoped lang="less">
.black {
  color: #141414ff;
}
.garys {
  color: #666666ff;
}

.avatar {
  width: v-bind(Width);
  height: v-bind(Height);
  line-height: v-bind(Height);
  > div {
    border-radius: 4px;
  }
}
</style>
