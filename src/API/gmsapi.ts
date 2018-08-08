import * as http from "../utils/http"
import hStorage from '../helpers/storage'


class GMSAPI {

    static GMSLogin(action){

       const body = {"Password": action.UserCredential.Password,	"Email": action.UserCredential.UserName};
       alert( action.UserCredential.Password + " : " +  action.UserCredential.UserName)
       //const body = {"Password": "P@ssw0rd",	"Email": "surjit.kumar+gmsNew@gmail.co"};
       return http.authRequest('POST', 'modules/auth/login', {
            body
        }).then((result) => {
                return result.data;
            })
            .catch((error) => {
                return error
            })

    }

    static GMSloginSuccess(_results){
           // Make sure temp localstorage is empty
           hStorage.cleanTmp()
           // Set authentication
         return  hStorage.set('auth', _results.data).then(() => {
               // Get current user
               http.request('GET', 'modules/admin/user/'+'surjit.kumar+gmsNew@gmail.com')
                   .then((result) => {
                       let data = result.data.Data
                       return result.data.Data
                   })
                   .catch((error) => {
                    return error
                   })
           })
    }

  
}
 
  
export default GMSAPI;