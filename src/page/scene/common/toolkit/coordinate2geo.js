function toPoint(data, pointType) {
    if (Array.isArray(data)) {
        if (pointType) {
            return data.map(item => {
                let location = [].concat(item.location);
                delete item.location;
                return {
                    geometry: {
                        type: 'Point',
                        coordinates: location,
                    },
                    properties: {
                        stationType: pointType,
                        ...item,
                    },
                };
            });
        }
        return data.map(item => {
            let location = [].concat(item.location);
            delete item.location;
            return {
                geometry: {
                    type: 'Point',
                    coordinates: location,
                },
                properties: {
                    ...item,
                },
            };
        });
    }
    return [];
}

function toComplexPoint(data, pointType) {
    if (Array.isArray(data)) {
        if (pointType) {
            return data.map(item => {
                let location = [item[2], item[3]];
                // delete item.location;
                return {
                    geometry: {
                        type: 'Point',
                        coordinates: location,
                    },
                    properties: {
                        stationType: pointType,
                        id: item[0],
                        cellId: item[1],
                    },
                };
            });
        }
    }
    return [];
}

function toSimplePoint(data) {
    if (Array.isArray(data)) {
        return data.map(item => {
            return {
                geometry: {
                    type: 'Point',
                    coordinates: item,
                },
            };
        });
    }
    return [];
}

function toLineString(data) {
    if (Array.isArray(data)) {
        return data.map(item => {
            let line = [].concat(item.line);
            delete item.line;
            return {
                geometry: {
                    type: 'LineString',
                    coordinates: [line],
                },
                properties: {
                    ...item,
                },
            };
        });
    }
    return [];
}

function toPolygon(data) {
    if (Array.isArray(data)) {
        return data.map(item => {
            let polygon = [].concat(item.polygon);
            delete item.polygon;
            return {
                geometry: {
                    type: 'Polygon',
                    coordinates: [[polygon]],
                },
                properties: {
                    ...item,
                },
            };
        });
    }
    return [];
}

// text: item?.properties?.subDistinctName,

function boundaryDataToTextPoint(boundaryData, adLevel) {
    const rawData = [].concat(boundaryData);
    if (adLevel === 3) {
        return rawData.map(item => {
            return {
                geometry: {
                    type: 'Point',
                    coordinates: item?.properties?.center?.split(','),
                },
                properties: {
                    text: item?.properties?.subDistinctName,
                },
            };
        });
    }
    return rawData.map(item => {
        return {
            geometry: {
                type: 'Point',
                coordinates: item?.properties?.cp,
            },
            properties: {
                text: item?.properties?.name,
            },
        };
    });
}

export default {toPoint, toLineString, toPolygon, toSimplePoint, toComplexPoint, boundaryDataToTextPoint};