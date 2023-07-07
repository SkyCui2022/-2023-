import { ref } from 'vue'
import { showFailToast } from 'vant'
import { EntityPaperQuestion } from '@yakj/sdk/sdk/sdk'

export default function useChange () {
  const Active = ref(0)
  const Questions = ref([] as EntityPaperQuestion[])
  function up () {
    if (Active.value !== 0) {
      Active.value--
    } else {
      showFailToast('已经是第一题')
    }
  }
  function next() {
    if (Active.value !== Questions.value.length - 1) {
      Active.value++
    } else {
    showFailToast('已经是最后一题')
    }
    
  }
  return { Active, up, next, Questions }
}
