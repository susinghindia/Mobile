
//import * as isString from 'lodash/iString'
import { PermissionsAndroid } from 'react-native';

export const splitRegistration = (registration: any) => {
    // if (!isString(registration)) {
    //   return { countryCode: '', licensePlate: '' }
    // }
  
    let [countryCode = '', licensePlate = ''] = registration.split('|')
  
    countryCode = countryCode.toLowerCase()
    licensePlate = licensePlate.toUpperCase()
  
    return {
      countryCode,
      licensePlate
    }
  }
  


  

export async function requestCameraPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        'title': 'WorOrder Images',
        'message': 'App needs access to your camera ' +
                   'so you can take pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera")
    } else {
      console.log("Camera permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}



export async function requestReadWritePermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        'title': 'WorOrder Images',
        'message': 'App needs access to write ' +
                   'so you can save pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can Save pictures")
    } else {
      console.log("You can not Save pictures")
    }
  } catch (err) {
    console.warn(err)
  }
}



export async function requestReadPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        'title': 'WorOrder Images',
        'message': 'App needs access to write ' +
                   'so you can save pictures.'
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can Read DIR")
    } else {
      console.log("You can not Read DIR")
    }
  } catch (err) {
    console.warn(err)
  }
}