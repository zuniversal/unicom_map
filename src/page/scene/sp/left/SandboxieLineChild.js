import React from 'react';
import styles from './SandboxieLineChild.module.less';

const SandboxieLineChild = props => {
    const {
        active,
        value,
        parentKey,
        childKey,
    } = props;
    const handleClick = () => {
        const {
            onClick,
            name,
        } = props;
        onClick && onClick(name, parentKey, childKey);
    };
    return (
        <div
            onClick={handleClick}
            className={`${styles.sandboxieChild} ${active ? styles.sandboxieChildActive : ''}`}
        >
            {value}
        </div>
    );
};

export default SandboxieLineChild;

SandboxieLineChild.defaultProps = {
    parentKey: '',
    childKey: [],
};