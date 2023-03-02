import sdk from '@yakj/sdk/sdk/store'

import pinia from './pinia'

export default function get_yan_store () {
  return sdk(pinia)
}
