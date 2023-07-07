<template>
  <van-col class="margin_10_0">
    <van-row class="bg block">
      <van-col span="22" offset="1">
        <van-row @click="toDetail" class="block">
          <van-col span="24">
            <van-row align="center" justify="space-between" class="margin_10_0">
              <van-col class="font15 font_bold"
                >{{ Key + 1 }}.{{ ModelValue.Name }}</van-col
              >
              <van-col
                :class="
                  ModelValue.Status == -1
                    ? 'grey greyborder'
                    : ModelValue.Status == 0
                    ? 'blue blueborder'
                    : ModelValue.Status == 1
                    ? 'red redborder'
                    : ''
                "
                >{{ Status[ModelValue.Status] }}</van-col
              >
            </van-row>
            <van-row align="center" justify="space-around">
              <van-col>
                <van-row>
                  <van-col span="24" class="font_bold font15">
                    {{ timeFormat(ModelValue.STime, DateFMT.YMDHm).slice(10) }}
                  </van-col>
                </van-row>
                <van-row>
                  <van-col class="grey">
                    {{ timeFormat(ModelValue.STime, DateFMT.YMD) }}
                  </van-col>
                </van-row>
              </van-col>
              <van-col class="grey">
                {{ Time }}
              </van-col>
              <van-col>
                <van-row>
                  <van-col span="24" class="font_bold font15">
                    {{ timeFormat(ModelValue.ETime, DateFMT.YMDHm).slice(10) }}
                  </van-col>
                </van-row>
                <van-row>
                  <van-col class="grey">
                    {{ timeFormat(ModelValue.ETime, DateFMT.YMD) }}
                  </van-col>
                </van-row>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
        <van-row align="center" justify="space-between" class="margin_10_0">
          <van-col
            ><van-icon name="location-o" size="12" />
            {{ ModelValue.Addr }}</van-col
          >
          <van-col
            ><van-icon name="ellipsis" size="24" @click="showPropup(Key)"
          /></van-col>
        </van-row>
      </van-col>
    </van-row>
  </van-col>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Status, Type } from "../api/Activity";
import { EntityTrains } from "@yakj/sdk/sdk/sdk";
import { format_date, DateFMT } from "@ctsy/common";
import { useRouter, useRoute } from "vue-router";
import { timeFormat } from "../api/lib";

const router = useRouter();
const route = useRoute();
interface Props {
  Key: number;
  ModelValue: EntityTrains;
  Active: number;
}

const props = withDefaults(defineProps<Props>(), {
  Key: 0,
  Active: 1,
  ModelValue: () => {
    return new EntityTrains();
  },
});

const emits = defineEmits(["showPropup"]);

const showPropup = (n: number) => {
  emits("showPropup", n);
};

const Time = computed(() => {
  let time = "";
  let s =
    (new Date(props.ModelValue.ETime).getTime() -
      new Date(props.ModelValue.STime).getTime()) /
    1000;
  let m = Math.floor(s / 60);
  return (time = `时长${m / 60 >= 1 ? Math.floor(m / 60) + "小时" : ""}${
    m % 60
  }分钟`);
});

function toDetail() {
  console.log(props.Active);
  router.push({
    path: `/detail/${Number(route.params.EID)}/${props.Active - 1}/${
      props.ModelValue.TrainID
    }`,
  });
}
</script>
<style scoped lang="less">
.bg {
  background-color: #fff;
  color: #000;
  border-radius: 4px;
  box-shadow: 0px 0px 3px rgba(116, 126, 167, 0.2);
}
</style>
