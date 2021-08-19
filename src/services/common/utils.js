import axios from 'axios';
import React from "react";
import {showErrorBox} from "../../component/MessageBox";
import {APP_DOMAIN} from "../../constants/AppPath";

export const Utils = {
    get,
    post,
    _urlRender
};

async function get(path, data, func, hasDialogProcess = false, responseType) {
    let url = Utils._urlRender(path, data);
    /*const requestOptions = {headers: authHeader()};
    if (responseType) {
        requestOptions.responseType = responseType;
    }
     if (hasDialogProcess) {
        showProgress();
    }*/
    //
    if (func) {
        return axios.get(url).then(res => {
          /*  if (hasDialogProcess) {
                hideProgress();
            }*/
            func(res)
        }).catch(error => {
            if (error && error.response && error.response.data && error.response.data.message) {
                showErrorBox(error.response.data.message);
            }
        });
    } else {
        return axios.get(url).then(res => {

            return res;
        }).catch(error => {
            if (error && error.response && error.response.data && error.response.data.message) {
                showErrorBox(error.response.data.message);
            }
        });
    }
}

async function post(path, data, func, hasDialogProcess = false, responseType) {
    let url = Utils._urlRender(path, null);
    /*const requestOptions = {
        headers: Object.assign(authHeader(),
            {'Content-Type': 'application/json'})
    };
    if (responseType) {
        requestOptions.responseType = responseType;
    }
    if (hasDialogProcess) {
        showProgress();
    }*/

    //
    if (func) {
        return axios.post(url, data).then(res => {
          /*  if (hasDialogProcess) {
                hideProgress();
            }*/
            func(res)
        }).catch(error => {
            if (error && error.response && error.response.data && error.response.data.message) {
                showErrorBox(error.response.data.message);
            }
        });
    } else {
        return axios.post(url, data).then(res => {
            /*if (hasDialogProcess) {
                hideProgress();
            }*/
            return res;
        }).catch(error => {
            if (error && error.response && error.response.data && error.response.data.message) {
                    showErrorBox(error.response.data.message);
            }
            /*if (hasDialogProcess) {
                hideProgress();
            }*/
        });
    }
}
function _urlRender(path, data) {
    if(path.includes("/vpkg-service")){
        path=path.substring(13);
    }
    let url = APP_DOMAIN + (path.indexOf('/') === 0 ? path : ('/' + path));

    if (data) {
        url += "?";
        url = _dataQueryRender(data, url, "").replace(/&$/, "");
    }
    return url;
}
function _dataQueryRender(data, url, prefix) {
    let rUrl = url;
    if (data && data.constructor === Array) {
        for (const key in data) {
            if (data[key] && data[key].constructor === Object) {
                rUrl += _dataQueryRender(data[key], "", (prefix ? prefix + "[" + key + "]" : key));
            } else {
                rUrl += (prefix ? prefix + "[" + key + "]" : key) + "=" + ((data[key] !== undefined && data[key] !== null) ? encodeURIComponent(data[key]) : "") + "&";
            }
        }
    } else if (data) {
        for (const key in data) {
            if (data[key] && data[key].constructor === Object) {
                rUrl += _dataQueryRender(data[key], "", (prefix ? prefix + "." + key : key));
            } else if (data[key] && data[key].constructor === Array) {
                rUrl += _dataQueryRender(data[key], "", (prefix ? prefix + "." + key : key));
            } else {
                rUrl += (prefix ? prefix + "." + key : key) + "=" + ((data[key] !== undefined && data[key] !== null) ? encodeURIComponent(data[key]) : "") + "&";
            }
        }
    }

    return rUrl;
}

function _format(url, data) {
    let result = url;
    for (let k in data) {
        result = result.replace("{" + k + "}", data[k]);
    }
    return result;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
