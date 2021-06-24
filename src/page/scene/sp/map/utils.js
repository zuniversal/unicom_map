import geoJson from './area.json'

export function findCoordinates(adcode) {
  let tag = null
  geoJson.some(item => {
    if (item.adcode == adcode) {
      tag = item;
      return true
    }
    item.districts.some(city => {
      if (city.adcode == adcode) {
        tag = city;
        return true
      }
    });
  })
  return tag ? tag.center.split(',') : []
}
