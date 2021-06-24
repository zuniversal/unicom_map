import React from 'react';
import styles from './SandboxieLine.module.less';
import numeral from 'numeral';

const SandboxieLine = props => {
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
        showValue = '......';
    }
    else {
        if (value !== undefined && value !== null) {
            showValue = numeral(value).format(format);
        }
    }
    const handleClick = () => {
        const {
            onClick,
            name,
        } = props;
        onClick && onClick(name);
    };
    return (
        <div
            onClick={handleClick}
            className={`${styles.sandboxieLine} ${active ? styles.sandboxieLineActive : null}`}
        >
            {
                active && <i
                    className={styles.sandboxieChecked}
                    style={{background: 'url(' + process.env.PUBLIC_URL + '/image/sp/iconChecked.png' + ') no-repeat center', backgroundSize: '100% 100%'}}
                >
                </i>
            }
            <div className={styles.sandboxieDatas}>
                <i
                    className={styles.sandboxieIcon}
                    style={{backgroundImage: 'url(' + icon + ')', backgroundSize: '100% 100%'}}
                ></i>
                <span className={styles.sandboxieName}>
                    {label}
                </span>
            </div>
            {
                value && <div className={styles.sandboxieValue}>
                    {showValue}
                </div>
            }
        </div>
    );
};

export default SandboxieLine;