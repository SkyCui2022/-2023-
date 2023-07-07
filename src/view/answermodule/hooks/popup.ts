import { ref } from 'vue'

export default function usePopup () {
  const ShowPopUp = ref(false)
  function showPopup () {
    ShowPopUp.value = !ShowPopUp.value
  }
  return { ShowPopUp, showPopup }
}
