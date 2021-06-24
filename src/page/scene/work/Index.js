import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

import { DatePicker, Card, Row, Col, Form, Input, Button, Table} from 'antd';

import  './Index.css'
import styles from './Index.module.less'


function Index(props) {
    const[proList,setProList]=useState([])
    const [form] = Form.useForm();

    const columns = [
        {
            title: '任务名称',
            dataIndex: 'TASK_NAME',
        },
        {
            title: '客户号码',
            dataIndex: 'TARGET_NUM'
        },
        {
            title: '执行人名称',
            dataIndex: 'EXECUTOR_NAME',
        },
        {
            title: '工单状态',
            dataIndex: 'EXECUT_STATUS',

        },
        {
            title: '省份',

            dataIndex: 'PROVINCE_NAME',
        },
        {
            title: '地市',

            dataIndex: 'EPARCHY_NAME'
        },
        {
            title: '区县',

            dataIndex: 'COUNTY_NAME'
        },
        {
            title: '网格',

            dataIndex: 'GRID_NAME'
        },
        // {
        //     title: '小区',
        //
        //     dataIndex: 'GRID_CODE'
        // },

        {
            title: '工单开始时间',

            dataIndex: 'START_TIME'
        },
        {
            title: '工单结束时间',

            dataIndex: 'END_TIME'
        }

    ];

    const fetchData = async (params = {}) => {
        const response = await axios.post('/new_sq/map/task/workOrderQuery/info', {
            LIMIT: 0,
            OFFSET: 20,
            ...params
        });
        console.log( '回参', response);
        setProList(response.data.DATA)
    };

    const onFinish = async (value) => {
        console.log(' fetchData onFinish ： ', value   )// 
        const params = {
            END_TIME: value.END_TIME ? (new Date(value.END_TIME._d)).toISOString().slice(0, 19).replace('T', ' ') : value.END_TIME,
            EXECUTOR_NAME: value.EXECUTOR_NAME,
            EXECUT_STATUS: Number(value.EXECUT_STATUS),
            LIMIT: 0,
            OFFSET: 20,
            START_TIME: value.START_TIME ? (new Date(value.START_TIME._d)).toISOString().slice(0, 19).replace('T', ' ') : value.START_TIME,
            TASK_ID: Number(value.TASK_ID)
        }
        fetchData(params);

    };
    
    const onReset = async (value) => {
        console.log(' fetchData onReset ： ', value   )// 
        form.resetFields();
    };
    

    useEffect(() => {
        console.log(' %c fetchData 组件 props ： ', `color: #333; font-weight: bold`, props,  )// 
        const params = props.TASK_ID ? {TASK_ID: props.TASK_ID} : {}//  
        console.log('  params ：', params,  )// 
        fetchData(params);
    }, [])

    const rowClassName = (record, index) => {
        return index % 2 === 1 ? styles.once : styles.twoe
      }
    return (
        <div>
            {/* <Card>
                <Form onFinish={onFinish}
                    initialValues={{
                        TASK_ID: props.TASK_ID,
                    }}
                    form={form}
                >
                     <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col className="gutter-row" span={8} >
                            <Form.Item label="任务ID" style={{ marginLeft: 45 }} name="TASK_ID">
                                <Input placeholder="请输入任务ID" style={{ width: 150 }} />
                            </Form.Item>
                        </Col>
                        <Col className="gutter-row" span={8} name="WORK_STATE">
                            <Form.Item label="工单状态" style={{ marginLeft: 30 }} name="EXECUT_STATUS">
                                <Input placeholder="请输入工单状态" style={{ width: 150 }} />
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
                            <Button style={{ margin: '0 8px', }} onClick={onReset}>
                                重置
                            </Button>
                        </Col>
                    </Row>
                 </Form>
            </Card> */}

            <Card>
                <Table columns={columns} dataSource={proList} rowClassName={rowClassName} pagination={{pageSize:5}}>

                </Table>
            </Card>
        </div>
    );



}

export default connect()(Index)
