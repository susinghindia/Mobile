
//import * as isString from 'lodash/iString'

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
  