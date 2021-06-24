/* global BMapGL */
import {CustomOverlay} from 'react-bmapgl';
import styles from './infoWindowWrap.module.less';

export default function UserInfo(props) {

    let position = props.position || [];
    let offset = props.offset || [0, -88];
    let infoWindowWrapOption = props.infoWindowWrapOption || {}; // 弹框的样式
    let triangleOption = props.triangleOption || {}; // 小三角的样式

    return (
        <CustomOverlay
            {...props}
            position={new BMapGL.Point(...position)}
            offset={new BMapGL.Size(...offset)}
            zIndex={9999}
        >
            <div className={props.wrapClassName || styles.infoWindowWrap} style={{...infoWindowWrapOption}}>
                {props.children && props.children}
                <span className={styles.triangle} style={{...triangleOption}}></span>
            </div>
        </CustomOverlay>
    );
}