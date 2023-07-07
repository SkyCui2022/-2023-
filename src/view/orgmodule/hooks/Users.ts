import { ref } from 'vue'
import { showConfirmDialog } from 'vant'
import { cloneDeep } from 'lodash'

export default function useUser () {
  const UnitName = ref('')
  const Search = ref('')
  const ShowPopup = ref(false)
  const ShowEdit = ref(false)
  const OperNum = ref(0)
  const AdminUsers = ref([] as number[])
  const Users = ref([] as number[])
  const CheckedList = ref([] as { UID: number; Bool: boolean }[])
  const CopyList = ref([] as { UID: number; Bool: boolean }[])
  const CopyAdmins = ref([] as number[])

  function edit (n: number) {
    OperNum.value = n
    ShowEdit.value = !ShowEdit.value
  }
  function see () {}
  function remove () {
    showConfirmDialog({
      message: '确定移除该用户？'
    })
      .then(() => {
        CheckedList.value.forEach(item => {
          if (item.UID == AdminUsers.value[OperNum.value]) {
            item.Bool = false
          }
        })
        AdminUsers.value.splice(OperNum.value, 1)
      })
      .catch(() => {})
      .finally(() => {
        ShowEdit.value = !ShowEdit.value
      })
  }
  function setAUID () {
    console.log(Users.value[OperNum.value])
    ShowEdit.value = !ShowEdit.value
  }
  function joinAdmin () {
    console.log(Users.value[OperNum.value])
    ShowEdit.value = !ShowEdit.value
  }

  function cancel () {
    ShowPopup.value = !ShowPopup.value
    AdminUsers.value = CopyAdmins.value
    CheckedList.value = CopyList.value
  }
  function confirm () {
    ShowPopup.value = !ShowPopup.value
    AdminUsers.value = []
    let rs = CheckedList.value.filter(v => v.Bool == true)
    rs.forEach(item => AdminUsers.value.push(item.UID))
    CopyAdmins.value = cloneDeep(AdminUsers.value)
  }
  function join () {
    ShowPopup.value = !ShowPopup.value
  }
  function esc () {
    ShowEdit.value = !ShowEdit.value
  }
  function change (s: string) {
    console.log(s)
  }

  return {
    UnitName,
    Search,
    ShowEdit,
    ShowPopup,
    AdminUsers,
    Users,
    CheckedList,
    CopyList,
    CopyAdmins,
    edit,
    see,
    remove,
    setAUID,
    joinAdmin,
    join,
    cancel,
    confirm,
    esc,
    change
  }
}
