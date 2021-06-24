/*
 * @Descripttion: 区域总览地图提示
 * @version: v1.0.0
 * @Author: fanweijun
 * @Date: 2021-05-03 17:24:25
 * @LastEditors: fanweijun
 * @LastEditTime: 2021-05-03 18:13:18
 */
import styles from './AreaMapTip.module.less';
import {EnvironmentOutlined} from '@ant-design/icons';

export default function AreaMapTip(props) {
    const {
        name, value, cityName,
    } = props.data;
    return (
        <div className={styles.tipContainer}>
            <div className={styles.positionWrap}>
                <EnvironmentOutlined />
                <span className={styles.cityText}>{cityName}</span>
            </div>
            <div className={styles.valueWrap}>
                <span className={styles.nameText}>{name}</span>
                <span className={styles.valueText}>{value}</span>
            </div>
            <span className={styles.arrow}></span>
        </div>
    );
}
