// 支持展开折叠的panel
import React from 'react';

export default class PanelContainer extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
