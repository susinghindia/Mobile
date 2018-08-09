import React from 'react';

import {bindActionCreators} from "redux"
import * as DashBoardActiosn from '../actions/actions'
import {Body, Button, Card, CardItem, CheckBox, Container, Content, Form, Header, Input, Item, Label, Left, ListItem, Right, Text, Title,} from "native-base";
import { View, TouchableOpacity, TextInput, StyleSheet,FlatList ,Dimensions} from 'react-native'
import {connect} from "react-redux"
import LicensePlate from './licenseplate'
import Link from  'react-router-native'
//import Link from  'react-router-redux'


const mapStateToProps = state => {
    console.log('dashboard')
    console.log(state)
    console.log('state.mobilereducer')
    console.log(  state.mobilereducer)

    if ( state.mobilereducer.WorkOrders !=undefined)
    {
        console.log('state.mobilereducer.WorkOrders')
        console.log(  state.mobilereducer.WorkOrders)
    }
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
        Username: string,
        WorkOrders:any
    
    }

    type MapDispatchToProps = {
        actions: {
            GetWorkOrders: typeof DashBoardActiosn.GetWorkOrders
            Navigation: typeof DashBoardActiosn.Navigation
        }
    }

    type AppProps =
    & IMapStateToProps
    & MapDispatchToProps


    class DashBoard extends  React.Component<AppProps> {

        addImageToWorkOrder = () => {
            this.props.actions.Navigation("Hello");
                };

        getWorkOrders = () => {
         
            
            this.props.actions.GetWorkOrders();
        }

        render() {
           
            const { CompanyUUID, Email, FirstName,LastName,MiddleName,Username,WorkOrders } = this.props;
    
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
                        
                        
                    {WorkOrders!=undefined  &&       WorkOrders[0]!=undefined &&            <FlatList
                        data={WorkOrders}
                        renderItem={({item}) => (
                            <View style={styles.itemContainer}>
                            {/* <Text style={styles.item}>{item.Vehicle.Registration}</Text> */}

                                  {/* <LicensePlate registration={ item.Vehicle.Registration }/> */}

                                <Button block iconLeft >
                                    <Text> {item.Vehicle.Registration}</Text>
                                   
                                </Button>
 
                                 <Button
                                   
                                   onPress={this.addImageToWorkOrder}
                                 
                                   color="#343434">

                                    <Text>Add Image</Text>
                                   
                                   </Button>

                            </View>
                        )}
                        keyExtractor={item => item.Vehicle.UUID}
                        numColumns={numColumns} />}

                    </Content>
                </Container>
            )
        }
    }

    export default connect<IMapStateToProps,any>(mapStateToProps, mapDispatchToProps)(DashBoard)


    const numColumns = 2;
    const size = Dimensions.get('window').width/numColumns;

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
        },

        itemContainer: {
            width: size,
            height: size,
          },
          item: {
            flex: 1,
            margin: 3,
            backgroundColor: 'lightblue',
          }

        })