import {useEffect} from 'react';
import {DoubleRightOutlined, CloseOutlined} from '@ant-design/icons';
import RegionHeader from '@/components/common/RegionHeader';
import styles from './PanelHeader.module.less';

export default props => {
    const PANEL_HEADER_MODE_CLOSE = 1;
    useEffect(() => {
        if (props.mode === PANEL_HEADER_MODE_CLOSE && !props.toggle) {
            props.handleToggle();
        }
    }, [props.title]);

    return (
        <div className={styles.headerContainer}>
            <RegionHeader title={props.title} />
            {
                props.ComDom ? props.ComDom : null
            }
            {props.mode === PANEL_HEADER_MODE_CLOSE ? (
                <div
                    className={styles.closeBtn}
                    onClick={props.handleClose}
                >
                    <CloseOutlined />
                </div>
            ) : (
                <div
                    className={
                        (styles.toggleBtn,
                        props.toggle ? styles.toggleOffBtn : styles.toggleOnBtn)
                    }
                    onClick={props.handleToggle}
                >
                    <DoubleRightOutlined />
                </div>
            )}
        </div>
    );
};
