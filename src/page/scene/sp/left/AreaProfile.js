import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import RegionHeader from '@/components/common/RegionHeader';
import styles from './AreaProfile.module.less';
import SandboxieItem from './SandboxieItem';
import {
    toggleIndex,
} from '../../../../app/reducer/sp/index';
import {areaItemsConfig} from '../common/indices';
import {getViewType} from '../common/admin';

const AreaProfile = props => {
    const {
        selectedIndex,
        selectedIndices,
        indexValues,
        adLevel,
    } = props;
    const handleItemClick = (index, params) => {
        console.log(' handleItemClick ： ', index, params   )// 
        props.toggleIndex({
            index,
            adcode: props.adcode,
            level: props.adLevel,
            aggrValues: props.aggrValues,
            selectedIndex: props.selectedIndex,
            selectedIndices: props.selectedIndices,
            reqType: params.reqType,
        });
    };
    const viewType = getViewType(adLevel);
    return (
        <div className={styles.container}>
            {areaItemsConfig.map(group => {
                return (<Fragment key={group.key}>
                    <RegionHeader title={group.label} />
                    <div className={styles.areaList}>
                        {group.children.map(item => {
                            const indexObject = indexValues[item.key];
                            let active = null;
                            if (viewType === 1) {
                                active = item.key === selectedIndex;
                            }
                            else {
                                active = !!selectedIndices[item.key];
                            }
                            return (
                                <SandboxieItem
                                    name={item.key}
                                    label={item.label}
                                    loading={!indexObject}
                                    key={item.key}
                                    value={indexObject && indexObject.data && indexObject.data.value}
                                    active={active}
                                    format={item.format}
                                    icon={`${process.env.PUBLIC_URL}/image/${item.icon}`}
                                    onClick={handleItemClick}
                                    reqType={item.reqType}
                                />
                            );
                        })}
                    </div>
                </Fragment>);
            })}
        </div>
    );
};


const mapStateToProps = state => ({
    selectedIndex: state.sp.selectedIndex,
    selectedIndices: state.sp.selectedIndices,
    indexValues: state.sp.indexValues,
    aggrValues: state.sp.aggrValues,
    adcode: state.location.adcode,
    adLevel: state.location.adLevel,
});

const mapDispatchToProps = {
    toggleIndex,
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaProfile);