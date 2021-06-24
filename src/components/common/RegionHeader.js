/*
 * @Descripttion: 标题组件
 * @version: v1.0.0
 * @Author: fanweijun
 * @Date: 2021-03-23 09:44:51
 * @LastEditors: fanweijun
 * @LastEditTime: 2021-04-01 15:18:32
 */
/* eslint-disable react/no-array-index-key */
import styles from './RegionHeader.module.less';

export default function RegionHeader(props) {
    const {title, custom, signStyle, fontStyle} = props;
    return (
        <div className={styles.headerContainer}>
            <div
                className={styles.sign}
                style={signStyle}
            ></div>
            <span
                className={styles.title}
                style={fontStyle}
            >
                {title}
            </span>
            {custom && custom()}
        </div>
    );
};
RegionHeader.defaultProps = {
    title: '-',
    custom: null,
    fontStyle: {
        fontSize: '14px',
    },
    signStyle: {
        width: '4px',
        height: '16px',
    },
};
