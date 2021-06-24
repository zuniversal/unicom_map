import React, {Component} from 'react';
import {Modal, message, Button, Input} from 'antd';
import {connect} from 'react-redux';
import {changeModalState, changeCodeState} from '@/app/reducer/sp/spModal';
import './ModalCard.less';
import axios from 'axios';
import qs from 'qs';
class ModalCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowSureModal: false,
            inputValue: '',
            PROVINCE_CODE: 74, // 省分编码,湖南固定
        };
    };

    handleCancel = () => {
        this.props.changeModalState(false);
    };
    handleSureCancel = () => {
        this.setState({
            isShowSureModal: false,
        });
    };
    handleSure = () => {
        this.props.changeModalState(false);
        this.setState({
            isShowSureModal: true,
        });
    };
    async handleSave() {
        const gotoliuzhuang = 'http://10.242.37.162/portalweb/zhyysso/dockmenu';
        const tokenApi = 'http://10.0.228.46:9001/token';
        try {
            // 获取token信息
            let data = await axios.get(tokenApi);
            const {targetId, tokenVO: {appId, loginId, token}} = data.data.data;
            const {PROVINCE_CODE, EPARCHY_CODE} = this.props;
            const params = {
                appId,
                loginId,
                token,
                menuCode: 'taskschedue',
                TARGET_ID: targetId, // 任务目标id
                PROVINCE_CODE, // 省分编码
                EPARCHY_CODE, // 地市编码，-1为省分调配
                COUNTY_CODE: -1, // 区县编码，-1为地市调配
                GRID_CODE: -1, // 网格编码，-1为区县调配
                DISPATCHER_ID: '6666', // 操作人id
                TASK_TYPE: 'single', // 任务类型
                TARGET_NUM: '1000', // 目标数量
                TARGET_LABEL: 'three', // 目标标签
                SIGN: 'source', // 系统来源:
                SIGN_TYPE: 'three', // 系统来源类型
            };
            window.open(gotoliuzhuang + '?' + qs.stringify(params));
            this.props.changeModalState(false);
        } catch (err) {
            message.error('网络错误');
        };
    };
    inputChange = e => {
        this.setState({
            inputValue: e.target.value,
        });
    };
    render() {
        const {
            isShowModal,
        } = this.props;
        return (
            <div className="table-wrap">
                <Modal centered className="table-wrap_client" title='客户群名称设置' visible={isShowModal} onCancel={this.handleCancel} >
                    <div className="client_wrap">
                        <span className="client_wrap_name">客户名称</span>
                        <Input onChange={e => this.inputChange(e)} className="client_wrap_input" placeholder='请输入' />
                    </div>
                    <Button onClick={() => this.handleSave()} className="my-btn" type="primary">保存并派单</Button>
                </Modal>
            </div>
        );
    }

};
const mapStateToProps = state => ({
    isShowModal: state.spModal.isShowModal,
    PROVINCE_CODE: state.spModal.PROVINCE_CODE,
    EPARCHY_CODE: state.spModal.EPARCHY_CODE,
});

const mapDispatchToProps = dispatch => ({
    changeModalState(val) {
        dispatch(changeModalState(val));
    },
    changeCodeState(val) {
        dispatch(changeCodeState(val));
    },
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalCard);