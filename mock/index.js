const geo = require('./data.json')

module.exports = {
  'GET /new_sq/map/task/grid/getBoundaryData': wrap({
    "status": 0,
    "message": "成功",
    "data": [
      {
        "boundary": "POLYGON((113.010007 28.150747,112.980702 28.158723,113.00277 28.148759,112.979765 28.153683,112.993824 28.15061,112.979602 28.168711,112.979478 28.189109,112.996857 28.150237,112.988137 28.154761,112.97842 28.170734,112.980225 28.188556,113.024568 28.187116,113.0235 28.173197,113.022859 28.161167,113.010007 28.158723))",
        "code": "100062",
        "name": "雨高桥城区综合网格"
      },
      {
        "boundary": "POLYGON((113.009225 28.114327,113.021142 28.114422,113.024924 28.119585,113.029768 28.14154,113.024493 28.158691,113.002682 28.153223,112.993916 28.146556,112.994274 28.14146,112.995541 28.132654,112.999456 28.129447,113.00328 28.122135,113.009097 28.116395,113.009225 28.11452))",
        "code": "100063",
        "name": "雨香樟城区综合网格"
      }
    ]
  }),
  'GET /sourceview/pv': wrap({}),
  'GET /mock/boundaryGeoJson': geo,
  // TODO: 待确定
  'POST /new_sq/map/task/findTask': {
    RSP_CODE: 'success',
    DATA: [{
      VALUE: 2,
      AD_CODE: 431200,
      NAME: '怀化市',
    },{
      VALUE: 22,
      AD_CODE: 430400,
      NAME: '衡阳市',
    },{
      VALUE: 23,
      AD_CODE: 430600,
      NAME: '岳阳市',
    },{
      VALUE: 12,
      AD_CODE: 433100,
      NAME: '湘西土家族苗族自治州',
    },{
      VALUE: 24,
      AD_CODE: 430100,
      NAME: '长沙市',
    },{
      VALUE: 24,
      AD_CODE: 430800,
      NAME: '张家界市',
    },{
      VALUE: 24,
      AD_CODE: 430700,
      NAME: '常德市',
    }]
  },
  'GET /sourceview/auth/checkLogin': ({
    respCode: '0000',
    respData: {
      adcode: ["430000"],
      username: "mock-user",
      deptName: 'mock-deptName'
    }
  })
}

function wrap(data) {
  return {
    data
  }
}
