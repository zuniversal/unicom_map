import React from 'react';
import {connect} from 'react-redux';
import styles from './UserProfile.module.less';
import SandboxieLine from './SandboxieLine';
import SandboxieLineChild from './SandboxieLineChild';
import {
    toggleIndex,
} from '../../../../app/reducer/sp/index';
import {userItemsConfig} from '../common/indices';

const UserProfile = props => {
    const {
        selectedIndex,
        indexValues,
    } = props;
    const handleItemClick = (index, parentKey, keyChild) => {
        props.toggleIndex({
            index,
            parentKey,
            keyChild,
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
                    userItemsConfig.map(item => {
                        const indexObject = indexValues[item.key];
                        const active = item.key === selectedIndex || item.keyChild?.includes(selectedIndex);
                        return (
                            <div
                                className={styles.sandboxieBox}
                                key={item.key}
                            >
                                <SandboxieLine
                                    active={active}
                                    name={item.key}
                                    label={item.label}
                                    icon={`${process.env.PUBLIC_URL}/image/${item.icon}`}
                                    format={item.format}
                                    onClick={handleItemClick}
                                    value={indexObject && indexObject.data && indexObject.data.value}
                                />
                                {/* 子级选项 */}
                                {
                                    (item?.children?.length > 0 && active) && <div className={styles.sandboxieChild}>
                                        {
                                            item.children && item.children.map(ele => {
                                                const activeChild = ele.key === selectedIndex;
                                                return (
                                                    <SandboxieLineChild
                                                        active={activeChild}
                                                        loading={!indexObject}
                                                        value={ele.label}
                                                        key={ele.key}
                                                        name={ele.key}
                                                        parentKey={item.key}
                                                        childKey={item.keyChild || []}
                                                        onClick={handleItemClick}
                                                    />
                                                );
                                            })
                                        }
                                    </div>
                                }
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
