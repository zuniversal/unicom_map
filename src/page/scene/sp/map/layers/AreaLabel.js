import React from 'react'
import { MapvglLayer } from 'react-bmapgl'
import numeral from 'numeral'
export default class extends React.PureComponent {
  static defaultProps = {
    options: {
      color: '#000',
      fontSize: 13,
    },
  }

  render() {
    const { valueObject, boundaries, options = {}, propertyName, format } = this.props
    let data = null

    if (valueObject) {
      data = []
      const { valueMap } = valueObject

      for (const boundary of boundaries) {
        const id = boundary.properties.id
        let text = valueMap[id]
        if (format !== null) {
          text = numeral(text).format(format || '0,0')
        }
        data.push({
          geometry: {
            type: 'Point',
            coordinates: boundary.properties.cip,
          },
          properties: {
            text,
          },
        })
      }
    } else if (propertyName) {
      data = []
      for (const boundary of boundaries) {
        data.push({
          geometry: {
            type: 'Point',
            coordinates: boundary.properties.cip,
          },
          properties: {
            text: boundary.properties.name,
          },
        })
      }
    } else {
      data = []
    }
    console.log('area label ==>', data)
    return <MapvglLayer options={options} {...this.props} type="TextLayer" data={data} />
  }
}
