/* global BMapGL */
import React from 'react'
import { connect } from 'react-redux'
import { Map, MapvglView, MapvglLayer } from 'react-bmapgl'
import { getIndexFormat, getIndexConfig, layers as layerConfigs } from '../common/indices'
import commonApi from '../../common/api/index'
import AreaColorLayer from './layers/AreaColor'
import AreaLabelLayer from './layers/AreaLabel'
import MarkerLabelLayer from './layers/MarkerLabel'
import InfoWindowLayer from '../../../../components/map/InfoWindowLayer'
import { mapDownIn } from '../../common/toolkit/Index'
import { changeSelectedOptions } from '../../../../app/reducer/global'
import { changeLocation, updateCurrentAdminName } from '../../../../app/reducer/common/location'
import { getViewType } from '../common/admin'
import styles from './Index.module.less'
import MapDrawing from '../../common/MapDrawing'

class MapIndex extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      boundaries: [],
      provinceColorItem: null,
    }
  }
  componentDidMount() {
    this.changeLocation()
  }

  // 获取湖南省各城市边界坐标集
  changeLocation = async () => {
    // 湖南特殊的gridCode冲突，临时解决
    const adcode = this.props.adcode
    // if (adcode.startsWith('43')) {
    // }
    let boundaries = await commonApi.getBoundaryData(adcode)
    this.setState({
      boundaries,
    })
  }

  // 鼠标双击地图区域
  handleAreaItemClick = (e) => {
    console.log('双击地图区域 ==>', e)
    // e ==> dataIndex: Number, dataItem: {},
    if (e.dataIndex === -1) {
      // 点击区域以外的地方，return。
      return
    }
    const {
      dataItem: { properties },
    } = e
    const { location, changeLocation, selectedOptions, changeSelectedOptions } = this.props
    const id = properties.id
    const name = properties.name

    if (!id.startsWith('43')) {
      // 如果id不是43开头
      const item = e.dataItem
      const boundary = {
        geometry: item.geometry,
        properties: item.properties,
      }
      console.log('update boundary ==>', boundary)
      delete boundary.properties.color
      this.setState({
        boundaries: [boundary],
      })
    }
    // 地图下钻
    // id ==> 43xxxx
    // {location: location} ==> location: ["430000"]
    // changeLocation ==> func()
    // selectedOptions ==> Array
    mapDownIn(id, { location: location }, changeLocation, selectedOptions, changeSelectedOptions)
    this.props.updateCurrentAdminName(name)
  }

  // 鼠标移入地图区域
  handleMouseEnterProvinceColorItem = (e) => {
    // console.log('移入地图区域 ==> ', e)
    const item = e.dataItem
    // 经纬度cp ==> [ 0: '经度', 1: '维度' ]
    const cp = item.properties.cp

    // this.setState({
    //     provinceColorItem: {
    //         position: cp,
    //         name: item.properties.name,
    //         showValue: item.properties.showValue,
    //     },
    // });
    const extItem = {
      // 坐标点集合
      geometry: item.geometry,
      properties: Object.assign({}, item.properties),
    }
    delete extItem.properties.color
    this.setState({
      provinceColorItem: extItem,
    })
  }

  handleMouseLeaveProvinceColorItem = (e) => {
    this.setState({
      provinceColorItem: null,
    })
  }

  renderProvinceAggrLayer = () => {
    const { aggrValues, selectedIndex } = this.props

    const boundaries = this.state.boundaries || []

    const eventOptions = {
      enablePicked: true, // 是否可以拾取
      selectedIndex: -1, // 选中项
      autoSelect: true, // 根据鼠标位置来自动设置选中项
      onDblClick: (e) => {
        // 鼠标双击
        const { adLevel } = this.props
        if (adLevel < 5) {
          this.handleAreaItemClick(e)
        }
      },
    }
    //  策略标识符selectedIndex ==> village_user_move_warning
    if (selectedIndex) {
      // 右侧数据valueObject ==> { data: Array, max: Number, min:Number, status: 0, valueMap: Object}
      const valueObject = aggrValues[selectedIndex]
      return (
        <AreaColorLayer
          key="area-color"
          boundaries={boundaries}
          options={{
            ...eventOptions,
            autoSelect: false,
            color: 'rgba(51,119,255,.2)',
            depthTest: false,
            depthWrite: true,
            selectedColor: 'rgba(31,192,165,1)', // 选中项颜色
            // selectedColor: '#3277fe', // 选中项颜色
          }}
          format={getIndexFormat(selectedIndex)}
          valueObject={valueObject}
          onMouseEnterItem={this.handleMouseEnterProvinceColorItem}
          onMouseLeaveItem={this.handleMouseLeaveProvinceColorItem}
        />
      )
    }

    return (
      <AreaColorLayer
        key="area-color"
        boundaries={boundaries}
        gradient={null}
        options={{
          ...eventOptions,
          color: 'rgba(51,119,255,.2)',
          selectedColor: 'rgba(58, 101, 255, 0.6)', // 选中项颜色
          depthTest: false,
          depthWrite: true,
        }}
      />
    )
  }

  renderProvinceLayers = () => {
    // console.log('renderProvinceLayers ==> ', this.props.adLevel)
    // 右侧数据aggrValues ==> village_user_move_warning:{ data: Array, max: Number, min:Number}
    // selectedIndex ==> village_user_move_warning
    // adLevel ==> 1
    const { aggrValues, selectedIndex, adLevel } = this.props

    // boundaries ==> Array
    // provinceColorItem ==> null
    const { boundaries, provinceColorItem } = this.state

    const layers = []

    layers.push(this.renderProvinceAggrLayer())
    if (adLevel >= 3) {
      layers.push(
        <AreaLabelLayer
          key="area-name"
          boundaries={boundaries}
          options={{
            offset: [0, 0],
            color: '#000',
            depthTest: false,
          }}
          propertyName="name"
        />
      )
    }

    if (selectedIndex) {
      const valueObject = aggrValues[selectedIndex]
      const indexConfig = getIndexConfig(selectedIndex)
      console.log('valueObject + props ==>', valueObject, this.props)
      if (adLevel < 3) {
        // 地图上显示的省市区文字
        layers.push(
          <AreaLabelLayer
            key="area-name"
            boundaries={boundaries}
            options={{
              offset: [0, 0],
              color: '#000',
              fontSize: 12,
              depthTest: false,
            }}
            propertyName="name"
          />
        )
      }
      // 地图上显示的数字
      layers.push(
        <AreaLabelLayer
          key="area-value"
          options={{
            offset: [0, 20],
            color: '#000',
            fontSize: 13,
            fontWeight: 'bold',
            depthTest: false,
          }}
          format={getIndexFormat(selectedIndex)}
          boundaries={boundaries}
          valueObject={valueObject}
        />
      )

      if (provinceColorItem) {
        layers.push(
          <MapvglLayer
            type="LineLayer"
            key="line-highlight"
            data={[provinceColorItem]}
            options={{
              depthTest: false,
              width: 2,
              color: '#fff',
            }}
          />
        )
      }
      if (provinceColorItem) {
        layers.push(
          <InfoWindowLayer
            key="area-value-infowindow"
            wrapClassName={styles.infoWindowWrapClassName}
            position={provinceColorItem.position}
            offset={[0, 0]}
          >
            <div className={styles.infoWindowName}>{provinceColorItem.name}</div>
            <div>
              <span className={styles.infoWindowLabel}>{indexConfig.label}</span>
              <span>{provinceColorItem.showValue}</span>
            </div>
          </InfoWindowLayer>
        )
      }
    }
    return layers
  }

  renderGridLayers = () => {
    console.log('获取网格/小区 ==> ', this.props)
    // aggrValues: {}, selectedIndices: {}
    const { aggrValues, selectedIndices } = this.props

    const layers = []
    layers.push(
      <MapvglLayer
        key="area-color-grid"
        type="ShapeLayer"
        data={this.state.boundaries}
        options={{
          color: 'rgba(51,119,255,.2)',
          depthTest: false,
          depthWrite: true,
          autoSelect: false,
          // selectedColor: 'rgba(31,192,165,1)', // 选中项颜色
        }}
      />
    )
    console.log('render grid layer')
    for (const layerConfig of layerConfigs) {
      const {
        layerType,
        key,
        layerOptions = {},
        overlapType,
        format,
        polygonOptions,
        iconOptions,
        textOptions,
      } = layerConfig

      if (!layerType && overlapType !== 2) {
        continue
      }
      if (!selectedIndices[key]) {
        continue
      }

      const valueObject = aggrValues[key] || {}

      if (overlapType === 2) {
        layers.push(
          <MarkerLabelLayer
            key={key}
            format={format}
            options={layerOptions}
            valueObject={valueObject}
            polygonOptions={polygonOptions}
            iconOptions={iconOptions}
            textOptions={textOptions}
          />
        )
      } else {
        layers.push(
          <MapvglLayer
            key={key}
            options={layerOptions}
            type={layerType}
            data={layerType === 'PolygonLayer' ? valueObject.data : valueObject.data2}
          />
        )
      }
    }
    return layers
  }

  render() {
    const { adLevel } = this.props
    const viewType = getViewType(adLevel)
    const { provinceColorItem } = this.state
    return (
      <Map
        style={{
          height: '100%',
          width: '100%',
        }}
        enableScrollWheelZoom
      >
        <MapvglView>
          <MapvglLayer
            key="area-line"
            type="LineLayer"
            autoViewport
            viewportOptions={{
              zoomFactor: 0,
            }}
            data={this.state.boundaries}
            options={{
              width: 1,
              color: 'rgb(51,119,255)',
            }}
          />
          {/* 如果是adLevel=1/2/3省市区，则viewType!=2，*/}
          {/* 如果是adLevel=4/5网格小区，则viewType=2， */}
          {viewType === 2 ? this.renderGridLayers() : this.renderProvinceLayers()}
        </MapvglView>
        {/* 画网格工具 */}
        <MapDrawing />
      </Map>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.adcode !== this.props.adcode) {
      this.changeLocation()
    }
  }
}

const mapStateToProps = (state) => ({
  adLevel: state.location.adLevel,
  location: state.location.location,
  selectedOptions: state.global.selectedOptions,
  adcode: state.location.adcode,
  selectedIndex: state.sp.selectedIndex,
  selectedIndices: state.sp.selectedIndices,
  aggrValues: state.sp.aggrValues,
})

const mapDispatchToProps = {
  changeSelectedOptions,
  changeLocation,
  updateCurrentAdminName,
}

export default connect(mapStateToProps, mapDispatchToProps)(MapIndex)
