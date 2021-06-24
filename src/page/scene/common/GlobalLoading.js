import {Spin} from 'antd';
import {useSelector} from 'react-redux';
import styles from './GlobalLoading.module.less';

export default () => {
    const loading = useSelector(state => state.global.loadingCount) > 0;
    return (<div className={`${styles.container} ${loading ? '' : styles.hidden}`}>
        <Spin spinning tip='加载中' />
    </div>);
};