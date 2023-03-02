import { ref } from 'vue'

export default function usePopup () {
  const ShowPopUp = ref(false)
  function showPropup () {
    ShowPopUp.value = !ShowPopUp.value
  }
  return { ShowPopUp, showPropup }
}
