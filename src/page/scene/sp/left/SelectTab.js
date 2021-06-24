import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Tabs, Card, Select } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import AreaProfile from './AreaProfile';
import UserProfile from './UserProfile';
import EfficientMarketing from './EfficientMarketing';
import styles from './SelectTab.module.less';
import { Scrollbars } from 'react-custom-scrollbars';

import {
    changeLeftTab,
} from '../../../../app/reducer/sp/index';

export class SelectTab extends Component {
    static propTypes = {}

    constructor(params) {
        super();
        this.state = {
            disableReset: false,
        };
    }

    handleClear = () => {
        const { clearAllSelect } = this.props;
        if (clearAllSelect) {
            clearAllSelect();
        }
    }

    handleTabChange = activeKey => {
        this.props.changeLeftTab(activeKey);
    }

    componentDidUpdate(prevProps, prevState) {
        // if (JSON.stringify(this.props.treeCheckedKeys) !== JSON.stringify(prevProps.treeCheckedKeys)
        // || this.props.odLineHide !== prevProps.odLineHide) {
        //     if (this.props.treeCheckedKeys.length === 0) {
        //         this.setState({disableReset: false});
        //     }
        //     else if (this.props.treeCheckedKeys.length > 0) {
        //         this.setState({disableReset: true});
        //     }

        //     if (!this.props.odLineHide) {
        //         this.setState({disableReset: true});
        //     }
        // }
    }

    render() {
        const {
            leftTab,
        } = this.props;
        const children = [];
        // for (let i = 10; i < 36; i++) {
        //     children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
        // }

        function handleChange(value) {
            console.log(`selected ${value}`);
        }
        // const layout = {
        //     labelCol: { span: 6 },
        //     wrapperCol: { span: 18 },
        // };
        // const submitFormLayout = {
        //     wrapperCol: {
        //         span: 10,
        //         offset: 6,
        //     },
        // };
        return (
            <div className={styles.container}>
                <Tabs
                    style={{ height: '100%' }}
                    // activeKey={leftTab}
                    defaultActiveKey
                    tabBarGutter={0}
                    // size={'middle'}
                    tabPosition={'top'}
                    onChange={this.handleTabChange}
                >
                    <Tabs.TabPane
                        tab={
                            <span>
                                任务调度
                                {/* {leftTab === '1' ? <DownOutlined /> : <UpOutlined />} */}
                            </span>
                        }
                        key='1'
                    >
                        <Scrollbars
                            className={styles.tabPaneContanier}
                            autoHeight
                            autoHeightMax="calc(100vh - 180px)"
                        >
                            <AreaProfile />
                        </Scrollbars>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={
                            <span>
                                策略展示
                                {/* {leftTab === '2' ? <DownOutlined /> : <UpOutlined />} */}
                            </span>
                        }
                        key='2'
                    >
                        {/* <Scrollbars
                            className={styles.tabPaneContanier}
                            autoHeight
                            autoHeightMax="calc(100vh - 180px)"
                        >
                            <UserProfile />
                        </Scrollbars> */}
                        <Card>
                            <Card>
                                任务大类：
                                <Select style={{ width:'70%'}} />
                            </Card>
                            <Card>
                                任务小类：
                                <Select style={{ width:'70%'}} />
                            </Card>
                            <Card>
                                策略大类：
                                <Select style={{ width:'70%'}} />
                            </Card>
                            <Card>
                                策略小类：
                                <Select style={{ width:'70%'}} />
                            </Card>
                        </Card>
                    </Tabs.TabPane>
                    <Tabs.TabPane
                        tab={
                            <span>
                                策略创建
                                {/* {leftTab === '3' ? <DownOutlined /> : <UpOutlined />} */}
                            </span>
                        }
                        key='3'
                    >
                        <Scrollbars
                            className={styles.tabPaneContanier}
                            autoHeight
                            autoHeightMax="calc(100vh - 180px)"
                        >
                            <EfficientMarketing />
                        </Scrollbars>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    leftTab: state.sp.leftTab,
    leftIndex: state.sp.leftIndex,
});

const mapDispatchToProps = {
    changeLeftTab,
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectTab);
