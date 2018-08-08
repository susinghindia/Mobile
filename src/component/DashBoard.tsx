import React from 'react';

import {bindActionCreators} from "redux"
import * as DashBoardActiosn from '../actions/actions'
import {Body, Button, Card, CardItem, CheckBox, Container, Content, Form, Header, Input, Item, Label, Left, ListItem, Right, Text, Title,} from "native-base";
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import {connect} from "react-redux"




const mapStateToProps = state => {
    console.log('dashboard')
    console.log(state)
    console.log('state.mobilereducer')
    console.log( state.mobilereducer)
    return {
        CompanyUUID: state.mobilereducer.UserData.CompanyUUID ,
        Email: state.mobilereducer.UserData.Email ,
        FirstName: state.mobilereducer.UserData.FirstName ,
        LastName: state.mobilereducer.UserData.LastName ,
        MiddleName: state.mobilereducer.UserData.MiddleName ,
        Username: state.mobilereducer.UserData.Username,
        WorkOrders: state.mobilereducer.WorkOrders

        
    }
  }


  const mapDispatchToProps = dispatch => {
    return {actions: bindActionCreators(DashBoardActiosn,dispatch)}
    
  }
  
    interface IMapStateToProps {
        CompanyUUID: string,
        Email: string,
        FirstName: string
        LastName: string,
        MiddleName: string,
        Username: string
    
    }

    type MapDispatchToProps = {
        actions: {
            GetWorkOrders: typeof DashBoardActiosn.GetWorkOrders
        }
    }

    type AppProps =
    & IMapStateToProps
    & MapDispatchToProps


    class DashBoard extends  React.Component<AppProps> {

        getWorkOrders = () => {
         
            
            this.props.actions.GetWorkOrders();
        }

        render() {
           
            const { CompanyUUID, Email, FirstName,LastName,MiddleName,Username } = this.props;
    
            if (Email == undefined){
                return(
                    <Container>
                    <Header>
                        <Body>
                        <Title>CarSys DashBoard</Title>
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
                        <Title>CarSys DashBoard</Title>
                        </Body>
                    </Header>
                    <Content padder>
                            
                        <Button block primary onPress={this.getWorkOrders}style={{marginTop: 10, marginBottom: 10}}><Text>Work Orders</Text></Button>
                        <Button block  style={styles.licenseplate}><Text> Orders</Text></Button>
                        <View >
                            <Text style={styles.licenseplate}>123</Text>
                        </View>
                    </Content>
                </Container>
            )
        }
    }

    export default connect<IMapStateToProps,any>(mapStateToProps, mapDispatchToProps)(DashBoard)

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
        licenseplate: {
            marginTop: 10, 
            marginBottom: 10,
            color: '#121212'
  }
        })