import React, {Component} from 'react';

const errorBoundaryStyle = {
    background: 'transparent',
    width: '100%',
    padding: '10px',
};

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            errorInfo: null,
        };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
        // You can also log error messages to an error reporting service here
    }

    /**
     * @returns children with props 在此处无需使用，将props.message传给子组件没有意义
     * @memberof ErrorBoundary
     */
    renderChildren() {
        const {children, ...restProps} = this.props;
        if (!children) {
            return;
        }

        return React.Children.map(children, child => {
            if (child) {
                return React.cloneElement(child, {
                    ...restProps,
                });
            }

        });
    }

    render() {
        if (this.state.errorInfo) {
            // Error path
            return (
                <div style={errorBoundaryStyle}>
                    <h3 style={{margin: 0}}>{this.props.message}</h3>
                    <details style={{whiteSpace: 'pre-wrap'}}>
                        {this.state.error && this.state.error.toString()}
                        {this.state.errorInfo.componentStack}
                    </details>
                </div>
            );
        }

        // Normally, just render children
        // return this.props.children;
        return (<React.Fragment>
            {this.props.children}
            {/* {this.renderChildren()} */}
        </React.Fragment>);

    }
}

ErrorBoundary.defaultProps = {
    message: '功能模块有异常，请联系我们帮您处理。',
};
