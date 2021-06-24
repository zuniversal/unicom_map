import React from 'react';
import {
    connect,
} from 'react-redux';
import DrawingManager from 'react-bmapgl/Library/DrawingManager';
import {
    openDrawingManager,
    closeDrawingManager,
    updatePolygon,
} from '../../../app/reducer/global';

class MapDrawing extends React.Component {

    /**
     * TODO：
     * 1、只有地图下钻到网格，才显示右上角工具箱
     * 2、点击工具箱的圈选地图后，显示画图工具栏，隐藏右侧派单工具栏
     * 3、点击工具箱的取消圈选，隐藏画图工具栏，显示右侧派单工具栏
     * 4、当绘制完成时，右侧显示网格信息窗口，编辑网格信息，并可以选择删除刚绘制的网格。
     */
    handleOverlayComplete = (e, info) => {
        // console.log(e, info);
        const polygonOverlay = this.polygonOverlay = info.overlay;
        // this.props.closeDrawingManager();
        const polygon = polygonOverlay.points.map(point => {
            // mercatorToLnglat：墨卡托转经纬度
            const ll = polygonOverlay.map.mercatorToLnglat(point.lng, point.lat);
            return ll[0] + ',' + ll[1];
        }).join(';');
        const arr = []
        polygonOverlay.points.map(item => {
            const ll = polygonOverlay.map.mercatorToLnglat(item.lng, item.lat);
            const obj = {}
            obj.lng = ll[0]
            obj.lat = ll[1]
            arr.push(obj)
        })
        this.props.updatePolygon({
            polygon,
        });
        localStorage.setItem('POLYGON', polygon);
        const {
            onOverlayComplete,
        } = this.props;
        onOverlayComplete && onOverlayComplete(polygon);
        console.log('绘制网格坐标点集合 ==> ', arr)
    }

    handleOverlayCancel = () => {
        this.props.closeDrawingManager();
    }

    handleRef = ref => {
        // console.log(this.props.map);
        this.drawingManager = ref;
        // this.drawingManager = ref && ref.drawingmanager;
        // console.log(ref, this.drawingManager);
        // if (this.drawingManager) {
        //     this.drawingManager._setDrawingMode('polygon');
        // }
    }

    clearOverlay = () => {
        if (this.polygonOverlay) {
            this.props.map.removeOverlay(this.polygonOverlay);
            this.polygonOverlay = null;
        }
    }

    render() {
        return (<DrawingManager
            {...this.props}
            ref={this.handleRef}
            isOpen={false}
            enableDrawingTool={false}
            drawingMode='polygon'
            enableCalculate
            enableLimit
            limitOptions={{
                area: 50000000,
            }}
            onOverlaycomplete={this.handleOverlayComplete}
            onOverlaycancel={this.handleOverlayCancel}
        />);
    }

    componentDidUpdate(prevProps, prevState) {
        const realManager = this.drawingManager.drawingmanager;
        if (realManager && this.props.isDrawingManagerOpen !== prevProps.isDrawingManagerOpen) {
            if (this.props.isDrawingManagerOpen) {
                this.clearOverlay();
                realManager._setDrawingMode('polygon');
                realManager.open();
            }
            else {
                this.clearOverlay();
                realManager.close();
            }
        }
    }
}


export default connect(state => {
    return {
        isDrawingManagerOpen: state.global.isDrawingManagerOpen,
    };
}, {
    openDrawingManager,
    closeDrawingManager,
    updatePolygon,
})(MapDrawing);
