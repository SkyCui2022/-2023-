<template>
  <van-row @click="change_active" class="flex_column">
    <van-col>
      <van-image width="37px" :src="ModelValue.URL"></van-image>
    </van-col>
    <van-col>{{ ModelValue.Text }}</van-col>
  </van-row>
</template>
<script setup lang="ts">
import { onMounted, watch, withDefaults, defineProps, defineEmits } from 'vue'
import { SearchResult } from '@ctsy/api-sdk'
import { SearchWhere } from '@ctsy/api-sdk/dist/lib'

interface Props {
  ModelValue: { URL: string; Text: string }
  Active: number
}

const props = withDefaults(defineProps<Props>(), {
  ModelValue: () => {
    return { URL: '', Text: '' }
  },
  Active: 0,
})
const emits = defineEmits(['change_active'])

function change_active() {
  emits('change_active', props.Active)
}
</script>
<style scoped lang="less"></style>
