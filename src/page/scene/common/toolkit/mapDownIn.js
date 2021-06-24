const dbClickSetOption = (options, target) => {
  if (Array.isArray(options)) {
    for (const option of options) {
      if (option.value === target) {
        return option
      }
    }
  }
  return {}
}

export default function (districtId, location, changeLocation, selectedOptions, changeSelectedOptions, dispatch) {
  // 如果location有值，且location.location是数组
  if (location && Array.isArray(location.location)) {
    const locArr = [].concat(location.location)
    if (locArr.length >= 3) {
      return
    }
    // locArr ==> ['省adCode', '市adCode', '区adCode', '网格adCode']
    locArr.push(districtId)

    // optionArr ==> [[label:'省', value: '430000', children: []], [label:'市', value: '43xxxx', children: []], ...]
    const optionArr = [].concat(selectedOptions)

    // dispatch ==> undefined
    if (dispatch) {
      dispatch(changeLocation({ location: locArr }))
    } else {
      // ???
      changeLocation({ location: locArr })
    }
    // 取上一级的adCode
    let preLocation = location.location[location.location.length - 1]

    // 筛选出当前的省市区name,value
    let targetOption = dbClickSetOption(optionArr, preLocation)?.children
    targetOption = dbClickSetOption(targetOption, districtId)
    optionArr.push(targetOption)

    // console.log('targetOption ==> ', optionArr)
    if (dispatch) {
      dispatch(changeSelectedOptions({ selectedOptions: optionArr }))
    } else {
      changeSelectedOptions({ selectedOptions: optionArr })
    }
  }
}
