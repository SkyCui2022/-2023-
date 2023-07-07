import { ref } from 'vue'

export default function usePost () {
  const Active = ref(0)

  function changeActive (n: number) {
    Active.value = n
  }

  return { Active, changeActive }
}
