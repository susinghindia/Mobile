import * as types from '../actions/actiontypes'
import initialState from './initialstate';
import {push} from 'react-router-redux'

export default function mobilreducer(state = initialState, action) {
  switch(action.type) {

    case types.LOGIN_SUCCESS:
    {
     return  state
     
    }

    case types.LOGIN_FAILED:
    {
     // alert('failed')
     return  state
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
        WORKORDER_UUID : action.UUID
      }); 
    }
    
    default:
    
      return state;
    
  }
}