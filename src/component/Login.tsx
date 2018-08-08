import React, {Component} from 'react'
import {
    Body,
    Button,
    Card,
    CardItem,
    CheckBox,
    Container,
    Content,
    Form,
    Header,
    Input,
    Item,
    Label,
    Left,
    ListItem,
    Right,
    Text,
    Title,
    
} from "native-base";

import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

import {Field, reduxForm} from "redux-form"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"

import * as loginActions from '../actions/actions'


interface IMapStateToProps {
    Company_name: string,
    Username: string,
    Password: string
  
  }

type MapDispatchToProps = {
    actions: {
        login: typeof loginActions.login
    }
  }

  
interface State {
    companyname: string;
    username: string;
    password:String;

  }

type AppProps =
  & IMapStateToProps
  & MapDispatchToProps


class login extends  React.Component<AppProps,State> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            companyname: props.Company_name,
            username: props.Username,
            password: props.Password,
        };
      }
   
    handleUserNameChnage = (e) => {
        
        this.setState({username: e.target.value});
    }

    handleCompanyChnage = (e) => {
        
        this.setState({companyname: e.target.value});
    }


    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    
    handleLogin = () => {
        // console.log("UserName: " + this.state.username);
        // console.log("Password: " + this.state.password);

        let UserCredential = {UserName:  this.state.username,Password: this.state.password}

        //alert(this.state.username)

        this.props.actions.login(UserCredential);
    }
   
    render() {
        //const { userlogin } = this.props.actions
        const { Company_name, Username, Password } = this.props;

        let Companyname = {Company_name} 

        if (Username == undefined){
            return(
                <Container>
                <Header>
                    <Body>
                    <Title>CarSys Login</Title>
                    </Body>
                </Header>
                <Content padder>
                </Content>
            </Container>
              
            )
        }
    
        else

        return (

            <Container>
                <Header>
                    <Body>
                    <Title>CarSys Login</Title>
                    </Body>
                </Header>
                <Content padder>
            
            
            <TextInput type="text" name="Company" placeholder="Company" value={this.state.companyname} onChange={this.handleCompanyChnage} />

            <TextInput type="text" name="Email" placeholder="Email" value={this.state.username} onChange={this.handleUserNameChnage} />

            <TextInput type="text" name="Password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
         
            <Button block primary onPress={this.handleLogin}
        
            style={{marginTop: 10, marginBottom: 10}}><Text>Log in</Text></Button>
                <Card>
                    <CardItem>
                        <Body>
                        <Text>
                            Use your online login credentials to use the CarSys app.
                        </Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            </Container>
        )
    }
}



  
const mapStateToProps = state => {
    console.log('test')
    console.log(state)
    return {
        Company_name: state.mobilereducer.Company_name,
        Username: state.mobilereducer.Username,
        Password: state.mobilereducer.Password
    }
  }

const mapDispatchToProps = dispatch => {
    return {actions: bindActionCreators(loginActions,dispatch)}
    //return bindActionCreators({...loginActions}, dispatch);
}


export default connect<IMapStateToProps,any>(mapStateToProps, mapDispatchToProps)(reduxForm({
        form: 'login',
      })(login));
  

const styles = StyleSheet.create({
container: {
    paddingTop: 23
},
input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
},
submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
},
submitButtonText:{
    color: 'white'
}
})