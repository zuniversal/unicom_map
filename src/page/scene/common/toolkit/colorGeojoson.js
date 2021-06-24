export default function (dataGeojson, options) {
    const {typePropName = 'type', colorMap} = options;
    let data = [].concat(dataGeojson);
    let res = data.map(item => {
        const key = item.properties[typePropName];
        item.properties.color = colorMap[key];
        return item;
    });
    return res || [];
    // let boundaryData = [].concat(dataGeojson);

}