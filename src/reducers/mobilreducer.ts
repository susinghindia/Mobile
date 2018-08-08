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
      alert('failed')
     return  state
    }
    
    default:
    
      return initialState;
    
  }
}