import React from 'react'

import App from "./App"
import {Route} from "react-router-native"
import {Switch,Router} from "react-router-native"
import {ConnectedRouter} from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
import {Root as NBRoot} from 'native-base'




const history = createHistory()



class Root extends React.Component{

    render()
    {
        return(

          
            <Router history={history}>
            <NBRoot>
            <Switch>
            <Route exact path='/' component={App}/>
            
            </Switch>
            </NBRoot>
            </Router>

        
        );
    }
}

export default Root

