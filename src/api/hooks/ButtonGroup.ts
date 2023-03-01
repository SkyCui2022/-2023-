import { ref } from 'vue'
import { Group } from '../api/check'

export default function useGroup () {
  const ButtonGroups = ref(Group)
  function click (s: string) {
    switch (s) {
      case '整改隐患':
        to_danger_list()
        break
      case '其他隐患':
        to_create_danger()
        break
      case '检查统计':
        to_check_logs()
        break
    }
  }
  function to_danger_list () {
    //TODO 跳转至隐患列表
    console.log('跳转至隐患列表')
    // router.push('javascript:;')
  }
  function to_create_danger () {
    //TODO 跳转至创建隐患
    console.log('跳转至创建隐患')
    // router.push('javascript:;')
  }
  function to_check_logs () {
    //TODO 跳转至检查统计
    console.log('跳转至检查统计')
    // router.push('javascript:;')
  }
  return { ButtonGroups, click, to_create_danger }
}
