import React from 'react'
import { MapvglLayer } from 'react-bmapgl'
import { Intensity } from 'mapvgl'
import numeral from 'numeral'

export default class extends React.PureComponent {
  lastIndex = -1

  static defaultProps = {
    gradient: {
      0: 'rgba(215,228,255,.9)',
      1.0: 'rgba(51,119,255,.9)',
    },
  }

  handleMouseMove = (e) => {
    const dataIndex = e.dataIndex
    if (dataIndex === this.lastIndex) {
      return
    }

    this.lastIndex = dataIndex
    if (dataIndex === -1) {
      const onMouseLeaveItem = this.props.onMouseLeaveItem
      onMouseLeaveItem && onMouseLeaveItem(e)
    } else {
      const onMouseEnterItem = this.props.onMouseEnterItem
      onMouseEnterItem && onMouseEnterItem(e)
    }
  }

  render() {
    const { valueObject, gradient, boundaries, options = {}, format } = this.props
    let data = null

    let intensity = null
    if (valueObject && gradient) {
      data = []
      const { valueMap, min, max } = valueObject

      intensity = new Intensity({
        gradient,
        max,
        // 实现颜色渲染，min 和 max 相同会有问题
        min: max == min ? 0 : min,
      })

      for (const boundary of boundaries) {
        const id = boundary.properties.id
        const value = valueMap[id]
        data.push({
          geometry: boundary.geometry,
          properties: {
            ...boundary.properties,
            value,
            showValue: numeral(value).format(format || '0,0'),
            color: intensity ? intensity.getColor(value) : undefined,
          },
        })
      }
    } else {
      data = boundaries
    }
    console.log('areacolor data ==>', data, gradient)
    return (
      <MapvglLayer
        {...this.props}
        type="ShapeLayer"
        data={data}
        options={{
          ...options,
          onMousemove: this.handleMouseMove,
        }}
      />
    )
  }
}
