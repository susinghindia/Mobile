import * as types from '../actions/actiontypes'
import initialState from './initialstate';
import {push} from 'react-router-redux'

export default function mobilreducer(state = initialState, action) {
  switch(action.type) {

    case types.LOGIN_SUCCESS:
    {
      return Object.assign({}, state, {
        LoginSuccess : 1
        }); 
     
    }

    case types.LOGIN_FAILED:
    {
     
     return Object.assign({}, state, {
      LoginSuccess : 0
      }); 
    }


    case types.SET_USERDATA:
    {
      
      return Object.assign({}, state, {
        UserData : action.data
      }); 
    }

    case types.GET_WORKORDERS_SUCCESS:
    {
      
      return Object.assign({}, state, {
        WorkOrders : action.data
      }); 
    }

    case types.SET_WORKORDER_UUID:
    {

     
      return Object.assign({}, state, {
        WORKORDER_UUID : action.data.UUID,
        WORKORDER_ID : action.data.ID
      }); 
    }
    
    default:
    
      return state;
    
  }
}