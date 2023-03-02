import { ref } from 'vue'
import useRadio from './RadioGroup'
import UploadApi from '@ctsy/api-sdk/dist/modules/Upload'
import { wait } from '../../../api/lib'

export default function useImage () {
  const { SubmitCheck } = useRadio()
  async function upload (arr: string[]) {
    let file = await wait(UploadApi.select_upload('file', '.png,.gif,.jpg'))
    arr.push(file.URL || file.url)
  }
  function clear (imgs: string[], num: number) {
    imgs.splice(num, 1)
  }

  return { upload, clear }
}
