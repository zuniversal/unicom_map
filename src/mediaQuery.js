import React from 'react';
import {connect} from 'react-redux';
import {
    setIsMobile,
} from './app/reducer/global';

export default () => Comp => {

    class MediaQuery extends React.Component {

        componentDidMount() {
            this.props.setIsMobile(this.getIsMobile());
            window.addEventListener('resize', this.handleWindowResize);
        }

        handleWindowResize = () => {
            const isMobile = this.getIsMobile();
            if (isMobile !== this.props.isMobile) {
                this.props.setIsMobile(isMobile);
            }
        }

        getIsMobile = () => {
            return window.matchMedia('(max-width: 768px)').matches;
        }

        componentWillUnmount() {
            window.removeEventListener('resize', this.handleWindowResize);
        }

        render() {
            return <Comp {...this.props} />;
        }
    }

    return connect(state => ({
        isMobile: state.global.isMobile,
    }), {
        setIsMobile,
    })(MediaQuery);
};