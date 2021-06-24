const levelLabelMap = {
  1: '省份',
  2: '城市',
  3: '区县',
  4: '网格',
  5: '小区',
  7: '区域',
  8: '总量',
  9: '完成数',
  10: '逾期数',
  11: '完成率',
  12: '工单数',
  13: '触达率',
  14: '转换率',
  15: '执行人',
  16: '详情',
}
export const getLevelLabel = (level) => {
  return levelLabelMap[level]
}
export const getViewType = (level) => {
  // 先用区县级别测试
  return level < 4 ? 1 : 2
}

export const getServiceAPIParamsLevel = (level) => {
  switch (level * 1) {
    case 1:
      return 10
    case 2:
      return 20
    case 3:
      return 30
    case 10:
      return 10
    case 20:
      return 20
    case 30:
      return 30
    default:
      return 40
  }
}
