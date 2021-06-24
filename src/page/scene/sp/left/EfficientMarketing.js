import React from 'react';
import {connect} from 'react-redux';
import styles from './EfficientMarketing.module.less';
import SandboxieLine from './SandboxieLine';
import {
    toggleIndex,
} from '../../../../app/reducer/sp/index';
import {modelItemsConfig} from '../common/indices';

const EfficientMarketing = props => {
    const {
        selectedIndex,
        indexValues,
    } = props;
    const handleItemClick = index => {
        props.toggleIndex({
            index,
            adcode: props.adcode,
            level: props.adLevel,
            aggrValues: props.aggrValues,
            selectedIndex: props.selectedIndex,
            selectedIndices: props.selectedIndices,
        });
    };
    return (
        <div className={styles.container}>
            <section className={styles.areaList}>
                {
                    modelItemsConfig.map(group => {
                        return (
                            group.children.map(item => {
                                return (
                                    <div
                                        className={styles.sandboxieBox}
                                        key={item.key}
                                    >
                                        <SandboxieLine
                                            key={item.key}
                                            active={item.key === selectedIndex}
                                            name={item.key}
                                            label={item.label}
                                            icon={`${process.env.PUBLIC_URL}/image/${item.icon}`}
                                            format={item.format}
                                            onClick={handleItemClick}
                                        />
                                    </div>
                                );
                            })
                        );
                    })
                }
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(EfficientMarketing);