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
    
  ]);
}


function* GMSlogin(action) {
    try {
      //  alert(action.UserCredential.UserName + " : a" + action.UserCredential.Password)
       var data = yield GMSAPI.GMSLogin(action)
       yield put({type: actiontypes.LOGIN_SUCCESS,data})
       //yield put({type: actiontypes.LOGIN_VALIDATE,data})
    } catch (error) {
       
       yield put({type: actiontypes.LOGIN_FAILED})
       
    }
  }


function* GMSloginSuccess(action) {
  try {

    console.log(action)

    if (action.data.response !=undefined && (action.data.response.status ==401 || action.data.response.status ==400) )
  {
    console.log( action.data.response.status)
    yield put({type: actiontypes.LOGIN_FAILED})    
  }
  else{
    var data = yield GMSAPI.GMSloginSuccess(action)
    yield call(history.push, '/main')
  }
     
  } catch (error) {
     
     yield put({type: actiontypes.LOGIN_FAILED, error})
     
  }
}
 


