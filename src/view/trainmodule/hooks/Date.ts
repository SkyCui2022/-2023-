import { ref } from 'vue'
import { format_date, DateFMT } from '@ctsy/common'
import {timeFormat} from '../api/lib'

export default function useDate() {
  /**
   * 日历对象
   */
  const Calendar=ref()
    /**
     * 日历开关
     */
    const ShowCalendar = ref(false);
    /**
     * 开始时间
     */
    const STime = ref<string|Date>('开始时间');
    /**
     * 截至时间
     */
    const ETime = ref<string | Date>('截止时间');
    /**
     * 控制日历开关
     */
function showCalendar() {
  ShowCalendar.value = !ShowCalendar.value;
    }
    /**
     * 给开始、结束时间赋值
     * @param date 返回日期
     */
  function onConfirm() {
      let rs = Calendar.value.getSelectedDate()
      let min = Math.min(...rs)
      let max=Math.max(...rs)
      ShowCalendar.value = !ShowCalendar.value;
      rs.length>1?( STime.value = timeFormat(new Date(min), DateFMT.YMD),
      ETime.value = timeFormat(new Date(max), DateFMT.YMD)):( STime.value = ETime.value = format_date(new Date(min), DateFMT.YMD))
}

  
  function onCancel() {
    //@ts-ignore
    Calendar.value.reset()
    ETime.value='开始时间'
    STime.value=`截止时间`
    ShowCalendar.value = !ShowCalendar.value;
    
  }
    return{ShowCalendar,STime,ETime,Calendar,showCalendar,onConfirm,onCancel}
}