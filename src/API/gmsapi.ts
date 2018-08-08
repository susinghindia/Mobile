import * as http from "../utils/http"
import hStorage from '../helpers/storage'


class GMSAPI {

    static GMSLogin(action){

       const body = {"Password": action.UserCredential.Password,	"Email": action.UserCredential.UserName};
       //alert( action.UserCredential.Password + " : " +  action.UserCredential.UserName)
       //const body = {"Password": "P@ssw0rd",	"Email": "surjit.kumar+gmsNew@gmail.co"};
       //return  hStorage.set('client', 'sso').then(() => { 

       return http.authRequest('POST', 'modules/auth/login', {
            body
        }).then((result) => {
                return result.data;
            })
            .catch((error) => {
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

  
}
 
  
export default GMSAPI;