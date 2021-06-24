import React from 'react';
import styles from './SandboxieItem.module.less';
import numeral from 'numeral';

const SandboxieItem = props => {
    const {
        label,
        value,
        icon,
        active,
        format = '0,0',
        loading,
    } = props;
    let showValue = '-';
    if (loading) {
        showValue = '';
    }
    else {
        if (value !== undefined && value !== null) {
            showValue = numeral(value).format(format);
        }
    }
    const handleClick = () => {
        console.log(' handleClick ： ', props   )// 
        const {
            onClick,
            name,
            reqType,
        } = props;
        onClick && onClick(name, {reqType});
    };
    return (
        <div
            onClick={handleClick}
            className={`${styles.buildItem} ${active ? styles.buildItemActive : null}`}
        >
            {
                active && <i
                    className={styles.sandboxieChecked}
                    style={{background: 'url(' + process.env.PUBLIC_URL + '/image/sp/iconChecked.png' + ') no-repeat center', backgroundSize: '100% 100%'}}
                >
                </i>
            }
            <i
                className={styles.buildItemIcon}
                style={{backgroundImage: 'url(' + icon + ')'}}
            ></i>
            <div className={styles.buildItemDatas}>
                <span className={styles.buildItemName}>
                    {label}
                </span>
                <span className={styles.buildItemValue}>
                    {showValue}
                </span>
            </div>
        </div>
    );
};

export default SandboxieItem;