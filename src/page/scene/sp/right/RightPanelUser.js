import React, { PureComponent, Fragment } from 'react';
import { RightOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './RightPanelUser.module.less';
import { connect } from 'react-redux';
import { changeModalState, changeCodeState } from '@/app/reducer/sp/spModal';
import PanelHeader from '@/components/common/PanelHeader';
import { Table, message, Divider, Form, Input, Modal, Button, DatePicker, Select, Radio, Tag, notification } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { getIndexConfig } from '../common/indices';
import { getLevelLabel } from '../common/admin';
import numeral from 'numeral';
import axios from 'axios';
import qs from 'qs';
import { getncHair } from '../../../../services/nc'

const FormItem = Form.Item;
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const submitFormLayout = {
    wrapperCol: {
        span: 10,
        offset: 6,
    },
};
const { RangePicker } = DatePicker;
const { Option } = Select;

class RightPanelUser extends PureComponent {
    constructor(params) {
        super(params);
        this.state = {
            panelHeight: 0,
            togglePanel: true,
            // toggle:true,
            // work:true,
            total: 20,
            pageSize: 9, // 每页条数
            current: 1, // 当前页码
            createModalVisible: false,
            handleModalVisible: false,
            showPublicUsers: false,
            clid: 1,
            clmc: '',
        };

    }

    handleToggle = () => {
        this.setState({ togglePanel: !this.state.togglePanel });

    };
    // Toggle =()=>{
    //     this.setState({ toggle: !this.state.toggle });
    // }
    // Work =()=>{
    //     this.setState({ work: !this.state.work });
    // }


    handleClose = () => {
        this.props.changeSelectedPoint(undefined);
        this.props.changeSelectedVillage(undefined);
    };
    // 跳转到去派单...
    async gotoUrl(location, targetNum) {
        const gotoliuzhuang = 'http://10.242.37.162/portalweb/zhyysso/dockmenu';
        const tokenApi = '/hu_sand/token';
        try {
            // 获取token信息
            let data = await axios.get(tokenApi);
            const { targetId, tokenVO: { appId, loginId, token } } = data.data.data;
            const params = {
                appId,
                loginId,
                token,
                menuCode: 'taskschedue',
                TARGET_ID: targetId, // 任务目标id
                PROVINCE_CODE: '74', // 省分编码
                EPARCHY_CODE: 'V0430100', // 地市编码，-1为省分调配
                COUNTY_CODE: '74aar0', // 区县编码，-1为地市调配
                GRID_CODE: location[3] || -1, // 网格编码，-1为区县调配
                DISPATCHER_ID: '6666', // 操作人id
                TASK_TYPE: '01', // 任务类型
                TARGET_NUM: targetNum, // 目标数量
                TARGET_LABEL: 'three', // 目标标签
                SIGN: 'sdzy', // 系统来源:
                SIGN_TYPE: 'three', // 系统来源类型
            };
            window.open(gotoliuzhuang + '?' + qs.stringify(params));
        } catch (err) {
            message.error('网络错误');
        };
    };
    handleItemClick = (e, index, item) => {
        const { location } = this.props;
        let newLocation = [];
        if (location.length === 1) {
            newLocation = location.concat([item.adcode, -1, -1]);
        } else if (location.length === 2) {
            newLocation = location.concat([item.adcode, -1]);
        } else if (location.length === 3) {
            newLocation = location.concat(item.adcode);
        }
        e.preventDefault();
        // this.gotoUrl(newLocation, item.value);

        this.setState({
            createModalVisible: !this.state.createModalVisible,
            clid: item.STRATEGY_ID,
            clmc: item.STRATEGY_NAME
        })
        console.log('去派单 ==>', this.state.createModalVisible)
        console.log(item.STRATEGY_NAME)
    };
    handleItemClickAll = () => {
        const {
            selectedIndex,
            indexValues,
        } = this.props;
        const { location } = this.props;
        const indexValueObject = indexValues[selectedIndex] || {};
        const value = indexValueObject.data ? indexValueObject.data.value : null;
        // this.gotoUrl(location, value);
        console.log('去派单 ==>', location, value)
    };


    onHandleOk = () => {
        console.log('onHandleOk', this)
    }

    handleCancel = () => {
        this.setState({
            createModalVisible: !this.state.createModalVisible
        })
        console.log('handleCancel', this.state.createModalVisible)
    }

    render() {
        const {
            selectedIndex,
            aggrValues,
            adLevel,
            indexValues,
            currentAdminName,
        } = this.props;
        const indexConfig = getIndexConfig(selectedIndex);

        const { togglePanel } = this.state;
        // const {toggle}=this.state
        // const {work}=this.state

        let valueObject = aggrValues[selectedIndex];
        let loading = !valueObject;

        let indexValueObject = null;
        let modelNumber = '-';
        let modelRate = '';
        if (indexConfig.hasRate) {
            indexValueObject = indexValues[selectedIndex] || {};
            if (indexValueObject && indexValueObject.data) {
                modelNumber = numeral(indexValueObject.data && indexValueObject.data.value || 0)
                    .format('0,0');
                modelRate = numeral(indexValueObject.data && indexValueObject.data.rate || 0)
                    .format('0%');
            }
        }
        // console.log(indexValueObject);
        const columns = [
            {
                title: '策略id：',
                width: 20,
                dataIndex: 'STRATEGY_ID',
            },
            {
                title: '策略名称：',
                width:70,
                dataIndex: 'STRATEGY_NAME',
            },
            {
                title: '客群筛选',
                width:70,
                dataIndex: 'CUSTOMER_NUM',
                render: value => {
                    return numeral(value).format(indexConfig.format || '0,0');
                },
            },
            {
                title: '执行状态',
                dataIndex: 'operation',
                key: 'operation',
                fixed: 'right',
                width: 70,
                render: (item, index) => {
                    return (
                        <a
                            onClick={e => this.handleItemClick(e, item, index)}
                        >派单</a>
                    );
                },
            },
            
        ];

        // const column=[
        //     {
        //         title: '排名',
        //         width:40 ,
        //         dataIndex: 'STRATEGY_ID',
        //     },
        //     {
        //         title: '区域',
        //         width:90,
        //         dataIndex: 'STRATEGY_NAME',
        //     },
        //     {
        //         title: '任务总量',
        //         width:80,
        //         dataIndex: 'CUSTOMER_NUM',
                
        //     },
        //     {
                
        //         title: '完成数',
        //         width:70,
        //         dataIndex: 'CUSTOMER_NUM',
        //     },
        //     {
                
        //         title: '逾期数',
        //         width:70,
        //         dataIndex: 'CUSTOMER_NUM',
                    
                
        //     },
        //     {
                
        //         title: '完成率',
        //         width:50,
        //         dataIndex: 'CUSTOMER_NUM',
        //     },
        //     {
        //         title: '详情',
        //         dataIndex: 'operation',
        //         width: 50,
        //         render: (item, index) => {
        //             return (
        //                 <a
        //                     onClick={e => this.handleItemClick(e, item, index)}
        //                 >详情</a>
        //             );
        //         },
        //     },

        // ]

        // const  workList =[
        //     {
        //         title: '排名',
        //         width:40 ,
        //         dataIndex: 'STRATEGY_ID',
        //     },
        //     {
        //         title: '工单数',
        //         width:40 ,
        //         dataIndex: 'STRATEGY_ID',
        //     },
        //     {
        //         title: '触达率',
        //         width:40 ,
        //         dataIndex: 'STRATEGY_ID',
        //     },
        //     {
        //         title: '转换率',
        //         width:40 ,
        //         dataIndex: 'STRATEGY_ID',
        //     },
           
        //     {
        //         title: '详情',
        //         width:40 ,
        //         dataIndex: 'STRATEGY_ID',
        //     },
        // ]
        const onFinish = async (value) => {
            console.log('onFinish', value)
            const AD_CODE = this.props.adcode
            const params = {
                AD_CODE: 430000,
                CUSTOM_NUM: 100,
                LEVEL: 10,
                TASK_TYPE: value.TASK_TYPE,
                START_TIME: (new Date(value.START_TIME._d)).toISOString().slice(0, 19).replace('T', ' '),
                END_TIME: (new Date(value.END_TIME._d)).toISOString().slice(0, 19).replace('T', ' '),
                TASK_DESC: value.TASK_DESC,
                DISPATCH_IS_AUTO: 1,
                EXECUTOR_ID: value.EXECUTOR_ID,
                DISPATCHER_NUMBER: 18888888888,
                STRATEGY_ID: value.STRATEGY_ID,
                STRATEGY_NAME: value.STRATEGY_NAME,
                TASK_NAME: value.TASK_NAME,
                TASK_TYPE: value.TASK_TYPE,
                EXECUTOR_ID: value.EXECUTOR_ID,
                DISPATCHER_ID: 1,
                CUSTOM_SCREEN_IDS: value.CUSTOM_SCREEN_IDS
            }
            const response = await axios.post('/new_sq/map/task/taskNotice/insertTask', params);
            console.log('入参', params)
            console.log('回参', response)
            console.log(CUSTOM_SCREEN_IDS)

        }
        //-----属性标签-----//
        const { CheckableTag } = Tag;
        const tagsData = ['单移转融', '流失客户'];
        class HotTags extends React.Component {
            state = {
                selectedTags: ['单移转融'],
            };

            handleChange(tag, checked) {
                const { selectedTags } = this.state;
                const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
                console.log('You are interested in: ', nextSelectedTags);
                this.setState({ selectedTags: nextSelectedTags });
            }

            render() {
                const { selectedTags } = this.state;
                return (
                    <>
                        {/* <span style={{ marginRight: 8 }}>Categories:</span> */}
                        {tagsData.map(tag => (
                            <CheckableTag
                                key={tag}
                                checked={selectedTags.indexOf(tag) > -1}
                                onChange={checked => this.handleChange(tag, checked)}
                            >
                                {tag}
                            </CheckableTag>
                        ))}
                    </>
                );
            }
        }

        const onValuesChange = (changedValues) => {
            const { publicType } = changedValues;
            console.log('onValuesChange', changedValues)
            if (publicType && publicType === '1') {
                this.setState({
                    showPublicUsers: true
                })
            } else {
                this.setState({
                    showPublicUsers: false
                })
            }
        };
        function onChange(date, dateString) {
            console.log(date, dateString);
        }
        const openNotification = () => {
            notification.open({
                description:
                    '派单成功',
                icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            });
        };
        return (
            <div>
                <div
                    className={styles.rightPanelUser}
                    style={{ height: togglePanel ? 'auto' : 40 }}
                // onMouseMove={e => {
                //     e.stopPropagation();
                // }}
                >
                    <div className={styles.rightHeader}>
                        <PanelHeader
                            title={currentAdminName + '策略展示'}
                            toggle={togglePanel}
                            handleClose={this.handleClose}
                            handleToggle={this.handleToggle}
                            ComDom={this.ComDom}
                            mode={this.headerMode}
                        />
                    </div>
                    {
                        togglePanel ? <Scrollbars autoHeight autoHeightMax="calc(100vh - 180px)" className={styles.rightContent}>
                            <Table
                                className={styles.rightTable}
                                bordered
                                rowKey={row => row.adcode}
                                loading={loading}
                                columns={columns}
                                dataSource={valueObject && valueObject.data || []}
                                pagination={false}
                                // scroll={{ y: 500 }}
                                
                            />
                        </Scrollbars> : null
                    }
                </div>


                {/* <div
                    className={styles.rightUser}
                    style={{ height: toggle ? 'auto' : 40 }}
                // onMouseMove={e => {
                //     e.stopPropagation();
                // }}
                >
                    <div className={styles.rightHeader}>
                        <PanelHeader
                            title={currentAdminName + '任务展示'}
                            toggle={togglePanel}
                            handleClose={this.handleClose}
                            handleToggle={this.Toggle}
                            ComDom={this.ComDom}
                            mode={this.headerMode}
                        />
                    </div>
                    {
                        toggle ? <Scrollbars autoHeight autoHeightMax="calc(100vh - 180px)" className={styles.rightContent}>
                            <Table
                                className={styles.rightTable}
                                bordered
                                rowKey={row => row.adcode}
                                loading={loading}
                                columns={column}
                                dataSource={valueObject && valueObject.data || []}
                                pagination={false}
                                scroll={{ y: 500 }}
                                
                            />
                        </Scrollbars> : null
                    }
                </div> */}

                {/* <div
                    className={styles.rightWork}
                    style={{ height: work ? 'auto' : 40 }}
                // onMouseMove={e => {
                //     e.stopPropagation();
                // }}
                >
                    <div className={styles.rightHeader}>
                        <PanelHeader
                            title={currentAdminName + '工单展示'}
                            toggle={togglePanel}
                            handleClose={this.handleClose}
                            handleToggle={this.Work}
                            ComDom={this.ComDom}
                            mode={this.headerMode}
                        />
                    </div>
                    {
                        work ? <Scrollbars autoHeight autoHeightMax="calc(100vh - 180px)" className={styles.rightContent}>
                            <Table
                                className={styles.rightTable}
                                bordered
                                rowKey={row => row.adcode}
                                loading={loading}
                                columns={workList}
                                dataSource={valueObject && valueObject.data || []}
                                pagination={false}
                                scroll={{ y: 500 }}
                                
                            />
                        </Scrollbars> : null
                    }
                </div> */}




                <Modal
                    title='任务派单'
                    width="850px"
                    visible={this.state.createModalVisible}
                    // onOk={this.onHandleOk}   
                    onCancel={this.handleCancel}
                    footer={[]}
                >
                    <div style={{ color: "blue" }}>任务信息</div>
                    <Form
                        onFinish={onFinish}
                        onValuesChange={onValuesChange}
                        initialValues={{ STRATEGY_ID: this.state.clid, STRATEGY_NAME: this.state.clmc }}
                    >
                        <div style={{ marginLeft: '-100px' }}>
                            <Form.Item
                                {...layout}
                                label="任务类型："
                                name="TASK_TYPE"
                            // rules={[{ required: true, message: '请输入任务类型' }]}
                            >
                                <Select style={{ width: 150, paddingLeft: '52px' }} placeholder='营销任务'>
                                    <Option value="01">营销</Option>
                                    <Option value="02">生产</Option>
                                    <Option value="03">服务</Option>
                                    <Option value="04">管理</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div style={{
                            display: 'flex',
                            boxSizing: 'border-box',
                            justifyContent: 'space-between',
                            paddingLeft: '8px',
                            marginTop: '-10px'
                        }}>
                            <div style={{ flex: 1, marginLeft: 15 }}>
                                <Form.Item
                                    {...layout}
                                    label="任务名称："
                                    name="TASK_NAME"
                                // rules={[{ required: true, message: '请输入任务标题' }]}
                                >
                                    <Input style={{ width: 200, height: 80, marginLeft: '53px' }} />
                                </Form.Item>
                            </div>
                            <div style={{ flex: 1, marginLeft: -30 }}>
                                <Form.Item
                                    {...layout}
                                    label="任务描述："
                                    name="TASK_DESC"
                                // rules={[{ required: true, message: '请输入任务描述' }]}
                                >
                                    <Input style={{ width: 200, height: 80, marginLeft: '30px' }} />
                                </Form.Item>
                            </div>
                        </div>
                        <div style={{ display: 'flex', paddingLeft: '55px' }}>
                            <div style={{ flex: 1 }}>
                                <Form.Item
                                    {...layout}
                                    label="任务开始时间："
                                    name="START_TIME"
                                    rules={[{ required: true }]}
                                >
                                    <DatePicker onChange={onChange} style={{ marginLeft: 29 }} />
                                </Form.Item>
                            </div>
                            <div style={{ flex: 1, marginLeft: -4 }}>
                                <Form.Item
                                    {...layout}
                                    label="任务结束时间："
                                    name="END_TIME"
                                    rules={[{ required: true }]}
                                >
                                    <DatePicker onChange={onChange} style={{ marginLeft: 8 }} />
                                </Form.Item>
                            </div>
                        </div>
                        <div style={{ color: "blue", marginTop: '-20px' }}>策略信息</div>
                        <div style={{ display: 'flex', }}>
                            <div style={{ flex: 1, paddingLeft: 10 }}>
                                <Form.Item
                                    {...layout}
                                    label="策略id："
                                    name="STRATEGY_ID"
                                    disabled={true}
                                // rules={[{ required: true, message: '请输入' }]}
                                >
                                    <Input style={{ width: 200, marginLeft: '65px' }} disabled={true} />
                                </Form.Item>
                            </div>
                            <div style={{ flex: 1, marginLeft: -20 }}>
                                <Form.Item
                                    {...layout}
                                    label="策略名称："
                                    name="STRATEGY_NAME"
                                    disabled={true}
                                // rules={[{ required: true }]}
                                >
                                    <Input style={{ width: 200, marginLeft: '29px' }} disabled={true} />
                                </Form.Item>
                            </div>
                        </div>
                        <div style={{ color: "blue", marginTop: '-20px' }}>客群筛选</div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ paddingLeft: 35 }}>
                                <Form.Item
                                    {...layout}
                                    label="省份"
                                    name="AREA_LEVEL"
                                // rules={[{ required: true }]}
                                >
                                    <Select style={{ width: 150, marginLeft: 75 }} placeholder='湖南省' disabled={true} >
                                        {/* <Option value=""></Option> */}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...layout}
                                    label="城市"
                                    name="22"
                                // rules={[{ required: true }]}
                                >
                                    <Input placeholder={currentAdminName} style={{ width: 150, marginLeft: 75 }} disabled={true} />
                                </Form.Item>
                            </div>
                            <div style={{ paddingLeft: 94 }}>
                                <Form.Item
                                    {...layout}
                                    label="属性"
                                    name="CUSTOM_SCREEN_IDS"
                                // rules={[{ required: true }]}
                                >
                                    <div style={{ width: '200px', marginLeft: '58px', marginTop: 6 }}>
                                        <HotTags />
                                    </div>
                                </Form.Item>
                            </div>
                        </div>
                        <div style={{ color: "blue" }}>执行人信息</div>
                        <div style={{ marginLeft: '-80px' }}>
                            <FormItem
                                {...layout}
                                label='执行人选择'
                                name="EXECUTOR_ID"
                            >
                                <Select
                                    // mode="multiple"
                                    placeholder='请选择'
                                    style={{ width: 300, paddingLeft: '40px' }}
                                // rules={[{ required: true, message: '请选择执行人' }]}
                                >
                                    <Option value="王彦璋">王彦璋</Option>
                                    <Option value="崔凯">崔凯</Option>
                                    <Option value="靳自豪">靳自豪</Option>
                                </Select>
                            </FormItem>
                        </div>
                        <div style={{ marginLeft: '200px' }}>
                            <Form.Item {...submitFormLayout}>
                                <Button type="primary" htmlType="submit" style={{ marginRight: 10, width: 100 }} onClick={openNotification}>
                                    派发
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isShowModal: state.spModal.isShowModal,
    tableTitle: state.spModal.tableTitle,
    tableData: state.spModal.tableData,
    adLevel: state.location.adLevel,
    selectedIndex: state.sp.selectedIndex,
    aggrValues: state.sp.aggrValues,
    indexValues: state.sp.indexValues,
    currentAdminName: state.location.currentAdminName,
    location: state.location.location,
});

const mapDispatchToProps = dispatch => ({
    changeModalState(val) {
        dispatch(changeModalState(val));
    },
    changeCodeState(val) {
        dispatch(changeCodeState(val));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RightPanelUser);
