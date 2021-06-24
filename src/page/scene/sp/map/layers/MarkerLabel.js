import React from 'react'
import { MapvglLayer } from 'react-bmapgl'
import numeral from 'numeral'
export default class extends React.PureComponent {
  static defaultProps = {
    options: {
      color: '#fff',
    },
  }

  render() {
    const {
      valueObject,
      options = {},
      propertyName = 'value',
      format,
      polygonOptions = {},
      iconOptions = {},
      textOptions = {},
    } = this.props

    let mappedData = []
    let boudaryData = []
    let labelData = []
    if (valueObject) {
      const { data, data2 = [] } = valueObject
      if (Array.isArray(data)) {
        boudaryData = data
      }
      for (const item of data2) {
        let text = item.properties[propertyName]
        if (format !== null) {
          text = numeral(text).format(format || '0,0')
        }
        mappedData.push({
          geometry: item.geometry,
          properties: {
            text,
          },
        })
        labelData.push({
          geometry: item.geometry,
          properties: {
            text: item.properties.name,
          },
        })
      }
    }

    return (
      <>
        <MapvglLayer
          {...this.props}
          type="PolygonLayer"
          data={boudaryData}
          options={{
            lineColor: 'rgba(51,119,255, 1)',
            lineWidth: 1,
            fillColor: 'rgba(51,119,255, 0.7)',
            depthTest: false,
            ...polygonOptions,
          }}
        />
        <MapvglLayer
          {...this.props}
          type="IconLayer"
          data={mappedData}
          options={{
            width: 32,
            height: 32,
            offset: [0, -16],
            icon: process.env.PUBLIC_URL + '/image/3k/map/dx.png',
            depthTest: false,
            ...iconOptions,
          }}
        />
        <MapvglLayer
          {...this.props}
          type="TextLayer"
          data={labelData}
          options={{
            ...options,
            fontSize: 10,
            collides: false,
            offset: [0, 16],
            depthTest: false,
            color: '#666',
          }}
        />
        <MapvglLayer
          {...this.props}
          type="TextLayer"
          data={mappedData}
          options={{
            ...options,
            fontSize: 10,
            collides: false,
            offset: [0, -16],
            depthTest: false,
            ...textOptions,
          }}
        />
      </>
    )
  }
}
