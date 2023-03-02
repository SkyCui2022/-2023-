import { ref } from 'vue'

export default function useRectify () {
  const RectifyList = ref([] as number[])
  function to_rectify () {
    //todo 跳转至隐患，函数应该带有ID
    console.log('跳转至隐患详情')
    // router.push({
    //   path:'/Danger/Detail',
    //   params:{
    //     DID:0
    //   }
    // })
  }
  return { RectifyList, to_rectify }
}
