import { ref } from 'vue'
import { Group } from '../api/check'

export default function useGroup () {
  const ButtonGroups = ref(Group)
  function click (s: string) {
    switch (s) {
      case '整改隐患':
        toDangerList()
        break
      case '其他隐患':
        toCreateDanger()
        break
      case '检查统计':
        toCheckLogs()
        break
    }
  }
  function toDangerList () {
    //TODO 跳转至隐患列表
    console.log('跳转至隐患列表')
    // router.push('javascript:;')
  }
  function toCreateDanger () {
    //TODO 跳转至创建隐患
    console.log('跳转至创建隐患')
    // router.push('javascript:;')
  }
  function toCheckLogs () {
    //TODO 跳转至检查统计
    console.log('跳转至检查统计')
    // router.push('javascript:;')
  }
  return { ButtonGroups, click, toCreateDanger }
}
