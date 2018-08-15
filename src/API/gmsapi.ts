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
       //const body = {"Password": "P@ssw0rd",	"Email": "surjit.kumar+gmsNew@gmail.co"};
       

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
               return    http.request('GET', 'modules/admin/user/'+'surjit.kumar+gmsmobile@gmail.com','SSO')
                   .then((result) => {
                       let data = result.data.Data
                       
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



    static uploadWorkOrderImage( data){
    
        const uriParts = data.dataPath.split('/');
        const fileName = uriParts[uriParts.length - 1];
                
        return    http.uploadWorkOrderImage(data.category,data.UUID,data.base64Data,fileName)
            .then((result) => {
                let data = result.data.Data
                console.log(data)
                return result.data.Data
            })
            .catch((error) => {
                return error
            })

            
        }

        
    static uploadWorkOrderVideo( data){
    
        const uriParts = data.dataPath.split('/');
        const fileName = uriParts[uriParts.length - 1];
                
        return    http.uploadWorkOrderVideo(data.category,data.UUID,data.dataPath,fileName)
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