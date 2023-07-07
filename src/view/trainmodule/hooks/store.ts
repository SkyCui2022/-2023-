import { reactive, ref } from 'vue'

export const cState = reactive<{ Active: number }>({ Active: 0 })
