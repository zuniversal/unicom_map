import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import { Select, DatePicker, Card, Row, Col, Form, Button, Table, Pagination, Modal, Input } from 'antd';

import './Index.css'
import styles from './Index.module.less'

import IndexS from './../work/Index.js'
import WorkCom from './../work/Index.js'

const taskStatusMap = {
  '01': '待派发', 
  '02': '执行中', 
  '03': '已完成', 
  '04': '派发中', 
}

const taskTypeMap = {
  '01': '营销',
  '02': '生产',
  '03': '服务',
  '04': '管理',
}

export const taskTypeConfig = [
  {
    value: '01',
    label: '营销',
  },
  {
    value: '02',
    label: '生产',
  },
  {
    value: '03',
    label: '服务',
  },
  {
    value: '04',
    label: '管理',
  },
];

export const taskStatusConfig = [
  {
    value: '01',
    label: '待派发', 
  },
  {
    value: '02', 
    label: '执行中', 
  },
  {
    value: '03', 
    label: '已完成', 
  },
  {
    value: '04',
    label: '派发中', 
  },
];


const Option = Select.Option
function Index() {

  const [prolist, setProlist] = useState([])  //列表
  const [linkages, setLinkages] = useState([])  //联动 省
  const [county, setCounty] = useState([]) //  市
  const [district, setDistrict] = useState([]) //区县

  const [proList, setProList] = useState([])   //  工单
  const [ taskId, setTaskId ] = useState(null)
    
  const [form] = Form.useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const fetchOrders = async (params) => {
    const response = await axios.post('/new_sq/map/task/workOrderQuery/info', {
      LIMIT: 0,
      OFFSET: 20,
      ...params
    })
    setProList(response.data.DATA)
  };

  //点击事件  详情
  const showModal = (e) => {
    setIsModalVisible(true);
    setTaskId(e.TASK_ID)
    // fetchOrders({
    //   TASK_ID: Number(e.TASK_ID)
    // })
  };
  //点击确定 回调
  const handleOk = () => {

    setIsModalVisible(false);
    setProList()

  };


  const onFinishs = async (value) => {
    const params = {
      END_TIME: value.END_TIME ? (new Date(value.END_TIME._d)).toISOString().slice(0, 19).replace('T', ' ') : value.END_TIME,
      EXECUTOR_NAME: value.EXECUTOR_NAME,
      EXECUT_STATUS: Number(value.EXECUT_STATUS),
      LIMIT: 0,
      OFFSET: 20,
      START_TIME: value.START_TIME ? (new Date(value.START_TIME._d)).toISOString().slice(0, 19).replace('T', ' ') : value.START_TIME,
      TASK_ID: Number(value.TASK_ID)
    }
      await fetchOrders();
      console.log('回参', response);
  };

  const column = [
      {
          title: '任务名称',dataIndex: 'TASK_NAME',
      },
      {
          title: '客户号码',dataIndex: 'TARGET_NUM',
      },
      {
          title: '执行人名称',dataIndex: 'EXECUTOR_NAME',
      },
      {
          title: '工单状态',dataIndex: 'EXECUT_STATUS'
      },
      {
          title: '省份',dataIndex: 'PROVINCE_CODE',
      },
      {
          title: '地市', dataIndex: 'EPARCHY_CODE'
      },
      {
          title: '区县',dataIndex: 'COUNTY_CODE'
      },
      // {
      //     title: '网格编码',dataIndex: 'GRID_CODE'
      // },
      {
          title: '网格',dataIndex: 'GRID_NAME'
      },

      {
          title: '工单开始时间',dataIndex: 'CREATE_TIME'
      },
      {
          title: '工单结束时间',dataIndex: 'START_TIME'
      }
  ]



  const columns = [
    {
      title: '任务名称',dataIndex: 'TASK_NAME',
    },
    {
      title: '省份',dataIndex: 'PROVINCE_NAME',
    },
    {
      title: '地市',dataIndex: 'EPARCHY_NAME',
    },
    {
      title: '区县',dataIndex: 'COUNTY_NAME',
    },
    {
      title: '网格',dataIndex: 'GRID_NAME'
    },
    {
      title: '任务类型',dataIndex: 'TASK_TYPE',
      render: (text, record, index) => text ? taskTypeMap[text] : text,
    },
    {
      title: '状态', dataIndex: 'TASK_STATUS',
      render: (text, record, index) => text ? taskStatusMap[text] : text,
    },
    // {
    //   title: '完成状态', dataIndex: 'TASK_STATUS',
    // },
    // {
    //   title: '状态', dataIndex: 'TASK_STATUS',
    // },
    // {
    //   title: '生成工单数', dataIndex: 'ORDER_NUM',
    //   render: text => {
    //     return Number(text) || 0;
    //   }
    // },
    // {
    //   title: '已完成工单数', dataIndex: 'ORDER_STATICTS_NUM',
    //   render: text => {
    //     return Number(text) || 0;
    //   }
    // },
    {
      title: '工单详情',
      render: (text, record, index) => {
        return (
          <>
            <Button type="primary" onClick={() => showModal(record)}>详情</Button>
          </>
        )
      }

    }
  ];
  const getSearchParams = () => {
    return location.search
        .replace('?', '')
        .split('&')
        .reduce((res, item) => {
          const [k, v] = item.split('=');
          res[k] = v;
          return res;
        }, {})
  };
  const fetchTaskData = async (params = {}) => {
    const s = getSearchParams();
    const data = {
      OFFSET: '50',
      LIMIT: '0'
    }
    if (s.adcode) {
      data.AD_CODE = s.adcode
    }
    if (s.areaLevel) {
      data.AREA_LEVEL = s.areaLevel
    }
    if (s.type) {
      // TODO: 任务怎么对应
      data.TASK_TYPE = s.type;
    }
    const response = await axios.post('/new_sq/map/task/grid/getTaskQuery', {
      ...data,
      ...params
    })
    console.log('回参', response);
    setProlist(response.data.DATA)
  };

  useEffect(() => {
    fetchTaskData();
  }, [])
  const onFinish = async (value) => {
    const params = {
      END_TIME: value.END_TIME,
      END_TIME: value.END_TIME ? (new Date(value.END_TIME._d)).toISOString().slice(0, 19).replace('T', ' ') : value.END_TIME,
      OFFSET: '50',
      LIMIT: '0',
      TASK_STATUS: value.TASK_STATUS,
      TASK_TYPE: value.TASK_TYPE,
      START_TIME: value.START_TIME,
      START_TIME: value.START_TIME ? (new Date(value.START_TIME._d)).toISOString().slice(0, 19).replace('T', ' ') : value.START_TIME,
      AD_CODE: value.AD_CODE,
      AREA_LEVEL: value.AREA_LEVEL

    }
    await fetchTaskData(params);
  }


  //
  const onChangeProvince = async (value) => {
    const getparams = {
      AREA_LEVEL: '10',
      AD_CODE: value
    }
    const linkage = await axios.post('/new_sq/map/task/areaGrid/info', getparams)
    console.log('省回参=》', linkage);
    setLinkages(linkage.data.AREA_LIST)
  }
  //
  const onChangeCity = async (value) => {
    const getdistrict = {
      AREA_LEVEL: '20',
      AD_CODE: value,
    }
    const district = await axios.post('/new_sq/map/task/areaGrid/info', getdistrict)
    // console.log('区回参=》', district);
    setCounty(district.data.AREA_LIST)
  }
  //
  const onChangeCounty = async (value) => {
    const getdistrict = {
      AREA_LEVEL: '30',
      AD_CODE: value,
    }
    const district = await axios.post('/new_sq/map/task/areaGrid/info', getdistrict)
    // console.log('县回参=》', district);
    setDistrict(district.data.AREA_LIST)
  }
  //table 表格 隔行变色
  const rowClassName = (record, index) => {
    return index % 2 === 1 ? styles.once : styles.twoe
  }
    
  const onReset = async (value) => {
      console.log(' fetchData onReset ： ', value   )// 
      form.resetFields();
  };

  return (
    <div>
      {/* <Card>
        <Form onFinish={onFinish}
          form={form}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={6}>

              <Form.Item label="任务类型:" name="TASK_TYPE" >
                <Select placeholder="营销任务" style={{ width: 150 }} >
                  {taskStatusConfig.map((v, i) => <Option value={v.value} key={v.value} >{v.label}</Option>)}
                </Select>

              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>

              <Form.Item label="任务状态:" name="TASK_STATUS">
                <Select placeholder="已完成" style={{ width: 150 }}>
                  {taskStatusConfig.map((v, i) => <Option value={v.value} key={v.value} >{v.label}</Option>)}
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item label="开始时间" name="START_TIME">
                <DatePicker style={{ width: 150 }} />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item label="结束时间" name="END_TIME">
                <DatePicker style={{ width: 150 }} />
              </Form.Item>
            </Col>

            <Col className="gutter-row" span={6}  >

              <Form.Item label="省份" style={{ marginLeft: 30 }} name="AD_CODE">
                <Select placeholder="选择省份" style={{ width: 150 }} onChange={onChangeProvince}>
                  <Option value="430000">湖南</Option>

                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item label="地市" style={{ marginLeft: 30 }} >
                <Select placeholder="选择地市" style={{ width: 150 }} onChange={onChangeCity} >

                  {
                    linkages && linkages.map(item => {
                      return <Option key={item.AD_NAME} value={item.AD_CODE}> {item.AD_NAME} </Option>
                    })
                  }

                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item label="区县" style={{ marginLeft: 30 }}>
                <Select placeholder="选择区县" style={{ width: 150 }} onChange={onChangeCounty}>
                  {
                    county && county.map(item => {
                      return <Option key={item.AD_NAME} value={item.AD_CODE}> {item.AD_NAME} </Option>
                    })
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={6}>
              <Form.Item label="网格" style={{ marginLeft: 30 }}>
                <Select placeholder="选择网格" style={{ width: 150 }} >
                  {
                    district && district.map(item => {
                      return <Option key={item.AD_NAME} value={item.AD_CODE}> {item.AD_CODE} </Option>
                    })
                  }
                </Select>
              </Form.Item>

            </Col>

            <Col span={24} style={{ textAlign: 'right', }}>
              <Button type="primary" htmlType="submit"   >
                查询
              </Button>
              <Button style={{ margin: '0 8px', }} onClick={onReset}>
                  重置
              </Button>
            </Col>
          </Row>
        </Form>
      </Card> */}

      <Card>
        <Table columns={columns} rowKey={'TASK_ID'} dataSource={prolist} rowClassName={rowClassName} >

        </Table>
      </Card>
      <Modal visible={isModalVisible}
        onOk={handleOk}
        centered={true}
        mask={false}
        closable={false}
        cancelText
        className="Modals"
      >
        {/* <Card>
          <Form onFinish={onFinishs}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={8} >
                <Form.Item label="任务ID" style={{ marginLeft: 45 }} name="TASK_ID">
                  <Input value="请输入任务ID" style={{ width: 150 }} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={8} name="WORK_STATE">
                <Form.Item label="工单状态" style={{ marginLeft: 30 }} name="EXECUT_STATUS">
                  <Input value="请输入工单状态" style={{ width: 150 }} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={8}>
                <Form.Item label="执行人名称" style={{ marginLeft: 30 }} name="EXECUTOR_NAME">
                  <Input placeholder="请输入执行人名称" style={{ width: 150 }} />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="开始时间" style={{ marginLeft: 30 }} name="START_TIME" >
                  <DatePicker style={{ width: 150 }} />
                </Form.Item>
              </Col>
              <Col span={8} >
                <Form.Item label="结束时间" style={{ marginLeft: 30 }} name="END_TIME">
                  <DatePicker style={{ width: 150 }} />
                </Form.Item>
              </Col>

              <Col span={8} style={{ textAlign: 'right', }}>
                <Button type="primary" htmlType="submit" >
                  查询
                          </Button>
                <Button style={{ margin: '0 8px', }}>
                  重置
                          </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        <Table columns={column} rowClassName={rowClassName} dataSource={proList} pagination={{ pageSize: 8 }}>

        </Table> */}

        {/* <IndexS /> */}
        <WorkCom TASK_ID={taskId} ></WorkCom>
      </Modal>
    </div>
  );
}

export default connect()(Index);
