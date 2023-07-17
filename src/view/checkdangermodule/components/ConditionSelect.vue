<template>
  <van-row gutter="6" class="margin_15_0" justify="space-around" align="center">
    <van-col @click="showPopup()">
      <span :class="`font14 ${ModelValue.Value ? 'fc1b6ffe' : 'fc666666'}`"
        >{{ ModelValue.Name }}
        <i class="yan5 yan5-shaixuanjiantou_shaixuanjiantou font13"></i
      ></span>
    </van-col>
  </van-row>
  <van-popup
    v-model:show="ShowPopup"
    round
    position="bottom"
    :style="{ height: '80%' }"
  >
    <van-row class="margin_10_0">
      <van-col span="24" class="black"><h3>请选择</h3></van-col>
    </van-row>
    <van-row>
      <van-col span="22" offset="1">
        <van-checkbox-group v-model="CheckData">
          <van-cell-group inset>
            <van-cell
              @click="select(v, k)"
              v-for="(v, k) in List"
              :key="k"
              clickable
              class="left"
            >
              <template #title>
                <span class="font14">{{ v.Name }}</span>
              </template>
              <template #right-icon>
                <van-checkbox
                  :name="v.Value"
                  :ref="(el:any) => (CheckboxRefs[k] = el)"
                  @click.stop
                />
              </template>
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
      </van-col>
    </van-row>
    <van-row class="height33">
      <van-col span="24"></van-col>
    </van-row>
    <van-row class="fixed_bottom33">
      <van-col span="12">
        <van-button type="danger" size="large" @click="cancel">清空</van-button>
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
import { onMounted, onBeforeUpdate } from "vue";
import { ref } from "vue";
import { iCondition, cCondition } from "../../../api/lib";
import { cloneDeep } from "lodash";
import type { CheckboxInstance } from "vant";

const Props = defineProps({
  ModelValue: {
    type: cCondition,
    default: () => {},
  },
});
const emits = defineEmits(["select"]);
const CloneModel = ref<iCondition>(new cCondition());
const CheckData = ref([]);
const CheckboxRefs = ref<CheckboxInstance[]>([]);
const List = ref<{ Name: string; Value: number | string }[]>([]);

const ShowPopup = ref(false);
function showPopup() {
  ShowPopup.value = !ShowPopup.value;
  List.value = Props.ModelValue.List;
}

let name = "";
function select(d: any, v: number) {
  CheckboxRefs.value[v].toggle();
  name = d;
}
function cancel() {
  ShowPopup.value = false;
  Props.ModelValue.Name = CloneModel.value.Name;
  CheckData.value = [];
  emits("select", {
    Key: Props.ModelValue.Key,
    Value: 0,
  });
}

function confrim() {
  ShowPopup.value = !ShowPopup.value;
  emits("select", {
    Key: Props.ModelValue.Key,
    Value: CheckData.value || 0,
  });
}
onBeforeUpdate(() => {
  CheckboxRefs.value = [];
});
onMounted(() => {
  CloneModel.value = cloneDeep(Props.ModelValue);
});
</script>
<style lang="less" scoped>
.van-button {
  height: 33px;
  padding: 10px 25px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.height33 {
  height: 33px;
  line-height: 33px;
}
.black {
  color: #000;
}
</style>
