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
    CheckDetail = 'Detail/:EID/:CheckID/:CLID'
  }
  /**
   * 培训模块
   */
  export enum Train {
    /**
     * 参加培训
     */
    Join = 'Join/:EID/:TrainID'
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
    List = 'Risk/:EID/',
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
    Detail='TroubleDetail/:EID/:CDID'
 }
}

export default AppRouter
