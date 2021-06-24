import { createSlice } from '@reduxjs/toolkit'
import { getViewType } from '../../../page/scene/sp/common/admin'
import { mutexIndices, TaskValues, OrderValues, ReqType } from '../../../page/scene/sp/common/indices'
import axios from 'axios'
import wkt from 'wkt'
import { getServiceAPIParamsLevel } from '@/page/scene/sp/common/admin'

export const counterSlice = createSlice({
  // 命名
  name: 'sp',
  // 初始值
  initialState: {
    leftTab: '3', // 左侧第N个tab
    selectedIndex: '01', // 左侧选择的指标
    selectedIndices: {}, // 网格下多选的指标
    indexValues: {},
    aggrValues: {},
  },
  // 处理数据
  reducers: {
    changeLeftTab: (state, action) => {
      console.log('state', state)
      console.log('action', action)
      state.leftTab = action.payload
    },
    updateSelectedIndex: (state, action) => {
      state.selectedIndex = action.payload
    },
    updateReqType: (state, action) => {
      state.reqType = action.payload
    },
    updateSelectedIndices: (state, action) => {
      state.selectedIndices = action.payload || {}
    },
    updateIndexValue: (state, action) => {
      state.indexValues[action.payload.index] = {
        data: action.payload.data || {},
      }
    },
    // 任务数据更新
    updateAggrValue: (state, action) => {
      console.log('updateAggrValue ==> ', state, action)
      const data = action.payload.data || []
      let min = Infinity
      let max = -Infinity
      const valueMap = {}

      for (let item of data) {
        let value = item.VALUE * 1
        value = Number.isNaN(value) ? 0 : value
        if (min > value) {
          min = value
        }
        if (max < value) {
          max = value
        }
        valueMap[item.AD_CODE] = value
      }

      // 策略排序 - 暂不需要
      // if (Array.isArray(data)) {
      //     data.sort((a, b) => b.CUSTOMER_NUM - a.CUSTOMER_NUM);
      // }
      state.aggrValues[action.payload.index] = {
        data: action.payload.data,
        min,
        max,
        valueMap,
        status: 0,
      }
    },
    updateDetailValue: (state, action) => {
      const data = action.payload.data || []
      let list = []
      let list2 = []
      for (const item of data) {
        const { boundary, point, ...restProps } = item
        if (boundary) {
          const geometry = wkt.parse(boundary)
          if (geometry && geometry.coordinates) {
            list.push({
              ...restProps,
              geometry: geometry,
              properties: {
                ...restProps,
              },
            })
          }
        }
        if (point) {
          const geometry = wkt.parse(point)
          if (geometry && geometry.coordinates) {
            list2.push({
              ...restProps,
              geometry: geometry,
              properties: {
                ...restProps,
              },
            })
          }
        }
      }
      state.aggrValues[action.payload.index] = {
        data: list,
        data2: list2,
        status: 0,
      }
    },
    clearIndexValues: (state, action) => {
      state.indexValues = {}
    },
    clearAllValues: (state, action) => {
      state.indexValues = {}
      state.aggrValues = {}
    },
  },
})

export const {
  changeLeftTab,
  changeLeftIndex,
  updateIndexValue,
  clearIndexValues,
  updateAggrValue,
  updateSelectedIndex,
  updateSelectedIndices,
  updateDetailValue,
  clearAllValues,
} = counterSlice.actions

export const fetchIndexValue = (params) => async (dispatch) => {
  try {
    const response = await axios.get('/hu_sand/community/getCount', {
      params: {
        adcode: params.adcode,
        level: params.level,
        index: params.index,
      },
    })
    const data = response.data
    if (data.status === 0) {
      dispatch(
        updateIndexValue({
          index: params.index,
          data: data.data,
        })
      )
    } else {
      dispatch(
        updateIndexValue({
          index: params.index,
          data: null,
        })
      )
    }
  } catch (error) {
    dispatch(
      updateIndexValue({
        index: params.index,
        data: null,
      })
    )
  }
}

// 获取右侧策略信息
export const fetchAggrValue = (params) => async (dispatch) => {
  console.log('任务数据入参 ==> ', params)
  try {
    // 策略
    // const response = await axios.post('/new_sq/map/task/strategy/findStrategy',
    //     {
    //         AD_CODE: params.adcode,
    //         LEVEL: params.level,
    //         DISPATCHER_ID: '666',
    //     }
    // );

    // TODO 调用任务接口
    // const response = await axios.post('/new_sq/map/task/strategy/findStrategy', {
    // const response = await axios.post('/new_sq/map/task/taskNewQuery/taskNewQuery', {
    // const response = await axios.post('/new_sq/map/task/grid/workorder', {
    //   AD_CODE: params.adcode,
    //   LEVEL: params.level,
    //   DISPATCHER_ID: '666',
    //   TASK_TYPE: params.selectedIndex,
    //   ORD: 'COMPLETED_TASK_NUM'
    // })

    let {reqType = ReqType.Task,  } = params
    if (TaskValues.includes(params.index)) {
      reqType = ReqType.Task
    } else {
      reqType = ReqType.Work
    }
    const reqUrlMap = {
      [ReqType.Task]: '/new_sq/map/task/taskNewQuery/taskNewQuery', 
      [ReqType.Work]: '/new_sq/map/task/grid/workorder',
    }
    
    const url = reqUrlMap[reqType] 
    let reqParams = {
      AD_CODE: params.adcode,
      LEVEL: getServiceAPIParamsLevel(params.level),
    }
    if (reqType === 'task') {
      reqParams = {
        ...reqParams,
        // DISPATCHER_ID: '666',
        TASK_TYPE: params.index,
        ORD: 'COMPLETED_TASK_NUM',
        // ORD: 'OVERDUE_TASK_NUM',
        // ORD: 'COMPLETION_RATE',
      }
    }
    
    const response = await axios.post(url, reqParams)
    const data = response.data
    console.log('任务数据返回 ==> ', data, url, reqParams, reqType,  )

    // if (data.RESP_CODE === 'success') {
    if (data.RSP_DESC === 'success' || data.RSP_CODE === '0000') {
      console.log('修改 ==> ', data)
      // console.log('=======', data.DATA)
      dispatch(
        updateAggrValue({
          index: params.index,
          data: data.DATA.map((v) => ({...v, areaLevel: reqParams.LEVEL, type: reqType === 'work' ? 'workOrder' : params.selectedIndex,  })),
        })
      )
    } else {
      dispatch(
        updateAggrValue({
          index: params.index,
          data: null,
        })
      )
    }
  } catch (error) {
    console.error(error)
    dispatch(
      updateAggrValue({
        index: params.index,
        data: null,
      })
    )
  }
}

export const fetchDetailValue = (params) => async (dispatch) => {
  try {
    const response = await axios.get('/hu_sand/community/getBoundaryDetailed', {
      params: {
        adcode: params.adcode,
        level: params.level,
        index: params.index,
      },
    })
    const data = response.data
    if (data.status === 0) {
      const list = data.data || []
      list.sort((a, b) => b.value - a.value)
      dispatch(
        updateDetailValue({
          index: params.index,
          data: list,
        })
      )
    } else {
      dispatch(
        updateDetailValue({
          index: params.index,
          data: null,
        })
      )
    }
  } catch (error) {
    dispatch(
      updateDetailValue({
        index: params.index,
        data: null,
      })
    )
  }
}
/**
 * 存储左侧单选条件index
 * @param { String } index - 新获取的成员列表是否追加到原列表后面
 * @param { String } parentKey - 父级key（价值提升-二级选中，才有该参数）
 * @param { Array } keyChild - 子级key数组（价值提升-二级选中，才有该参数）
 * @param { Array } selectedIndices - 网格下多选的指标
 *
 */
export const toggleIndex = (params) => async (dispatch) => {
  const { parentKey, keyChild, aggrValues, index, level, selectedIndices, selectedIndex } = params
  const viewType = getViewType(level)
  console.log('selectedIndex params ==>', params);
  if (viewType === 2) {
    // 网格
    if (!aggrValues[index]) {
      dispatch(fetchDetailValue(params))
    }
    let newSelectedIndices = Object.assign({}, selectedIndices)
    if (selectedIndices[index]) {
      // 已选择的直接取消
      delete newSelectedIndices[index]
      dispatch(updateSelectedIndices(newSelectedIndices))
      if (selectedIndex === index) {
        dispatch(updateSelectedIndex())
      }
      {
        /* 对取消价值提升二级都不选的情况，做兼容 */
      }
      if (keyChild?.includes(index)) {
        dispatch(updateSelectedIndex(parentKey))
      }
    } else {
      // 判断互斥的图层是否需要取消
      console.log(mutexIndices)
      if (mutexIndices[index]) {
        for (const mutexIndex of Object.keys(mutexIndices)) {
          delete newSelectedIndices[mutexIndex]
        }
      }
      dispatch(updateSelectedIndex(index))
      newSelectedIndices[index] = true
      dispatch(updateSelectedIndices(newSelectedIndices))
    }
  } else {
    // 省市区
    // console.log(selectedIndex === index);
    if (selectedIndex === index) {
      // 对取消价值提升二级都不选的情况，做兼容
      if (keyChild?.includes(index)) {
        dispatch(updateSelectedIndex(parentKey))
        dispatch(
          updateSelectedIndices({
            [parentKey]: true,
          })
        )
        return
      }
      dispatch(updateSelectedIndex())
      dispatch(updateSelectedIndices())
    } else {
      dispatch(updateSelectedIndex(index))
      dispatch(
        updateSelectedIndices({
          [index]: true,
        })
      )
    }
    if (!aggrValues[index]) {
      dispatch(fetchAggrValue(params))
    }
  }
}

export const fetchSelectedAggrValues = (params) => async (dispatch) => {
  const { level, selectedIndices, selectedIndex } = params
  const viewType = getViewType(level)
  if (viewType === 2) {
    for (const index of Object.keys(selectedIndices)) {
      dispatch(
        fetchDetailValue({
          ...params,
          index,
        })
      )
    }
  } else {
    if (selectedIndex) {
      dispatch(
        fetchAggrValue({
          ...params,
          index: selectedIndex,
        })
      )
    }
  }
}

export default counterSlice.reducer
