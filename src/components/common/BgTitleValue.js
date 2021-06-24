import React from 'react';
import {FallOutlined, RiseOutlined} from '@ant-design/icons';
import styles from './BgTitleValue.module.less';
import numeral from 'numeral';
import DataUpAndDown from './DataUpAndDown';
export default function BgTitleValue(props) {
    const {title, value, rectWidth = '186px', rectHeight = '58px', statisOption, formater = '0,0'} = props;
    let formatValue = '';
    if (formater) {
        if ((value + '').includes('|')) {
            formatValue = value.split('|').map(item => numeral(item).format(formater)).join('|');
        }
        else {
            formatValue = numeral(value).format(formater);
        }
    }
    return (
        <div className={styles.container} style={{width: rectWidth, height: rectHeight}}>
            <span className={styles.title}>{title}</span>
            <div className={styles.secondRow}>
                <span className={styles.value}>{formater ? formatValue : value}</span>
                {
                    statisOption ? (
                        <DataUpAndDown
                            isRise={statisOption.isRise}
                            percent={statisOption.percent}
                            contentText={statisOption.contentText}
                        />
                    )
                        : null
                }
            </div>
        </div>
    );
}