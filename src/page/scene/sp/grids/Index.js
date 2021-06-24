import React from 'react';
import {connect} from 'react-redux';
import styles from './Grids.module.less'
import PanelHeader from '@/components/common/PanelHeader';
import {Scrollbars} from "react-custom-scrollbars";
import {Table, message, Divider, Form, Input, Modal, Button, DatePicker, Select, Radio} from 'antd';
import {changeLocation} from '../../../../app/reducer/common/location'
import axios from "axios";
const FormItem = Form.Item;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const submitFormLayout = {
    wrapperCol: {
        span: 10,
        offset: 8,
    },
};

class Index extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            togglePanel: true,
        }
    }
    handleToggle = () => {
        this.setState({togglePanel: !this.state.togglePanel});
    };
    handleClose = () => {
        // this.props.changeSelectedPoint(undefined);
        // this.props.changeSelectedVillage(undefined);
    };
    handleInputChange = (e) => {
        console.log('handleInputChange e ==>', e)
    }
    render() {
        const {togglePanel, bounddary} = this.state;
        const onFinish = async (value) => {
            const AD_CODE = this.props.adcode
            const GRID_BORDER = localStorage.getItem('POLYGON')
            const params = {
                AD_CODE: AD_CODE,
                GRID_CODE: value.GRID_CODE,
                GRID_NAME: value.GRID_NAME,
                EXECUTOR_ID: value.EXECUTOR_ID,
                OPERATOR_ID: '666',
                GRID_BORDER: GRID_BORDER,
            }
            // const response = await axios.get('/hu_sand/community/getCount', {params});
            console.log('添加网格 入参 ==> ', params)
            // console.log('添加网格 回参 ==> ', response)
        }
        const onValuesChange = (changedValues) => {
            changedValues.polygon = this.state.bounddary
            // console.log('onValuesChange ==> ', changedValues)
        };
        return (
            <div className={styles.gridsPanelUser}>
                <div>
                    <PanelHeader
                        title={'网格信息管理'}
                        toggle={togglePanel}
                        handleClose={this.handleClose}
                        handleToggle={this.handleToggle}
                        ComDom={this.ComDom}
                        mode={this.headerMode}
                    />
                </div>
                {togglePanel? <Scrollbars autoHeight autoHeightMax="calc(100vh - 180px)" className={styles.gridsContent}>
                    <Form
                        onFinish={onFinish}
                        onValuesChange={onValuesChange}
                        initialValues={{EXECUTOR_ID: '1'}}
                    >
                        <Form.Item
                            {...layout}
                            label="网格编码："
                            name="GRID_CODE"
                            rules={[{ required: true, message: '请输入网格编码' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            {...layout}
                            label="网格名称："
                            name="GRID_NAME"
                            rules={[{ required: true, message: '请输入网格名称' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            {...layout}
                            label="网格坐标："
                           name="polygon"
                        >
                            <div>
                                <Input type='number' className={styles.gridsLeftInput} placeholder={'经度'} onChange={(e) => this.handleInputChange(e)} />
                               <Input className={styles.gridsRightInput} placeholder={'纬度'} value={''} />
                            </div>
                        </Form.Item> 
                        <Form.Item
                            {...layout}
                            label="小CEO："
                            name="EXECUTOR_ID"
                            rules={[{ required: true, message: '请选择网格管理员' }]}
                        >
                            <Select placeholder="请选择" style={{ width: '100%' }}>
                                <Select.Option value="1">管理员1</Select.Option>
                                <Select.Option value="2">管理员2</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...submitFormLayout}>
                            <Button type="primary" htmlType="submit" style={{marginRight: 10}}>
                                保存
                            </Button>
                            <Button type="danger" onClick={this.handleClose}>
                                删除
                            </Button>
                        </Form.Item>
                    </Form>
                </Scrollbars>: null}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    adcode: state.location.adcode,
});

const mapDispatchToProps = {
    changeLocation,
};

export default connect(mapStateToProps,mapDispatchToProps)(Index)
