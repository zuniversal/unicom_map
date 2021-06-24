import React from 'react';
import {connect} from 'react-redux';
import RightPanelUser from './RightPanelUser';
import RightPanelCommunity from './RightPanelCommunity';
import {
    getIndexCategory,
} from '../common/indices';
import {getViewType} from '../common/admin';
class Index extends React.Component {

    render() {
        const {
            adLevel,
            selectedIndex,
        } = this.props;
        if (!selectedIndex) {
            return null;
        }
        const indexCategory = getIndexCategory(selectedIndex);
        const viewType = getViewType(adLevel);

        if (indexCategory === 'area'
            || selectedIndex === 'village_single_move'
            || selectedIndex === 'village_single_broad'
            || selectedIndex === 'village_fuse_user') {
            if (viewType === 1) {
                return (<>
                    <RightPanelCommunity />
                </>);
            }
            return null;
        }
        else if (indexCategory === 'user' || indexCategory === 'model') {
            return (<>
                <RightPanelUser />
            </>);
        }

        return null;
    }
}

const mapStateToProps = state => {
    return {
        adcode: state.location.adcode,
        adLevel: state.location.adLevel,
        selectedIndex: state.sp.selectedIndex,
    };
};
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(Index);