/*
 * @Descripttion: 获取路由参数
 * @version: v1.0.0
 * @Author: fanweijun
 * @Date: 2021-04-06 17:26:44
 * @LastEditors: fanweijun
 * @LastEditTime: 2021-04-06 17:45:07
 */

/**
 * @param {需要解析的路由参数location.search} queryString
 * @param {需要查询的key值} queryKey
 * @returns key对应的value
 */
function GetQueryString(queryString, queryKey) {
    let reg = new RegExp('(^|&)' + queryKey + '=([^&]*)(&|$)');
    let r = decodeURI(queryString.substr(1)).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return '';
}


export default GetQueryString;
