import axios from 'axios';
import wkt from 'wkt';
import center from '@turf/center';
import centroid from '@turf/centroid';
const req = axios;

const getRequestkHost = (host) => {
    return process.env.REACT_APP_MOCK ? '/mock' : host
}

const boundaryAlias = {
    110100: '110000',
    120100: '120000',
    310100: '310000',
    500100: '500000',
};
// 获取网格接口
const getGridBoundaryData = async distinctId => {
    // 以前接口 - 废弃
    // let {data} = await req.get('/hu_sand/community/getBoundaryData', {
    //     params: {
    //         adcode: distinctId,
    //     },
    //     withCredentials: false,
    // });
    let {data} = await req.get('/new_sq/map/task/grid/getBoundaryData', {
        params: {
            ad_code: distinctId,
        },
        withCredentials: false,
    });
    const list = [];
    for (const item of data.data) {
        const geometry = wkt.parse(item.boundary);
        const c = centroid(geometry);
        list.push({
            geometry,
            properties: {
                id: item.code,
                name: item.name,
                cp: c.geometry.coordinates,
                cip: c.geometry.coordinates,
            },
        });
    }
    return list;
};
export default {
    // 获取边界
    async getBoundaryData(distinctId) {
        if (!distinctId) {
            return [];
        }
        if (boundaryAlias[distinctId]) {
            distinctId = boundaryAlias[distinctId];
        }
        // 如果code开头是43但是结尾不是00，代表是网格需要调取别的接口
        if (distinctId.startsWith('43') && !distinctId.endsWith('00')) {
            return await getGridBoundaryData(distinctId);
        }

        let {data} = await req.get(`${getRequestkHost('http://10.244.6.92:8081')}/boundaryGeoJson`, {
            params: {
                distinctId,
            },
            withCredentials: false,
        });
        if (data.status === 0) {
            let geojson = null;
            try {
                geojson = JSON.parse(data.data);
            }
            catch (error) {
                window.console.warn(error);
                return [];
            }
            if (geojson.features) {
                for (let feature of geojson.features) {
                    if (!feature) {
                        continue;
                    }
                    const cip = centroid(feature);
                    feature.properties.cip = cip.geometry.coordinates;
                }
            }
            return geojson.features || [];
        }
        return [];
    },

    async countPv(scene) {
        await req.get('/sourceview/pv', {
            params: {
                theme: scene,
            },
            withCredentials: true,
        });
    },
};
