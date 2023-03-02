namespace AppRouter {
  /**
   * 检查表模块
   */
  export enum Check {
    /**
     * 添加安全检查表
     */
    Create = '/AddCreate/:EID',
    /**
     * 检查详情
     */
    CheckDetail = '/Detail/:EID/:CLID'
  }
  /**
   * 培训模块
   */
  export enum Train {
    /**
     * 参加培训
     */
    Join = '/Join/:EID/:TrainID'
  }
  /**
   * 答题模块
   */
  export enum Answer {
    /**
     * 试卷
     */
    Paper = '/Paper/:EID/:PaperID',
    /**
     * 答题详情
     */
    AnswerDetail = '/AnswerdDetail/:EID'
  }
}

export default AppRouter
