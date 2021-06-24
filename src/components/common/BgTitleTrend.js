import React from 'react';
import {FallOutlined, RiseOutlined} from '@ant-design/icons';
import styles from './BgTitleTrend.module.less';
export default function BgTitleTrend(props) {
    const {rectWidth = '186px', statisOption} = props;
    return (
        <div className={styles.container} style={{width: rectWidth}}>
            <div className={styles.secondRow}>
                {
                    statisOption ? (
                        statisOption.isRise
                            ? (<div className={styles.optionContainerRise}>
                                <RiseOutlined />
                                <span className={styles.optionText}>{statisOption.contentText}</span>
                            </div>)
                            : (<div className={styles.optionContainerFall} ><FallOutlined /><span className={styles.optionText}>{statisOption.contentText}</span>
                            </div>
                            ))
                        : null
                }
            </div>
        </div>
    );
}
