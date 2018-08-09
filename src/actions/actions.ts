import * as actiontypes from './actiontypes' 


  export function login(UserCredential) {
    return {type: actiontypes.LOGIN,UserCredential};
  }


  
export function loginsuccess(data) {
    return {type: actiontypes.LOGIN_SUCCESS,data};
  }


  export function setuserdata(data) {
    return {type: actiontypes.SET_USERDATA,data};
  }

  
  
export function loginfailed() {
    return {type: actiontypes.LOGIN_FAILED};
  }


  export function GetWorkOrders() {
    return {type: actiontypes.GET_WORKORDERS};
  }

  
  export function Navigation(UINAME) {
    return {type: actiontypes.NAVIGATION,UINAME};
  }

  

  