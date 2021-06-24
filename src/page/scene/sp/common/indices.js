export const ReqType = {
  Task: 'task',
  Work: 'work',
}

export const TaskEnum = {
  /** 营销任务 */
  Marketing: '01',
  /** 生产任务 */
  Production: '02',
  /** 服务任务 */
  Service: '03',
  /** 管理任务 */
  Manage: '04',
}

export const TaskValues = Object.values(TaskEnum)

export const OrderEnum = {
  /** 工单数量 */
  Amount: 'station_fan',
}
export const OrderValues = Object.values(OrderEnum)

export const areaItemsConfig = [
  {
    label: '任务概况',
    key: 'village',
    children: [
      {
        label: '营销任务',
        // key: 'village_all',
        key: TaskEnum.Marketing,
        // icon: '3k/KMCommunity.png',
        layerType: 'PolygonLayer',
        layerOptions: {
          lineColor: 'rgba(77,152,255, 1)',
          lineWidth: 1,
          fillColor: 'rgba(77,152,255, 0.85)',
        },
        reqType: ReqType.Task,
      },
      {
        label: '服务任务',
        // key: 'village_covered',
        key: TaskEnum.Service,
        // icon: '3k/notKMCommunity.png',
        layerType: 'PolygonLayer',
        layerOptions: {
          lineColor: 'rgba(31,192,165, 1)',
          lineWidth: 1,
          fillColor: 'rgba(31,192,165, 0.85)',
        },
        reqType: ReqType.Task,
      },
      {
        label: '管理任务',
        // key: 'village_uncovered',
        key: TaskEnum.Manage,
        layerType: 'PolygonLayer',
        // icon: '3k/KMCommunityDisabled.png',
        layerOptions: {
          lineColor: 'rgba(153,153,153, 1)',
          lineWidth: 1,
          fillColor: 'rgba(153,153,153, 0.85)',
        },
        reqType: ReqType.Task,
      },
      {
        label: '生产任务',
        // key: 'village_covered_rate',
        key: TaskEnum.Production,
        // icon: 'sp/village_rate.png',
        // format: '0%',
        reqType: ReqType.Task,
      },
    ],
  },
  {
    label: '工单概况',
    key: 'resource',
    children: [
      {
        label: '工单数量',
        key: OrderEnum.Amount,
        // icon: 'sp/4g_station.png',
        layerType: 'IconLayer',
        layerOptions: {
          width: 12,
          height: 12,
          icon: process.env.PUBLIC_URL + '/image/sp/4g_station.png',
        },
        reqType: ReqType.Work,
      },
      // {
      //         label: '小区扇区数',
      //         key: 'village_fan',
      //         icon: 'sp/rousourceXQ.png',
      //         overlapType: 2,
      //         iconOptions: {
      //             width: 32,
      //             height: 26,
      //             icon: process.env.PUBLIC_URL + '/image/sp/fubiao/1-3.png',
      //         },
      //     }, {
      //         label: 'OBD设备',
      //         key: 'obd_device',
      //         icon: 'sp/channelOBD1.png',
      //         layerType: 'IconLayer',
      //         layerOptions: {
      //             width: 12,
      //             height: 12,
      //             icon: process.env.PUBLIC_URL + '/image/sp/channelOBD1.png',
      //         },
      //     }, {
      //         label: 'OBD端口数',
      //         key: 'village_obd_port',
      //         icon: 'sp/channelOBD2.png',
      //         overlapType: 2,
      //         polygonOptions: {
      //             fillColor: 'rgba(161, 217, 16, 0.7)',
      //             lineColor: 'rgba(161, 217, 16, 1)',
      //         },
      //         iconOptions: {
      //             width: 32,
      //             height: 26,
      //             icon: process.env.PUBLIC_URL + '/image/sp/fubiao/1-1.png',
      //         },
      //         textOptions: {
      //             color: '#fff',
      //         },
      //     }, {
      //         label: 'OBD空闲端口数',
      //         key: 'village_obd_free_port',
      //         icon: 'sp/channelOBD3.png',
      //         overlapType: 2,
      //         iconOptions: {
      //             width: 32,
      //             height: 26,
      //             icon: process.env.PUBLIC_URL + '/image/sp/fubiao/1-2.png',
      //         },
      //     }, {
      //         label: 'OBD端口利用率',
      //         key: 'village_obd_port_rate',
      //         icon: 'sp/obd_port_rate.png',
      //         format: '0%',
      //         overlapType: 2,
      //         iconOptions: {
      //             width: 32,
      //             height: 26,
      //             icon: process.env.PUBLIC_URL + '/image/sp/fubiao/1-4.png',
      //         },
      //     }],
      // },
      // {
      //     label: '渠道情况',
      //     key: 'channel',
      //     children: [{
      //         label: '本网渠道',
      //         key: 'channel',
      //         icon: 'sp/channelLT.png',
      //         layerType: 'IconLayer',
      //         layerOptions: {
      //             width: 12,
      //             height: 12,
      //             icon: process.env.PUBLIC_URL + '/image/sp/channelLT.png',
      //         },
      //     }
    ],
  },
  // {
  //     label: '用户情况',
  //     key: 'user',
  //     children: [{
  //         label: '参考住户数',
  //         key: 'village_user_total',
  //         icon: 'sp/userYH.png',
  //         overlapType: 2,
  //         iconOptions: {
  //             icon: process.env.PUBLIC_URL + '/image/sp/fubiao/1-5.png',
  //         },
  //     }, {
  //         label: '宽带用户数',
  //         key: 'village_user_broadband',
  //         icon: 'sp/user_wb.png',
  //         overlapType: 2,
  //         iconOptions: {
  //             icon: process.env.PUBLIC_URL + '/image/sp/fubiao/1-7.png',
  //         },
  //     }, {
  //         label: '移网用户数',
  //         key: 'village_user_move',
  //         icon: 'sp/user_mobile.png',
  //         overlapType: 2,
  //         iconOptions: {
  //             icon: process.env.PUBLIC_URL + '/image/sp/fubiao/1-6.png',
  //         },
  //     }],
  // }
]

export const userItemsConfig = [
  // {
  // label: '单移用户数',
  // key: 'village_single_move',
  // keyChild: ['village_fuse_num', 'village_single_terminal_exchange', 'village_single_terminal_exchange2'],
  // icon: 'sp/modelDY.png',
  // overlapType: 2,
  // iconOptions: {
  //     icon: process.env.PUBLIC_URL + '/image/sp/fubiao/2-1.png',
  // },
  // children: [{
  //     label: '单移转融预测',
  //     label1: '单移用户+单移转融模型运算结果',
  //     label2: '可转融用户',
  //     key: 'village_fuse_num',
  //     overlapType: 2,
  //     hasCount: true,
  //     hasRate: true,
  //     iconOptions: {
  //         icon: process.env.PUBLIC_URL + '/image/sp/fubiao/2-1-1.png',
  //     },
  //     textOptions: {
  //         color: '#000',
  //     },
  // }, {
  //     label: '终端换机预测',
  //     label1: '单移用户+终端换机模型运算结果',
  //     label2: '可换机用户',
  //     key: 'village_single_terminal_exchange',
  //     overlapType: 2,
  //     hasCount: true,
  //     hasRate: true,
  //     iconOptions: {
  //         icon: process.env.PUBLIC_URL + '/image/sp/fubiao/2-1-2.png',
  //     },
  //     textOptions: {
  //         color: '#000',
  //     },
  // }, {
  //     label: '流量包智能推荐',
  //     key: 'village_single_terminal_exchange2',
  //     fake: true,
  // }],
  // }, {
  //     label: '单宽用户数',
  //     key: 'village_single_broad',
  //     keyChild: ['village_single_fuse', 'm'],
  //     icon: 'sp/userDK.png',
  //     overlapType: 2,
  //     iconOptions: {
  //         icon: process.env.PUBLIC_URL + '/image/sp/fubiao/2-2.png',
  //     },
  //     textOptions: {
  //         color: '#000',
  //     },
  //     children: [{
  //         label: '单宽转融预测',
  //         key: 'village_single_fuse',
  //         label1: '单宽用户+单宽转融模型运算结果',
  //         label2: '可转融用户',
  //         overlapType: 2,
  //         hasCount: true,
  //         hasRate: true,
  //         iconOptions: {
  //             icon: process.env.PUBLIC_URL + '/image/sp/fubiao/2-1-1.png',
  //         },
  //         textOptions: {
  //             color: '#000',
  //         },
  //     }, {
  //         label: '套餐提速包预测',
  //         key: 'm',
  //         fake: true,
  //     }],
  // },
]

export const modelItemsConfig = [
  {
    key: 'village',
    children: [
      {
        label: '用户携号转网预警',
        label2: '用户携号转网预警',
        key: 'village_user_move_warning',
        icon: 'sp/modelYH.png',
        overlapType: 2,
        hasCount: true,
        iconOptions: {
          icon: process.env.PUBLIC_URL + '/image/sp/fubiao/3-1.png',
        },
        textOptions: {
          color: '#000',
        },
      },
      {
        label: '宽带用户流失预警',
        key: 'a',
        fake: true,
        icon: 'sp/modelKD.png',
      },
      {
        label: '宽带即将到期维系',
        key: 'b',
        icon: 'sp/modelKY.png',
        fake: true,
      },
      {
        label: '用户行为偏好模型',
        key: 'c',
        icon: 'sp/userDK.png',
        format: '0%',
        fake: true,
      },
      {
        label: '结算收入预测',
        key: 'd',
        icon: 'sp/modelJS.png',
        format: '0%',
        fake: true,
      },
      {
        label: '用户稳定性预测',
        key: 'e',
        icon: 'sp/modelYW.png',
        format: '0%',
        fake: true,
      },
    ],
  },
]

const allIndices = []
const allIndicesMap = {}
const indexCategoryMap = {}
const layers = []
const mutexIndices = {}
const putIndices = (groups, allIndices, category) => {
  for (const group of groups) {
    if (group.fake) {
      continue
    }
    allIndicesMap[group.key] = group
    allIndices.push(group.key)
    indexCategoryMap[group.key] = category
    if (group.overlapType === 2) {
      mutexIndices[group.key] = true
    }
    if (group.layerType) {
      layers.push(group)
    }
    for (const item of group.children) {
      if (item.fake) {
        continue
      }
      allIndices.push(item.key)
      allIndicesMap[item.key] = item
      indexCategoryMap[item.key] = category
      if (item.overlapType === 2) {
        mutexIndices[item.key] = true
      }
      if (item.layerType || item.overlapType === 2) {
        layers.push(item)
      }
    }
  }
}
putIndices(areaItemsConfig, allIndices, 'area')
putIndices(userItemsConfig, allIndices, 'user')
putIndices(modelItemsConfig, allIndices, 'model')
// ss
const getIndexFormat = (index) => {
  return allIndicesMap[index] && allIndicesMap[index].format
}
const getIndexCategory = (index) => {
  return indexCategoryMap[index]
}
const getIndexConfig = (index) => {
  return allIndicesMap[index]
}
export { layers, allIndices, mutexIndices, getIndexFormat, getIndexCategory, getIndexConfig }
