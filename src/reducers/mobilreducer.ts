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
      console.log('action')
      console.log(action.data)
      console.log('action-end')
      return Object.assign({}, state, {
        WorkOrders : action.data
      }); 
    }
    
    default:
    
      return state;
    
  }
}