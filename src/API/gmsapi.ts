import * as http from "../utils/http"
import hStorage from '../helpers/storage'
import RNFetchBlob from 'react-native-fetch-blob'


import {requestCameraPermission} from '../utils/vehicle'
//import requestReadWritePermission from '../component/WorkOrderImage'
//import requestReadPermission from '../component/WorkOrderImage'




const MEDIA_PRIVATE_URL_CAT_FILE = '/media/private/:category/:filename'
class GMSAPI {


    
    static GMSLogin(action){

       const body = {"Password": action.UserCredential.Password,	"EmailAddress": action.UserCredential.UserName};
       //alert( action.UserCredential.Password + " : " +  action.UserCredential.UserName)
       //const body = {"Password": "P@ssw0rd",	"Email": "surjit.kumar+gmsNew@gmail.co"};
       //return  hStorage.set('client', 'sso').then(() => { 

       return http.authRequest('POST', 'modules/auth/login', {
            body
        }).then((result) => {
                return result.data;
            })
            .catch((error) => {
                console.log(error)
                return error
                
            })
     //   })    
    }

    static GMSloginSuccess(_results){
           // Make sure temp localstorage is empty
           hStorage.cleanTmp()
           
           // Set authentication
           return  hStorage.set('auth', _results.data).then(() => {
               // Get current user
               return    http.request('GET', 'modules/admin/user/'+'surjit.kumar+gmsNew@gmail.com','SSO')
                   .then((result) => {
                       let data = result.data.Data
                       console.log(data)
                       return result.data.Data
                   })
                   .catch((error) => {
                    console.log(error)
                    return error
                   })
           }) 
    }


    static GMSGetWorkOrders(){
        
        return    http.request('GET', '/modules/workorders?fields=Workorder.ID%2CVehicle.Registration%2CAppointment.Date%2CVehicle.Manufacturer%2CVehicle.Model%2CAccount.Name&page=1','GMS')
            .then((result) => {
                let data = result.data.Data
                console.log(data)
                return result.data.Data
            })
            .catch((error) => {
                return error
            })
        


           
        }

    
    static uploadImage(data){
            //requestCameraPermission()

            console.log('uploadImage')
            console.log(data)
            console.log('uploadImage-end')
            
            // return    http.uploadImage() ('GET', '/modules/workorders?fields=Workorder.ID%2CVehicle.Registration%2CAppointment.Date%2CVehicle.Manufacturer%2CVehicle.Model%2CAccount.Name&page=1','GMS')
            //     .then((result) => {
            //         let data = result.data.Data
            //         console.log(data)
            //         return result.data.Data
            //     })
            //     .catch((error) => {
            //         return error
            //     })
            
    
    
               
            }


        

        static uploadImage_test  (category, PicturePath)  {
            return RNFetchBlob.fetch('POST', 'http://192.168.0.142/module/media/private/employee-images/test.jpg', {
                Authorization: '-pFwrJS48FLoFrCMb41n8idA8oBwxk-U3unSOgCHjIBCEixyMRD5z2Jjuw=o7LJJom5H',
                ShopToken: 'i9JoO5uuKP7D9eB6DZbxsnPM0zUNT_WJBV210nrjOS5M0Vj50m1sFE0CVvUJHHetPOAW',
            }, RNFetchBlob.wrap(PicturePath))
            
        
        }

  
}
 
  
export default GMSAPI;