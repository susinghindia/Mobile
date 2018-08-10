import axios from 'axios'
import forEach from 'lodash/forEach'
import St from '../helpers/storage'
import RNFetchBlob from "react-native-fetch-blob"

/**
 * Build the base URL
 * @returns {string}
 * @private
 */

 const _buildBaseUrl = () => {
    return 'http://192.168.0.142:9100'
   //return 'http://192.168.43.205:9100'

     /*    const CLIENT = St.get('client')
         const API = St.get('xdata')
         return (CLIENT) ? CLIENT.host : API.host*/
 }
 
 const _buildBaseUrl_GMS = () => {
   return 'http://192.168.0.142:9000'
   //return 'http://192.168.43.205:9000'
}

/**
 * Build the full URL for communication with the API
 * @param _url
 * @param _segments
 * @returns {string}
 * @private
 */
// const _buildUrl = (_url, _segments = {}) => {
//     return _buildBaseUrl() + _buildUrlSegments(_url, _segments)
// }

const _buildUrl = (_url, _segments = {},APISource='') => {

    console.log('APISource')
    console.log(APISource)
    if (APISource == 'SSO')
        return _buildBaseUrl() + _buildUrlSegments(_url, _segments)
    else
        return _buildBaseUrl_GMS() + _buildUrlSegments(_url, _segments)
     
}

/**
 * Replace the URL segments
 * - Unknow segments will be placed as an URL query
 * @param _url
 * @param _segments
 * @returns {string}
 * @private
 */
const _buildUrlSegments = (_url, _segments) => {
    let query = '?'
    let urlParts = _url.split('/').filter(Boolean)

    forEach(_segments, (k, v) => {
        let index = urlParts.indexOf(':' + v)
        if (index !== -1) {
            urlParts[index] = k
        } else {
            query += ((query.length > 1) ? '&' : '') + v + '=' + k
        }
    })

    query = (query === '?') ? '' : query
    urlParts = ('/' + urlParts.join('/'))
    if (urlParts.substr(urlParts.length - 1) === '/') {
        urlParts = urlParts.substr(0, urlParts.length - 1)
    }

    return urlParts + query
}

/**
 * Get the headers for a request
 * @returns {*}
 * @private
 */
export async function _buildHeaders(_customHeaders = {}) {
    _customHeaders['Content-Type'] = 'application/json'

    let apiHeaders = await St.get('auth')

    console.log('APIHEADERS', apiHeaders)

    apiHeaders = JSON.parse(apiHeaders)
    if (apiHeaders.Data.SupportToken) {
        Object.assign(_customHeaders, apiHeaders.Data)
    } 
       else {
        Object.assign(_customHeaders, {
            Authorization: apiHeaders.Data.AuthenticationResult.TokenType +" " +apiHeaders.Data.AuthenticationResult.IdToken,//apiHeaders.Data.AuthenticationResult.AccessToken,
            
        
        })
    
    
    // else {
    //     Object.assign(_customHeaders, {
    //         Authorization: apiHeaders.Data.AccessToken,
    //         ShopToken: apiHeaders.Data.ShopToken,
    //         'X-Language': 'NL'
    //     })

    }
    return _customHeaders
}

/**
 * Handle all Auth HTTP requests
 * @param _method
 * @param _url
 * @param _config
 * @returns {null}
 */
// export const authRequest = (_method = 'GET', _url = '', _config = {}) => {
//     return axios({
//         method: _method,
//         url: _buildUrl(_url, _config.segments,),
//         headers: _buildHeaders(_config.headers),
//         data: _config.body
//     })
// }
export const authRequest = (_method = 'GET', _url = '', _config = {}) => {
    return axios({
        method: _method,
        url: _buildUrl(_url, _config.segments,'SSO'),
        headers: _buildHeaders(_config.headers),
        data: _config.body
    })
}

/**
 * Handle all HTTP requests
 * @param _method
 * @param _url
 * @param _config
 * @returns {Promise.<T>}
 */

 /*
export async function request (_method = 'GET', _url = '', _config = {}) {
    const headers = await _buildHeaders(_config.headers)

    let request = {
        timeout: 60000,
        method: _method,
        url: _buildUrl(_url, _config.segments),
        headers,
        data: _config.body
    }

    console.log('Request: ', JSON.stringify(request))
    // axios(request).then((result) => console.log(result)).catch((error) => console.log(error.response, error.request, error.message))
    return axios(request)
}

*/


export async function request (_method = 'GET', _url = '',APISource='', _config = {}) {

    console.log(APISource)
    const headers = await _buildHeaders(_config.headers)

    //console.log(API);
    let request = {
        timeout: 60000,
        method: _method,
        url: _buildUrl(_url, _config.segments,APISource),
        headers,
        data: _config.body
    }

    console.log('Request: ', JSON.stringify(request))
    // axios(request).then((result) => console.log(result)).catch((error) => console.log(error.response, error.request, error.message))
    return axios(request)
}



export async function uploadImage (category, PicturePath, _config = {}) {


    const headers = await _buildHeaders(_config.headers)

    return RNFetchBlob.fetch('POST', 'http://192.168.0.142:9000/modules/media/private/employee-images', {
        Authorization : headers,
    }, RNFetchBlob.wrap(PicturePath))
        .then((res) => {
        console.log(res.text())
    })
    .catch((err) => {
    // error handling ..
    })
}

/**
 * Axios Interceptor
 */
axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse)

/**
 * Handle responses
 */
function handleSuccessResponse(response) {
    return Promise.resolve(response)
}

function handleErrorResponse(response) {
    return Promise.reject(response)
}
