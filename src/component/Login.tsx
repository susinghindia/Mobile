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
    Email: string,
    Password: string
  
  }

type MapDispatchToProps = {
    actions: {
        login: typeof loginActions.login
    }
  }

  
interface State {
    companyname: string;
    email: string;
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
            email: props.Email,
            password: props.Password,
        };
      }
   
      handleEmailChange = (e) => {
      
        this.setState({email: e.target.value});
    }

    handleCompanyChange = (e) => {
        
        this.setState({companyname: e.target.value});
    }


    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }

    
    handleLogin = () => {
     
        let UserCredential = {UserName:  this.state.email,Password: this.state.password}

        this.props.actions.login(UserCredential);
    }
   
    render() {
        //const { userlogin } = this.props.actions
        const { Company_name, Email, Password } = this.props;

        let Companyname = {Company_name} 

        if (Email == undefined){
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
            
            
            <TextInput type="text" name="Company" placeholder="Company" value={this.state.companyname} onChange={this.handleCompanyChange} />

            <TextInput type="text" name="Email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />

            <TextInput type="text" name="Password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
         
           
            {/* <Button block primary onPress={this.handleLogin} style={{marginTop: 10, marginBottom: 10}}><Text>Log in</Text></Button> */}

            <TouchableOpacity    style={styles.loginScreenButton}     onPress={this.handleLogin}    >
               <Text style={styles.submitText} >Login</Text>
            </TouchableOpacity>            

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
    console.log(state)
    return {
        Company_name: state.mobilereducer.Company_name,
        Email: state.mobilereducer.Email,
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
},

loginScreenButton:{
    marginRight:40,
    marginLeft:40,
   marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#1E6738',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  },

  submitText:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  }

})