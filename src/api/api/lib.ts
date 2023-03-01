import { Dialog, Toast } from 'vant'
import User from '@ctsy/api-sdk/dist/modules/User'
import { store } from '@ctsy/api-sdk/dist/lib'
const CachedUser: { [index: string]: any } = store.get('CachedUser', {})

export enum AuthEnum {
  RootAdmin,
  RootUAdmin,
  RootMember,
  RootOther,
  ServerAdmin,
  ServerUAdmin,
  ServerMember,
  ServerOther,
  GovAdmin,
  GovUAdmin,
  GovMember,
  GovOther,
  EnterAdmin,
  EnterUAdmin,
  EnterMember,
  EnterOther,
  Qr
}

/**
 * 写入外键关联数据
 * @param d
 * @param field
 * @returns
 */
export async function patch_user (d: any[], field: string = 'CUID') {
  let UIDs = []
  for (let x of d) {
    if (x[field] > 0) {
      UIDs.push(x[field])
    }
  }
  if (UIDs.length > 0) {
    let eUIDs = []
    for (let x of UIDs) {
      if (!CachedUser[x]) {
        eUIDs.push(x)
      }
    }
    if (eUIDs.length > 0) {
      let wUser = await User.UsersApi.search({
        W: { UID: eUIDs },
        _fields: 'UID,Nick,Avatar,Sex',
        P: 1,
        N: eUIDs.length
      })
      for (let x of wUser.L) {
        CachedUser[x.UID] = x
      }
      store.set('CachedUser', CachedUser)
    }
    for (let x of d) {
      let u = CachedUser[x[field]] || { Avatar: '', Nick: '', Sex: 0 }
      x.UNick = u.Nick
      x.UAvatar = u.Avatar
      x.$User = u
    }
  }
  return d
}
/**
 * 权限对象
 */
export default class URule {
  /**
   * 用户UID
   */
  UID: number = 0
  /**
   * 企业编号
   */
  GID: number = 0
  /**
   * 根企业，即EID=159
   */
  Root = new Admin()
  /**
   * 当前企业岗位信息
   */
  Posts: any[] = []
  /**
   * 成员组织
   */
  MUnitIDs: number[] = []
  /**
   * 管理的组织
   */
  AUnitIDs: number[] = []
  /**
   * 当前企业组织结构
   */
  Orgs: any[] = []

  AuthID = AuthEnum.EnterOther

  Rules: { Name: ''; Code: string }[] = []
  /**
   * 服务商标志
   */
  Service = new Admin()
  /**
   * 政府标志
   */
  Gov = new Admin()
  /**
   * 是否是游客，即未加入任何企业
   */
  Tourist = 0
  /**
   * 当前企业权限标志
   */
  Cur = new Admin()
  /**
   * 可切换的企业编号列表
   */
  GIDs: number[] = []
  AUIDs: number[] = []

  AUnits: any[] = []
}
/**
 * 管理权限标志
 */
export class Admin {
  /**
   * 管理员标志
   * 1 企业管理员
   * 2 企业部门管理员
   * 3 企业岗位管理员
   */
  Admin = 0
  /**
   * 成员标志
   * 1 成员
   * 0 不是成员
   */
  Member = 0
}

export async function showQr (html: string, url: string = '') {
  if (!url) {
    url = url || location.href
  }
  console.log('url', url)
  Toast({
    duration: 0,
    overlay: true,
    forbidClick: false,
    closeOnClick: true,
    type: 'html',
    className: 'qrtoast',
    message: `<div><img class="qrimg" width='100' height='100' src="${'https://v1.api.tansuyun.cn/_data/Svg/qr?p=' +
      encodeURIComponent(url)}"/></div><div>${html}</div>`
  })
}

export async function wait (
  fn: Function | PromiseLike<any> | Promise<any> | any,
  msg: string = '加载中..'
) {
  Toast.loading({ message: msg, forbidClick: true, duration: 0 })
  let e = '',
    r
  try {
    r = (await fn) instanceof Function ? fn() : fn
  } catch (err) {
    //@ts-ignore
    e = err.message
  } finally {
    Toast.clear()
    if (e) {
      Toast.fail({ message: e, duration: 3000 })
      throw new Error(e)
    }
  }
  return r
}
export class DangerCount {
  /**
   * 累计隐患
   */
  EAll = 0
  /**
   * 未整改
   */
  Err = 0
  /**
   * 待复核
   */
  Pass = 0
  /**
   * 已确认，已签字
   */
  Sure = 0
  /**
   * 已整改
   */
  Rectify = 0
}

// export class
export class ClassEnter {
  EID: number = 0
  Title = ''
  Name = ''
  Phone = ''
}

export class DangerDep {
  Name: string = ''
  T1: string = ''
  T2: string = ''
  T3: string = ''
  T4: string = ''
  Self: string = ''
  Dep: string = ''
  Dom = ''
}

export function confirm (msg: string) {
  return
}
