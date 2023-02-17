import { Request } from '@ctsy/sdk'

export class BaseApi extends Request {
  Host = 'http://192.168.31.5:8500'
}

export class Base {
  $set (d: { [key: string]: any }) {
    for (let k in d) {
      //@ts-ignore
      this[k] = d[k]
    }
    return this
  }
}
/**
 * yianniao.api.v1.GetCheckReq
 */
export class EntityGetCheckReq extends Base {}
/**
 * yianniao.api.v1.GetCheckRes
 */
export class EntityGetCheckRes extends Base {
  /**
   *
   * 检查表编号
   */
  CheckID: number = 0

  /**
   *
   * 创建人
   */
  CUID: number = 0

  /**
   *
   * 创建时间
   */
  CTime: Date | string = new Date()

  /**
   *
   * 更新人
   */
  UUID: number = 0

  /**
   *
   * 更新时间
   */
  UTime: Date | string = new Date()

  /**
   *
   * 状态;-1=已删除,0=未启用,1=已启用
   */
  Status: number = 0

  /**
   *
   * 检查表名称
   */
  Name: string = ''

  /**
   *
   * 所属企业编号
   */
  EID: number = 0

  /**
   *
   * 上次检查时间
   */
  LTime: Date | string = new Date()

  /**
   *
   * 上次检查人
   */
  LUID: number = 0

  /**
   *
   * 总共的检查次数
   */
  Total: number = 0

  /**
   *
   * 总共的隐患数量
   */
  Error: number = 0

  /**
   *
   * 已整改数量
   */
  Fixed: number = 0

  /**
   *
   * 上次检查隐患数
   */
  LError: number = 0

  /**
   *
   * 上次检查已整改
   */
  LFixed: number = 0

  /**
   *
   * 当前未整改
   */
  Unfix: number = 0

  /**
   *
   * 备注信息
   */
  Memo: string = ''

  /**
   *
   * 上次整改时间
   */
  LFixTime: Date | string = new Date()

  /**
   *
   * 上次整改人
   */
  LFixUID: number = 0

  /**
   *
   * 数据版本;数据版本号，修改一次+1，每次修改的时候需要转存改数据对象到另外的数据上
   */
  Rev: number = 0

  /**
   *
   * 分组字典编号;分组数据从字典接口中获取
   */
  GDID: number = 0

  /**
   *
   * 引用的检查表编号
   */
  RefCheckID: number = 0

  /**
   *
   * 最近记录
   */
  Logs: EntityCheckLogRs[] = []

  /**
   *
   * 检查项
   */
  Items: EntityCheckItemsRs[] = []

  /**
   *
   *
   */
  Users: EntityUserInfoMap[] = []
}
/**
 * yianniao.internal.logic.CheckLogRs
 */
export class EntityCheckLogRs extends Base {
  /**
   *
   * 检查记录编号
   */
  CLID: number = 0

  /**
   *
   * 创建人
   */
  CUID: number = 0

  /**
   *
   * 创建时间
   */
  CTime: Date | string = new Date()

  /**
   *
   * 状态;-1 删除 0禁用 1启用
   */
  Status: number = 1

  /**
   *
   * 检查编号
   */
  CheckID: number = 0

  /**
   *
   * 已整改数量
   */
  Fixed: number = 0

  /**
   *
   * 当前未整改
   */
  Unfix: number = 0

  /**
   *
   * 未整改的记录详情
   */
  Details: EntityCheckDetailRs[] = []

  /**
   *
   * 签字图片
   */
  Signs: EntitySign[] = []
}
/**
 * yianniao.internal.logic.CheckDetailRs
 */
export class EntityCheckDetailRs extends Base {
  /**
   *
   * 明细编号
   */
  CDID: number = 0

  /**
   *
   * 检查记录编号
   */
  CLID: number = 0

  /**
   *
   * 创建人
   */
  CUID: number = 0

  /**
   *
   * 创建时间
   */
  CTime: Date | string = new Date()

  /**
   *
   * 状态
   */
  Status: number = 1

  /**
   *
   * 检查项编号
   */
  CIID: number = 0

  /**
   *
   * 隐患备注
   */
  Memo: string = ''

  /**
   *
   * 隐患图片或整改图片
   */
  Imgs: string[] = []

  /**
   *
   * 检查结论;0无隐患 1有隐患
   */
  Result: number = 0

  /**
   *
   * 记录类型;0检查记录 1整改记录 2复核记录
   */
  Type: number = 0

  /**
   *
   * 复核、整改情况下该值为签字，其它情况为空
   */
  Sign: string = ''
}
/**
 * yianniao.internal.logic.Sign
 */
export class EntitySign extends Base {
  /**
   *
   * 签字人员编号
   */
  UID: number = 0

  /**
   *
   * 签字时间
   */
  CTime: Date | string = new Date()

  /**
   *
   * 签字的图片地址
   */
  Sign: string = ''
}
/**
 * yianniao.internal.logic.CheckItemsRs
 */
export class EntityCheckItemsRs extends Base {
  /**
   *
   * 检查项编号
   */
  CIID: number = 0

  /**
   *
   * 状态;-1 删除 0禁用 1启用
   */
  Status: number = 1

  /**
   *
   * 检查项名称
   */
  Name: string = ''

  /**
   *
   * 检查备注
   */
  Memo: string = ''

  /**
   *
   * 检查项类型 0符合/不符合 1是否 2其他
   */
  Type: number = 0

  /**
   *
   * 检查项配图;用于图形提示的检查项内容，单图
   */
  Img: string = ''

  /**
   *
   * 隐患状态;0无隐患 1有历史隐患 2有未整改隐患
   */
  Err: number = 0
}
/**
 * yianniao.internal.logic.UserInfoMap
 */
export class EntityUserInfoMap extends Base {
  /**
   *
   * 用户编号
   */
  UID: number = 0

  /**
   *
   * 用户名称，用于显示
   */
  Name: string = ''

  /**
   *
   * 性别 0女1男-1未知
   */
  Sex: number = 0

  /**
   *
   * 用户头像，基本不可用，微信已屏蔽
   */
  Avatar: string = ''
}
/**
 * yianniao.api.v1.AddCheckReq
 */
export class EntityAddCheckReq extends Base {
  /**
   *
   * 检查表名称
   */
  Name: string = ''

  /**
   *
   * 所属企业编号
   */
  EID: number = 0

  /**
   *
   * 检查表说明
   */
  Memo: string = ''

  /**
   *
   * 分组字典编号;分组数据从字典接口中获取
   */
  GDID: number = 0

  /**
   *
   * 检查项
   */
  Items: EntityCheckItemsRs[] = []
}
/**
 * yianniao.api.v1.CheckOpRes
 */
export class EntityCheckOpRes extends Base {
  /**
   *
   * 检查表编号
   */
  CheckID: number = 0
}
/**
 * yianniao.api.v1.CopyCheckReq
 */
export class EntityCopyCheckReq extends Base {
  /**
   *
   * 要复制检查表编号
   */
  CheckID: number = 0

  /**
   *
   * 要复制的目标企业
   */
  ToEID: number = 0
}
/**
 * yianniao.api.v1.DelCheckReq
 */
export class EntityDelCheckReq extends Base {
  /**
   *
   * 检查表编号
   */
  CheckID: number = 0

  /**
   *
   * 所属企业编号
   */
  EID: number = 0
}
/**
 * yianniao.api.v1.DetailCheckReq
 */
export class EntityDetailCheckReq extends Base {}
/**
 * yianniao.internal.logic.SigleCheckDetailRes
 */
export class EntitySigleCheckDetailRes extends Base {
  /**
   *
   * 检查表编号
   */
  CheckID: number = 0

  /**
   *
   * 检查表名称
   */
  Name: string = ''

  /**
   *
   * 所属企业编号
   */
  EID: number = 0

  /**
   *
   * 检查记录编号
   */
  CLID: number = 0

  /**
   *
   * 创建人
   */
  CUID: number = 0

  /**
   *
   * 创建时间
   */
  CTime: Date | string = new Date()

  /**
   *
   * 状态;-1 删除 0禁用 1启用
   */
  Status: number = 1

  /**
   *
   * 总共的检查次数
   */
  Total: number = 0

  /**
   *
   * 总共的隐患数量
   */
  Error: number = 0

  /**
   *
   * 已整改数量
   */
  Fixed: number = 0

  /**
   *
   * 当前未整改
   */
  Unfix: number = 0

  /**
   *
   * 详细信息
   */
  Details: EntitySingleCheckDetailItem[] = []

  /**
   *
   * 用户信息
   */
  Users: EntityUserInfoMap[] = []

  /**
   *
   * 签字信息
   */
  Signs: EntitySign[] = []
}
/**
 * yianniao.internal.logic.SingleCheckDetailItem
 */
export class EntitySingleCheckDetailItem extends Base {
  /**
   *
   * 隐患明细编号
   */
  CDID: number = 0

  /**
   *
   * 检查项编号
   */
  CIID: number = 0

  /**
   *
   * 状态;-1 删除 0禁用 1启用
   */
  Status: number = 1

  /**
   *
   * 检查项名称
   */
  Name: string = ''

  /**
   *
   * 检查备注
   */
  Memo: string = ''

  /**
   *
   * 隐患备注
   */
  EMemo: string = ''

  /**
   *
   * 检查项类型 0符合/不符合 1是否 2其他
   */
  Type: number = 0

  /**
   *
   * 检查项配图;用于图形提示的检查项内容，单图
   */
  Img: string = ''

  /**
   *
   * 隐患图片数组
   */
  EImgs: string[] = []
}
/**
 * yianniao.api.v1.ErrCheckReq
 */
export class EntityErrCheckReq extends Base {}
/**
 * yianniao.api.v1.FixCheckReq
 */
export class EntityFixCheckReq extends Base {
  /**
   *
   * 隐患检查详情编号
   */
  CDID: number = 0

  /**
   *
   * 检查记录编号
   */
  CLID: number = 0

  /**
   *
   * 整改备注
   */
  Memo: string = ''

  /**
   *
   * 整改图片
   */
  Imgs: string[] = []
}
/**
 * yianniao.api.v1.FixCheckRes
 */
export class EntityFixCheckRes extends Base {
  /**
   *
   * 整改完成的隐患详情编号
   */
  CDID: number = 0
}
/**
 * yianniao.api.v1.SaveCheckReq
 */
export class EntitySaveCheckReq extends Base {
  /**
   *
   * 检查表名称
   */
  Name: string = ''

  /**
   *
   * 所属企业编号
   */
  EID: number = 0

  /**
   *
   * 检查表说明
   */
  Memo: string = ''

  /**
   *
   * 分组字典编号;分组数据从字典接口中获取
   */
  GDID: number = 0

  /**
   *
   * 检查项
   */
  Items: EntityCheckItemsRs[] = []
}
/**
 * yianniao.api.v1.SearchCheckReq
 */
export class EntitySearchCheckReq extends Base {
  /**
   *
   * 关键词查询的关键词内容，支持空格分隔
   */
  Keyword: string = ''

  /**
   *
   * 分页页码
   */
  P: number = 1

  /**
   *
   * 每一页的条目数量
   */
  N: number = 10

  /**
   *
   * 查询条件，请参考构建文档完成构建工作
   */
  W: number = 0

  /**
   *
   * 排序条件
   */
  Sort: string = ''

  /**
   *
   * 要查询的条目字段范围
   */
  Fields: string[] = []
}
/**
 * yianniao.api.v1.SearchCheckRes
 */
export class EntitySearchCheckRes extends Base {
  /**
   *
   * 分页页码
   */
  P: number = 0

  /**
   *
   * 每一页的条目数量
   */
  N: number = 0

  /**
   *
   * 符合条件的累计条目数量
   */
  T: number = 0

  /**
   *
   *
   */
  L: EntityCheckRs[] = []

  /**
   *
   * 响应数据的统计信息或额外信息
   */
  R: number = 0
}
/**
 * yianniao.internal.logic.CheckRs
 */
export class EntityCheckRs extends Base {
  /**
   *
   * 检查表编号
   */
  CheckID: number = 0

  /**
   *
   * 创建人
   */
  CUID: number = 0

  /**
   *
   * 创建时间
   */
  CTime: Date | string = new Date()

  /**
   *
   * 更新人
   */
  UUID: number = 0

  /**
   *
   * 更新时间
   */
  UTime: Date | string = new Date()

  /**
   *
   * 状态;-1=已删除,0=未启用,1=已启用
   */
  Status: number = 0

  /**
   *
   * 检查表名称
   */
  Name: string = ''

  /**
   *
   * 所属企业编号
   */
  EID: number = 0

  /**
   *
   * 上次检查时间
   */
  LTime: Date | string = new Date()

  /**
   *
   * 上次检查人
   */
  LUID: number = 0

  /**
   *
   * 总共的检查次数
   */
  Total: number = 0

  /**
   *
   * 总共的隐患数量
   */
  Error: number = 0

  /**
   *
   * 已整改数量
   */
  Fixed: number = 0

  /**
   *
   * 上次检查隐患数
   */
  LError: number = 0

  /**
   *
   * 上次检查已整改
   */
  LFixed: number = 0

  /**
   *
   * 当前未整改
   */
  Unfix: number = 0

  /**
   *
   * 备注信息
   */
  Memo: string = ''

  /**
   *
   * 上次整改时间
   */
  LFixTime: Date | string = new Date()

  /**
   *
   * 上次整改人
   */
  LFixUID: number = 0

  /**
   *
   * 数据版本;数据版本号，修改一次+1，每次修改的时候需要转存改数据对象到另外的数据上
   */
  Rev: number = 0

  /**
   *
   * 分组字典编号;分组数据从字典接口中获取
   */
  GDID: number = 0

  /**
   *
   * 引用的检查表编号
   */
  RefCheckID: number = 0

  /**
   *
   * 最近记录
   */
  Logs: EntityCheckLogRs[] = []

  /**
   *
   * 检查项
   */
  Items: EntityCheckItemsRs[] = []

  /**
   *
   *
   */
  Users: EntityUserInfoMap[] = []
}
/**
 * yianniao.api.v1.SubmitCheckReq
 */
export class EntitySubmitCheckReq extends Base {
  /**
   *
   * 检查表编号
   */
  CheckID: number = 0

  /**
   *
   * 检查人签字图
   */
  Sign: string = ''

  /**
   *
   * 检查记录信息
   */
  Items: EntitySubmitCheckLog[] = []
}
/**
 * yianniao.api.v1.SubmitCheckLog
 */
export class EntitySubmitCheckLog extends Base {
  /**
   *
   * 检查项编号
   */
  CIID: number = 0

  /**
   *
   * 检查备注
   */
  Memo: string = ''

  /**
   *
   * 检查结论;0无隐患 1有隐患
   */
  Result: number = 0

  /**
   *
   * 隐患图片,Result=1时必传
   */
  Imgs: string[] = []
}
/**
 * yianniao.api.v1.SubmitCheckRes
 */
export class EntitySubmitCheckRes extends Base {
  /**
   *
   * 提交成功后返回的改检查记录的编号，用于前端路由跳转
   */
  CLID: number = 0
}
export class Root extends BaseApi {
  Class = ''
  /**
   * 前端页面读取单个检查表
   *
   * @param CheckID {number} 检查表编号
   * @param LogNum {number} 提取最近历史多少条历史记录
   * @return EntityGetCheckRes
   */
  async Check (
    CheckID: number,
    LogNum: number = 5
  ): Promise<EntityGetCheckRes> {
    return this._get(this.Class + `/Check/` + CheckID)
  }
}
export const RootApi = new Root()
export class Check extends BaseApi {
  Class = 'Check'
  /**
   * 添加检查表
   *
   * @param d {EntityAddCheckReq}
   * @return EntityCheckOpRes
   */
  async add (d: EntityAddCheckReq): Promise<EntityCheckOpRes> {
    return this._put(this.Class + `/add`, d)
  }
  /**
   * 复制个检查表到新的企业
   *
   * @param d {EntityCopyCheckReq}
   * @return EntityCheckOpRes
   */
  async copy (d: EntityCopyCheckReq): Promise<EntityCheckOpRes> {
    return this._put(this.Class + `/copy`, d)
  }
  /**
   * 删除检查表
   *
   * @param d {EntityDelCheckReq}
   * @return EntityCheckOpRes
   */
  async del (d: EntityDelCheckReq): Promise<EntityCheckOpRes> {
    return this._post(this.Class + `/del`, d)
  }
  /**
   * 查询已经检查的检查表结论
   * 返回结构中只取Logs中的第一条数据，此时Logs的长度为1
   * @param CheckID {number} 检查表编号
   * @param CLID {number} 检查记录编号
   * @return EntitySigleCheckDetailRes
   */
  async detailByCheckIDByCLID (
    CheckID: number,
    CLID: number
  ): Promise<EntitySigleCheckDetailRes> {
    return this._get(this.Class + `/detail/${CheckID}/${CLID}`)
  }
  /**
   * 读取隐患详情
   * 用于进行隐患整改时读取隐患详情
   * @param CDID {number} 隐患明细编号
   * @return EntitySigleCheckDetailRes
   */
  async errByCDID (CDID: number): Promise<EntitySigleCheckDetailRes> {
    return this._get(this.Class + `/err/${CDID}`)
  }
  /**
   * 检查表隐患整改
   * 当用户提交检查表的隐患整改时使用，该接口不见得是前端调用，可能存在后端通过grpc调用
   * @param d {EntityFixCheckReq}
   * @return EntityFixCheckRes
   */
  async fix (d: EntityFixCheckReq): Promise<EntityFixCheckRes> {
    return this._post(this.Class + `/fix`, d)
  }
  /**
   * 编辑保存检查表
   *
   * @param d {EntitySaveCheckReq}
   * @return EntityCheckOpRes
   */
  async save (d: EntitySaveCheckReq): Promise<EntityCheckOpRes> {
    return this._post(this.Class + `/save`, d)
  }
  /**
   * 查询检查表列表
   *
   * @param d {EntitySearchCheckReq}
   * @return EntitySearchCheckRes
   */
  async search (d: EntitySearchCheckReq): Promise<EntitySearchCheckRes> {
    return this._post(this.Class + `/search`, d)
  }
  /**
   * 提交检查结论
   * 用于在用户完成检查表检查后提交检查记录
   * @param d {EntitySubmitCheckReq}
   * @return EntitySubmitCheckRes
   */
  async submit (d: EntitySubmitCheckReq): Promise<EntitySubmitCheckRes> {
    return this._put(this.Class + `/submit`, d)
  }
}
export const CheckApi = new Check()
