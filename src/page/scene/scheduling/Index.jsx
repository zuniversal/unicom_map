import React from 'react'
import { Layout, Card, Progress, Table, Pagination } from 'antd';
import styles from './Index.css';
import ReactECharts from 'echarts-for-react';

function scheduling() {
    const getOption = () => {
        return {
            title: {
                text: '任务类型占比',
                left: 'center'
            },
            legend: {
                data: ['营销', '生产', '管理', '服务'],
                bottom: 'bottom'
            },
            xAxis: {
                type: 'category',
                data: ['营销', '生产', '管理', '服务']
            },
            yAxis: {
                type: 'value'
            },
            tooltip: {
                show: true
            },
            series: [
                {
                    name: '营销',
                    data: [350, 230, 284, 218],
                    type: 'bar'
                }]
        }
    }
    const columns = [
        {
            title: '排名',
            dataIndex: 'name',
        },
        {
            title: '区域信息',
            dataIndex: 'chinese',
            sorter: {
                compare: (a, b) => a.chinese - b.chinese,
                multiple: 3,
            },
        },
        {
            title: '网格数量',
            dataIndex: 'math',
            sorter: {
                compare: (a, b) => a.math - b.math,
                multiple: 2,
            },
        },
        {
            title: '工单数量',
            dataIndex: 'english',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
        {
            title: '任务完成率',
            dataIndex: 'english',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            chinese: '北京',
            math: 60,
            english: 70,
        },
        {
            key: '2',
            name: 'Jim Green',
            chinese: '北京',
            math: 66,
            english: 89,
        },
        {
            key: '3',
            name: 'Joe Black',
            chinese: '北京',
            math: 90,
            english: 70,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: '北京',
            math: 99,
            english: 89,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: '北京',
            math: 99,
            english: 89,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: '北京',
            math: 99,
            english: 89,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: '北京',
            math: 99,
            english: 89,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: '北京',
            math: 99,
            english: 89,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: '北京',
            math: 99,
            english: 89,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: '北京',
            math: 99,
            english: 89,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: '北京',
            math: 99,
            english: 89,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: '北京',
            math: 99,
            english: 89,
        },
        {
            key: '4',
            name: 'Jim Red',
            chinese: '北京',
            math: 99,
            english: 89,
        },
    ];

    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div>
            <div style={{ flexDirection: 'column', display: 'flex' }}>
                <div style={{ display: 'flex', flex: 1 }}>
                    <Card style={{ flex: 1 }} hoverable={true}>
                        <h1>任务总量</h1>
                    </Card>
                    <Card style={{ flex: 1 }} hoverable={true}>
                        <h1>任务任务完成率</h1>
                    </Card>
                    <Card style={{ flex: 1 }} hoverable={true}>
                        <h1>任务逾期数</h1>
                    </Card>
                </div>
                <div style={{ flex: 1 }}>
                    <Card>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flexDirection: 'column', display: 'flex', width: '30%' }}>
                                <div style={{ flex: 1 }}>
                                    <Card>
                                        <div style={{ textAlign: 'center', lineHeight: '20px', marginTop: '-10px' }}><h2>任务量排行</h2></div>
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ width: '10%' }}>北京</div>
                                            <div style={{ flex: 1 }}><Progress percent={90} status="active" strokeColor={{ '0%': 'blue', '100%': '#ffffff', }} showInfo={false} /></div>
                                        </div>
                                        <div><Progress percent={39} status="active" strokeColor={{ '0%': 'blue', '100%': '#ffffff', }} showInfo={false} /></div>
                                        <div><Progress percent={48} status="active" strokeColor={{ '0%': 'blue', '100%': '#ffffff', }} showInfo={false} /></div>
                                        <div><Progress percent={60} status="active" strokeColor={{ '0%': 'blue', '100%': '#ffffff', }} showInfo={false} /></div>
                                        <div><Progress percent={86} status="active" strokeColor={{ '0%': 'blue', '100%': '#ffffff', }} showInfo={false} /></div>
                                        <div><Progress percent={40} status="active" strokeColor={{ '0%': 'blue', '100%': '#ffffff', }} showInfo={false} /></div>
                                        <div><Progress percent={67} status="active" strokeColor={{ '0%': 'blue', '100%': '#ffffff', }} showInfo={false} /></div>
                                    </Card>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Card style={{ flex: 1 }}>
                                        <div>
                                            <ReactECharts option={getOption()} />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div style={{ width: '70%' }}>
                                <Card>
                                    <Table columns={columns} dataSource={data} />
                                </Card>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div >
    )
}

export default scheduling