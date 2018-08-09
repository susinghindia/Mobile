// import RNFetchBlob from "react-native-fetch-blob"

// const MEDIA_PRIVATE_URL_CAT_FILE = '/media/private/:category/:filename'

// export const uploadImage = (category, PicturePath) => dispatch => {
//     return RNFetchBlob.fetch('POST', 'http://apicso.develop.heerlen/media/private/employee-images/test.jpg', {
//         Authorization: '-pFwrJS48FLoFrCMb41n8idA8oBwxk-U3unSOgCHjIBCEixyMRD5z2Jjuw=o7LJJom5H',
//         ShopToken: 'i9JoO5uuKP7D9eB6DZbxsnPM0zUNT_WJBV210nrjOS5M0Vj50m1sFE0CVvUJHHetPOAW',
//     }, RNFetchBlob.wrap(PicturePath))

//     return dispatch({
//         type: 'HTTP',
//         payload: {
//             method: 'POST',
//             url: MEDIA_PRIVATE_URL_CAT_FILE,
//             config: {
//                 segments: {
//                     category,
//                     filename: 'test.jpg'
//                 },
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 body: data
//             }
//         }
//     })
// }