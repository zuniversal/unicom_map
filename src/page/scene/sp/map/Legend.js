import {connect} from 'react-redux';
import styles from './Legend.module.less';
const Legend = props => {
    if (props.adLevel > 3 || !props.selectedIndex) {
        return null;
    }
    return (<div className={styles.container}>
        <div className={styles.inner}>
            <div className={styles.text1}>低</div>
            <div className={styles.bar}></div>
            <div className={styles.text2}>高</div>
        </div>
    </div>);
};

export default connect(state => {
    return {
        selectedIndex: state.sp.selectedIndex,
        adLevel: state.location.adLevel,
    };
}, {})(Legend);