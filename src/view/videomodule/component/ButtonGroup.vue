<template>
  <van-col class="flex_dir" span="8" @click="click">
    <van-image
      :width="props.ModelValue.Image.Width"
      :height="props.ModelValue.Image.Height"
      :src="props.ModelValue.Image.URL"
    ></van-image>
    <van-row class="font12 white margintop5">
      {{ props.ModelValue.Text }}
    </van-row>
  </van-col>
</template>
<script setup lang="ts">
import { computed, defineComponent, ref, reactive, onMounted, watch } from 'vue'
import { SearchResult } from '@ctsy/api-sdk'
import { SearchWhere } from '@ctsy/api-sdk/dist/lib'

interface Props {
  ModelValue: {
    Image: {
      Width: string
      Height: string
      URL: string
    }
    Text: string
  }
}
const props = withDefaults(defineProps<Props>(), {
  ModelValue: () => {
    return {
      Image: {
        Width: '',
        Height: '',
        URL: 'https://f.tansuyun.cn/api/yan/2023-02-01/setdanger.svg',
      },
      Text: '',
    }
  },
})

const emits = defineEmits(['click'])
function click() {
  emits('click', props.ModelValue.Text)
}
</script>
<style scoped lang="less">
.font12 {
  font-size: 12px;
}
.white {
  color: #fff;
}
.margintop5 {
  margin-top: 5px;
}
.flex_dir {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
</style>
