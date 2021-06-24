import React from 'react';
import {connect} from 'react-redux';
import Left from './left/Index';
import Right from './right/Index';
import Map from './map/Index';
import Grids from './grids/Index';
import Legend from './map/Legend';
import styles from './Index.module.less';
import ModalCard from './components/ModalCard';
import {allIndices} from './common/indices';
import {
    fetchIndexValue,
    clearAllValues,
    fetchSelectedAggrValues,
} from '../../../app/reducer/sp/index';
import {closeDrawingManager, openDrawingManager} from "../../../app/reducer/global";
class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawingManagerOpen: false
        };
    }

    componentDidMount() {
        this.fetchSumValues();
    }

    fetchSumValues = () => {
        this.props.clearAllValues();
        const {
            adcode,
            adLevel,
            selectedIndices,
            selectedIndex,
            isDrawingManagerOpen
        } = this.props;
        // 左侧数据 - 废弃
        // for (const index of allIndices) {
        //     this.props.fetchIndexValue({
        //         adcode,
        //         level: adLevel,
        //         index,
        //     });
        // }
        this.props.fetchSelectedAggrValues({
            adcode,
            level: adLevel,
            selectedIndex,
            selectedIndices,
        });

    }

    render() {
        return (
            <div className={styles.contanier}>
                <Map />
                <Left />
                {this.props.isDrawingManagerOpen ? (<Grids />):(<Right />)}
                <Legend />
                <ModalCard />
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.adcode !== this.props.adcode) {
            this.fetchSumValues();
        }
    }
}

export default connect(state => {
    return {
        adcode: state.location.adcode,
        adLevel: state.location.adLevel,
        selectedIndex: state.sp.selectedIndex,
        selectedIndices: state.sp.selectedIndices,
        isDrawingManagerOpen: state.global.isDrawingManagerOpen,
    };
}, {
    fetchIndexValue,
    clearAllValues,
    fetchSelectedAggrValues,
    openDrawingManager,
    closeDrawingManager,
})(Index);
