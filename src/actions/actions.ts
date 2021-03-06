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

  export function SetWorkOrderUUID(data) {
    return {type: actiontypes.SET_WORKORDER_UUID,data};
  }

  
  export function Navigation(data) {
    return {type: actiontypes.NAVIGATION,data};
  }


  
  export function UploadImage(data) {
    return {type: actiontypes.UPLOAD_IMAGE,data};
  }

  
  export function UploadVideo(data) {
    return {type: actiontypes.UPLOAD_VIDEO,data};
  }


  


  

  
  

  