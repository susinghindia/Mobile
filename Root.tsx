import React from 'react'
import {Provider} from 'react-redux'
import App from "./App"
import {Route} from "react-router-native"
import {Switch,Router} from "react-router-native"
//import {ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
import {Root as NBRoot} from 'native-base'
import Login from "./src/component/Login"
import Hello from "./src/component/Hello"
import DashBoard from "./src/component/DashBoard"
import WorkOrderImage from "./src/component/WorkOrderImage"

import { store} from './src/store/configurestore'

export const history = createHistory()

 class Root extends React.Component{


    render()
    {
        return(

        <Provider store={store}>
            <Router history={history}>
                <NBRoot>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path='/main' component={WorkOrderImage}/>
                        <Route exact path='/dashboard' component={DashBoard}/>
                    
                    </Switch>
                </NBRoot>
            </Router>
        </Provider>
        
        );
    }
}

export default Root

