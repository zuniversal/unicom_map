import React, { PureComponent } from 'react';
import styles from './RightPanelCommunity.module.less';
import { connect } from 'react-redux';
import { changeModalState } from '@/app/reducer/sp/spModal';
import PanelHeader from '@/components/common/PanelHeader';
import { Table, Button } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import { getIndexConfig } from '../common/indices';
import { getLevelLabel } from '../common/admin';
import numeral from 'numeral';
import TaskTable from './TaskTable'// 
import WorkTable from './WorkTable'// 
class RightPanelCommunity extends PureComponent {
    constructor(params) {
        super(params);
        this.state = {
            panelHeight: 0,
            togglePanel: true,
            total: 20,
            pageSize: 9, // 每页条数
            current: 1, // 当前页码
        };
    }
    handleToggle = () => {
        this.setState({ togglePanel: !this.state.togglePanel });
    };
    handleClose = () => {
        this.props.changeSelectedPoint(undefined);
        this.props.changeSelectedVillage(undefined);
    };
    renderTable = params => {
        console.log('    renderTable ： ', params, this.state, this.props,  )
        const {
            selectedIndex,
            aggrValues,
            adLevel,
            currentAdminName,
        } = this.props;
        let valueObject = aggrValues[selectedIndex];
        let loading = !valueObject;

        const tableProps = {
            className: styles.rightTable,
            bordered: true,  
            rowKey: row => row.AD_CODE,
            loading: loading,
            dataSource: (valueObject && valueObject.data || []).map((v, index) => ({...v, index: index + 1})),
            pagination: false,
            scroll: { y: 500 },
        }
        const Table = selectedIndex === 'station_fan' ? WorkTable : TaskTable//  
        console.log('  Table ：', Table, selectedIndex,  )// 
        return <Table {...tableProps}  /> 
    }

    render() {
        const {
            selectedIndex,
            aggrValues,
            adLevel,
            currentAdminName,
        } = this.props;
        const indexConfig = getIndexConfig(selectedIndex);
        const { togglePanel } = this.state;
        let valueObject = aggrValues[selectedIndex];
        let loading = !valueObject;

        const columns = [
            {
                title: '排名',
                dataIndex: 'ranking',
                render: (value, row, index) => {
                    return index + 1;
                },
            },
            {
                title: getLevelLabel(adLevel + 6),
                // width: 90,
                dataIndex: 'name',
            },
            {
                title: getLevelLabel(adLevel + 7),
                width: 50,
                dataIndex: 'name',
            },
            {
                title: getLevelLabel(adLevel + 8),
                width: 50,
                dataIndex: 'name',
            },
            {
                title: getLevelLabel(adLevel + 9),
                width: 50,
                dataIndex: 'name',
            },
            {
                title: getLevelLabel(adLevel + 10),
                width: 50,
                dataIndex: 'name',
            },
            {
                title: getLevelLabel(adLevel + 15),
                width: 60,
                dataIndex: 'name',
                render: (text, record, index) => {
                    return (
                        <>
                            {
                                <Button block size='small' href='/nrvp/scene/work'>查看</Button>
                            }
                        </>
                    )
                }
            },
        ];

        return (
            <div
                className={styles.rightPanel}
                style={{ height: togglePanel ? 'auto' : 40 }}
            // onMouseMove={e => {
            //     e.stopPropagation();
            // }}
            >
                <div className={styles.rightHeader}>
                    <PanelHeader
                        title={currentAdminName + indexConfig.label + '情况'}
                        toggle={togglePanel}
                        handleClose={this.handleClose}
                        handleToggle={this.handleToggle}
                        ComDom={this.ComDom}
                        mode={this.headerMode}
                    />
                </div>
                {
                    togglePanel ? <Scrollbars autoHeight autoHeightMax="calc(100vh - 180px)" className={styles.rightContent}>
                        {/* <Table
                            className={styles.rightTable}
                            bordered
                            rowKey={row => row.adcode}
                            loading={loading}
                            columns={columns}
                            dataSource={valueObject && valueObject.data || []}
                            pagination={false}
                            scroll={{ y: 500 }}
                        /> */}
                        {this.renderTable()}
                    </Scrollbars> : null
                }
            </div>
        );
    }
}

RightPanelCommunity.defaultProps = {
    headTitle: '湖南省住宅小区概况',
    contentType: '城市',
};

const mapStateToProps = state => ({
    isShowModal: state.spModal.isShowModal,
    tableTitle: state.spModal.tableTitle,
    tableData: state.spModal.tableData,
    adLevel: state.location.adLevel,
    selectedIndex: state.sp.selectedIndex,
    aggrValues: state.sp.aggrValues,
    currentAdminName: state.location.currentAdminName,
});

const mapDispatchToProps = dispatch => ({
    changeModalState(val) {
        dispatch(changeModalState(val));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RightPanelCommunity);