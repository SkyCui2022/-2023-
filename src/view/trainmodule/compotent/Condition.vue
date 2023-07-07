<template>
  <van-row gutter="6" class="margin_15_0">
    <template v-for="(v, k) in ModelValue">
      <van-col
        ><van-button class="height33" round @click="showPopup(v.Key, k)">
          {{ v.Name }}<van-icon name="arrow-down" />
        </van-button>
      </van-col>
    </template>
  </van-row>
  <van-popup
    v-model:show="ShowPopup"
    round
    position="bottom"
    :style="{ height: '80%' }"
    @cancel="Key = 9999"
  >
    <van-row class="margin_10_0">
      <van-col span="24"
        ><h3>请选择{{ Name }}</h3></van-col
      >
    </van-row>
    <van-row>
      <van-col span="22" offset="1">
        <van-radio-group v-model="RadioData">
          <van-cell-group inset>
            <template v-for="(v, k) in List" :key="k">
              <van-cell @click="select(v)" class="left">
                <template #title>
                  <van-icon name="user-o" />{{ v.Name }}
                </template>
                <template #right-icon>
                  <van-radio :name="v.Value" />
                </template>
              </van-cell>
            </template>
          </van-cell-group>
        </van-radio-group>
      </van-col>
    </van-row>
    <van-row class="height33">
      <van-col span="24"></van-col>
    </van-row>
    <van-row class="fixed_bottom33">
      <van-col span="12">
        <van-button type="danger" size="large" @click="ShowPopup = false"
          >取消</van-button
        >
      </van-col>
      <van-col span="12">
        <van-button type="primary" size="large" @click="confrim"
          >确认</van-button
        >
      </van-col>
    </van-row>
  </van-popup>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { ref } from "vue";
import { iCondition } from "../api/lib";

const Props = defineProps({
  ModelValue: {
    type: Array<iCondition>,
    default: () => [],
  },
});
const emits = defineEmits(["selectUser"]);

const RadioData = ref<string | number>(0);
const Name = ref("");
const Key = ref(9999);
const List = ref<{ Name: string; Value: number }[]>([]);

const ShowPopup = ref(false);
function showPopup(s: string, n: number) {
  ShowPopup.value = !ShowPopup.value;
  Name.value = Props.ModelValue[n].Name;
  List.value = Props.ModelValue[n].List;
  Key.value = n;
}

function select(v: { Name: string; Value: number }) {
  Props.ModelValue[Key.value].Name = v.Name;
  Props.ModelValue[Key.value].Value = v.Value;
  RadioData.value = v.Value;
}

function confrim() {
  ShowPopup.value = !ShowPopup.value;
  emits("selectUser", RadioData.value);
}
</script>
<style lang="less" scoped>
.van-button {
  height: 33px;
  padding: 10px 25px;
}
.height33 {
  height: 33px;
  line-height: 33px;
}
</style>
