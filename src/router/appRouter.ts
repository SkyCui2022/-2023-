namespace AppRouter {
  /**
   * 检查表模块
   */
  export enum Check {
    /**
     * 添加安全检查表
     */
    Create = 'AddCreate/:EID/:CheckID',
    /**
     * 检查详情
     */
    Detail = 'Detail/:EID/:CheckID/:CLID'
    /**
     * 检查表清单
     */
    List = 'Index/:EID'
    /**
     * 检查记录
     */
    Log = 'Logs/:EID'
    /**
     * 检查记录详情
     */
    LogDetail='LogDetail/:EID/:CLID'
  }
  /**
   * 培训模块
   */
  export enum Train {
    /**
     * 培训库
     */
    Home = ':EID'
    /**
     * 培训列表
     */
    List = 'List/:EID'
    /**
     * 培训详情
     */
    Detail = 'Detail/:EID/:TDID'
    /**
     * 培训记录
     */
    TLog='Log/:EID/:TLID'
  }
  /**
   * 答题模块
   */
  export enum Answer {
    /**
     * 试卷
     */
    Paper = 'Paper/:EID/:PaperID',
    /**
     * 答题详情
     */
    AnswerDetail = 'AnswerdDetail/:EID'
  }
   /**
   * 风险点模块
   */
   export enum Risk {
    /**
     * 风险点列表
     */
    List = 'Risk/:EID',
    /**
     * 风险点衔接页面
     */
     Page = 'Risk/:EID/:RiskID',
     /**
      * 风险点详情
      */
     Detail = 'Risk/Detail/:EID/:RiskID',  
  }
  /**
   * 隐患模块
   */
  export enum Trouble{
    /**
      * 隐患台账
      */
    HiddenTrouble = 'HiddenTrouble/:EID',
    /**
     * 隐患详情
     */
    Detail = 'TroubleDetail/:EID/:CDID'
    /**
     * 创建隐患
     */
    Create='Create/:EID'
  }
  /**
   * 企业模块
   */
  export enum Enter{
    /**
     * 企业信息
     */
    EnterBase=':EID'
  }
  /**
   * 法律法规模块
   */
  export enum Law{
    /**
     * 法律法规列表
     */
    List=':EID'
  }
  /**
   * 组织架构模块
   */
  export enum Org{
    /**
     * 组织架构列表
     */
    List = ':EID'
    /**
     * 组织架构详情
     */
    OrgDetail = 'OrgDetail/:EID/:OrgID'
    /**
     * 部门详情
     */
    UnitDetail = 'UnitDetail/:EID/:OrgID'
    /**
     * 岗位详情
     */
    PostDetail = 'PostDetail/:EID/:OrgID'
    /**
     * 员工档案
     */
    Member = 'Member/:EID/:OrgID'
  }
  /**
   * 安全活动
   */
  export enum Active{
    /**
     * 安全活动
     */
    Index = ':EID'
    /**
     * 创建活动
     */
    Create = 'Create/:EID'
    /**
     * 活动记录
     */
    Log = 'Log/:EID'
    /**
     * 活动详情
     */
    Detail='Detail/:EID/:PType/:TrainID'
  }
}

export default AppRouter
