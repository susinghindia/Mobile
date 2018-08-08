import * as actiontypes from './actiontypes' 


  export function login(UserCredential) {
    return {type: actiontypes.LOGIN,UserCredential};
  }


  
export function loginsuccess(data) {
    return {type: actiontypes.LOGIN_SUCCESS,data};
  }
  
  
export function loginfailed() {
    return {type: actiontypes.LOGIN_FAILED};
  }
  