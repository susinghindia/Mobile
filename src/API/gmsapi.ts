import * as http from "../utils/http"
import hStorage from '../helpers/storage'
import RNFetchBlob from 'react-native-fetch-blob'


import {requestCameraPermission} from '../utils/vehicle'
import { Alert } from "../../node_modules/@types/react-native";
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


        static uploadImage_Post(data){

           const config= {
              
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: data.base64Data
            }
        
            return    http.request('POST', '/media/private/employee-images/test_00006.jpg','GMS',config)
                .then((result) => {
                    let data = result.data.Data
                    console.log(data)
                    return result.data.Data
                })
                .catch((error) => {
                    return error
                })
            
    
    
               
            }
    
    
    static uploadImage_RN(data){
            //requestCameraPermission()

            console.log(data)

            
            return    http.uploadImage_RN(data.base64Data,data.dataPath)
                .then((result) => {
                    let data = result.data.Data
                    console.log(data)
                    return result.data.Data
                })
                .catch((error) => {
                    return error
                })
            
    
    
               
            }


            
    static uploadImage_2(data){
        //requestCameraPermission()

        console.log(data)

        
        return    http.uploadImage_2(data.category,data.dataPath)
            .then((result) => {
                let data = result.data.Data
                console.log(data)
                return result.data.Data
            })
            .catch((error) => {
                return error
            })
        


           
        }


        
        static uploadImage_FormData(data){
            //requestCameraPermission()
    
            console.log(data)
    
            
            return    http.uploadImage_FormData(data.category,data.dataPath)
                .then((result) => {
                    let data = result.data.Data
                    console.log(data)
                    return result.data.Data
                })
                .catch((error) => {
                    return error
                })
            
    
    
               
            }
          
  
}
 
  
export default GMSAPI;