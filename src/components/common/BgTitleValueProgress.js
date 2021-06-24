import React from 'react';
import {Progress} from 'antd';
import styles from './BgTitleValueProgress.module.less';
export default function BgTitleValue(props) {
    const {title, value, rectWidth = '186px', percent} = props;
    return (
        <div className={styles.container} style={{width: rectWidth}}>
            <div className={styles.textContainer}>
                <span className={styles.title}>{title}</span>
                <div className={styles.secondRow}>
                    <span className={styles.value}>{value}</span>
                </div>
            </div>
            <div className={styles.progressContainer}>
                <Progress
                    type="circle"
                    strokeColor={{
                        '0%': '#4067FF',
                        '100%': '#46A0FF',
                    }}
                    // success={{percent: 'number'}}
                    width={36}
                    percent={percent}
                    format={
                        percent => parseInt(percent) + '%'
                    }
                />
            </div>
        </div>
    );
}
