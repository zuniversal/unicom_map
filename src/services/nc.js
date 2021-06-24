import axios from 'axios';

export const getProvCityAnalysis = params => {
    params = Object.assign({
    }, params);

    return axios.get('http://10.244.6.92:8088/nc/TownAnalysis', { params });
};

export const getQuDaoAnalysis = params => {
    params = Object.assign({
    }, params);

    return axios.get('http://10.244.6.92:8088/nc/QuDaoAnalysis', { params });
};

export const getTownMobileSource = params => {
    params = Object.assign({
    }, params);

    return axios.get('http://10.244.6.92:8088/nc/TownMobileSource', { params });
};

export const getncBroadband = params => {
    params = Object.assign({
    }, params);

    return axios.get('http://10.244.6.92:8088/nc/ncBroadband', { params });
};
export const getncHair = (params) => {
    params = Object.assign({}, params);

    return axios.post(
        "/new_sq/map/task/taskNotice/insertTask",
        params
    );
};
export const getncTo = (params) => {
    params = Object.assign({}, params);

    return axios.post(
        "/new_sq/map/task/ExecutorQuery/insertExecutor",
        params
    );
};
export const getTask = params => {
    params = Object.assign({
    }, params);

    return axios.post('/new_sq/map/task/grid/getTaskQuery', params);
};
export const getWork = params => {
    params = Object.assign({
    }, params);

    return axios.post('/new_sq/map/task/workOrderQuery/info', params);
};

export const LinKage = params => {
    params = Object.assign({
    }, params);

    return axios.post('/new_sq/map/task/areaGrid/info', params);
};







