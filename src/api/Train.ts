import {
  TrainLogApi,
  TrainsApi,
  EntityTrainLog,
  EntityGetTrainsRes,
  EntityUserInfoMap,
  EntitySaveTrainLogReq
} from '@yakj/sdk/sdk/sdk'
export class Train {
  TrainID: number = 0
  Name: string = ''
  AID: number = 2
  CUID: number = 0
  CTime: Date | string = ''
  UUID: number = 0
  UTime: Date | string = ''
  Status: number = 0
  EID: number = 0
  GDID: number = 0
  Memo: string = ''
  Content: string = ''
  PType: number = 0
  CType: number = 0
  RefNum: number = 0
  RefID: number = 0
  PaperID: number = 0
  Times: number = 0
  Seconds: number = 0
  Rev: number = 0
  Head: string = ''
  Min: number = 0
  Attach: string = ''
  STime: Date | string = ''
  ETime: Date | string = ''
  MustAnswer: number = 0
  LTime: Date | string = ''
  LUID: number = 0
  TimeLimit: number = 0
  Addr: string = ''
  SignETime: Date | string = ''
  SignSTime: Date | string = ''
  UnitLimit: number = 0
  PostLimit: number = 0
  DownAttach: number = 1
  Price: number = 0
  Duration: number = 0
  Suggest: number = 0
  Summary: string = ''
  URLs: string[] = []
}

export class Log {
  TLID = 0
  AID = 0
  CUID = 0
  CTime = ''
  UUID = 0
  Status = 0
  Seconds = 0
  TrainID = 0
  Sign = ''
  STime = ''
  ETime = ''
  PaperID = 0
  Score = 0
  PLID = 0
  TotalScore = 0
  OType = ''
  OID = 0
  Img = ''
  Pass = true
  PostID = 0
  UnitID = 0
}

export const UTrains = [
  {
    TrainID: 0,
    Name: '',
    AID: 2,
    CUID: 4,
    CTime: '',
    UUID: 0,
    UTime: '',
    Status: 0,
    EID: 0,
    GDID: 0,
    Memo: '',
    Content: '',
    PType: 0,
    CType: 0,
    RefNum: 0,
    RefID: 0,
    PaperID: 0,
    Times: 0,
    Seconds: 0,
    Rev: 0,
    Head: '',
    Min: 0,
    Attach: '',
    STime: '',
    ETime: '',
    MustAnswer: 0,
    LTime: '',
    LUID: 0,
    TimeLimit: 0,
    Addr: '',
    SignETime: '',
    SignSTime: '',
    UnitLimit: 0,
    PostLimit: 0,
    DownAttach: 1,
    Price: 0,
    Duration: 0,
    Suggest: 0,
    Summary: '',
    URLs: []
  }
]

export const ULogs: EntityTrainLog[] = [
  {
    TLID: 0,
    AID: 0,
    CUID: 4,
    CTime: '',
    UUID: 0,
    Status: 0,
    Seconds: 1000,
    TrainID: 0,
    Sign: '',
    STime: '',
    ETime: '',
    PaperID: 0,
    Score: 90,
    PLID: 0,
    TotalScore: 0,
    OType: '',
    OID: 0,
    Img: '',
    Pass: true,
    PostID: 0,
    UnitID: 0,
    UTime: '',
    $set: () => new EntityTrainLog()
  },
  {
    TLID: 0,
    AID: 0,
    CUID: 4,
    CTime: '',
    UUID: 0,
    Status: 0,
    Seconds: 600,
    TrainID: 0,
    Sign: '',
    STime: '',
    ETime: '',
    PaperID: 0,
    Score: 50,
    PLID: 0,
    TotalScore: 0,
    OType: '',
    OID: 0,
    Img: '',
    Pass: false,
    PostID: 0,
    UnitID: 0,
    UTime: '',
    $set: () => new EntityTrainLog()
  },
  {
    TLID: 0,
    AID: 0,
    CUID: 4,
    CTime: '',
    UUID: 0,
    Status: 0,
    Seconds: 300,
    TrainID: 0,
    Sign: '',
    STime: '',
    ETime: '',
    PaperID: 0,
    Score: 100,
    PLID: 0,
    TotalScore: 0,
    OType: '',
    OID: 0,
    Img: '',
    Pass: true,
    PostID: 0,
    UnitID: 0,
    UTime: '',
    $set: () => new EntityTrainLog()
  }
]

export const TrainID = 31
export const UID = 15459
export const UnitID = 1
export const PostID = 1
export const Tabs = [
  {
    URL: 'https://f.tansuyun.cn/api/yan/2023-02-01/checklog.svg',
    Text: '培训内容'
  },
  {
    URL: 'https://f.tansuyun.cn/api/yan/2023-02-01/checklog.svg',
    Text: '培训统计'
  },
  {
    URL: 'https://f.tansuyun.cn/api/yan/2023-02-01/checklog.svg',
    Text: '培训记录'
  },
  {
    URL: 'https://f.tansuyun.cn/api/yan/2023-02-01/checklog.svg',
    Text: '排行榜'
  }
]
