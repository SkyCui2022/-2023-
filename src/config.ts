
import Wechat from '@ctsy/api-sdk/dist/modules/Wechat'
import create from '@ctsy/api-sdk'

export const WechatID = 'gh_8aa9c79f59fc'
//@ts-ignore
create('yan', 'yan', 'c1w5fw128135', false, localStorage.getItem('ApiHost'))
Wechat.set_wechatid(WechatID)