import { ref } from 'vue'

export default function useTab () {
  const Active = ref(0)

  function changeActive(n: number) {
    console.log(n)
    Active.value = n
  }

  return { Active, changeActive }
}
