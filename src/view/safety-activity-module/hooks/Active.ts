import { reactive } from 'vue'

export default function useActive () {
  const ActiveStore = reactive({
    state: 0
  })
  return { ActiveStore }
}
