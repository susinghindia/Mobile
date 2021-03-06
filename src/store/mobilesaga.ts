import { takeLatest,all  } from 'redux-saga/effects'
import { call, put } from 'redux-saga/effects'
import GMSAPI from '../API/gmsapi'
import * as actiontypes from '../actions/actiontypes'
import * as http from "../utils/http"
import { history } from '../../Root';


export function *watchAll() {
  yield all([
    takeLatest(actiontypes.LOGIN, GMSlogin),
    takeLatest(actiontypes.LOGIN_SUCCESS, GMSloginSuccess),
    takeLatest(actiontypes.GET_WORKORDERS, GMSGetWorkOrders),
    takeLatest(actiontypes.NAVIGATION, Navigation),
    takeLatest(actiontypes.UPLOAD_IMAGE, UploadImage),
    takeLatest(actiontypes.UPLOAD_VIDEO, UploadVideo),
    
  ]);
}


function* GMSlogin(action) {
    try {
       var data = yield GMSAPI.GMSLogin(action)
       yield put({type: actiontypes.LOGIN_SUCCESS,data})
    } catch (error) {
       
       yield put({type: actiontypes.LOGIN_FAILED})
       
    }
  }


function* GMSloginSuccess(action) {
  try {



    if (action.data.response !=undefined && (action.data.response.status ==401 || action.data.response.status ==400 ) )
  {
    console.log( action.data.response.status)
    yield put({type: actiontypes.LOGIN_FAILED})    
  }
  else{
    var data = yield call(GMSAPI.GMSloginSuccess,action)
    yield put({type: actiontypes.SET_USERDATA,data})    
   // yield call(history.push, '/main')
    yield call(history.push, '/DashBoard')
    
  }
     
  } catch (error) {
     
     yield put({type: actiontypes.LOGIN_FAILED, error})
     
  }
}



function* GMSGetWorkOrders() {
  try {

    var data = yield GMSAPI.GMSGetWorkOrders()
    yield put({type: actiontypes.GET_WORKORDERS_SUCCESS,data})
    
  }
     
   catch (error) {
     
     yield put({type: actiontypes.LOGIN_FAILED, error})
     
  }
}


function* Navigation(action) {
  try {
   
    yield call(history.push, '/' + action.data.RoutePath)
  } catch (error) {
     
     yield put({type: actiontypes.LOGIN_FAILED})
     
  }
}
 


function* UploadImage(action) {
  try {
    
     var data = yield GMSAPI.uploadWorkOrderImage(action.data)
     yield put({type: actiontypes.UPLOAD_IMAGE_SUCCESS,data})
    
  } catch (error) {
     
     yield put({type: actiontypes.LOGIN_FAILED})
     
  }
}



function* UploadVideo(action) {
  try {
    
     var data = yield GMSAPI.uploadWorkOrderVideo(action.data)
     yield put({type: actiontypes.UPLOAD_IMAGE_SUCCESS,data})
    
  } catch (error) {
     
     yield put({type: actiontypes.LOGIN_FAILED})
     
  }
}

