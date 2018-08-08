import {createStore, applyMiddleware,compose} from 'redux';
import rootReducer from '../reducers'

import {watchAll} from './mobilesaga'


import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()


//const enhancers =  compose(applyMiddleware( sagaMiddleware),window['devToolsExtension']())
const enhancers =  compose(applyMiddleware( sagaMiddleware))

export const  store = createStore(
  rootReducer,
  enhancers
)

sagaMiddleware.run(watchAll)
