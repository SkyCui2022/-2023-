import { ref } from 'vue'

export default function useCheckLog () {
  const Unfold = ref(false)
  const LogHeight = ref('0px')
  const logHeight = ref(0)
  function changeHeight (arr: any[]) {
    Unfold.value = !Unfold.value
    let height = Number(LogHeight.value.replace('px', ''))
    height == logHeight.value
      ? (LogHeight.value = `${height * arr.length}px`)
      : (LogHeight.value = `${logHeight.value}px`)
  }
  return { Unfold, LogHeight, changeHeight, logHeight }
}
