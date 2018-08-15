import React from 'react';

import {bindActionCreators} from "redux"
import * as DashBoardActiosn from '../actions/actions'
import {Body, Button, Card, CardItem, CheckBox, Container, Content, Form, Header, Input, Item, Label, Left, ListItem, Right, Text, Title,Icon} from "native-base";
import { View, TouchableOpacity, TextInput, StyleSheet,FlatList ,Dimensions,ScrollView} from 'react-native'
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
        Email: state.mobilereducer.UserData.EmailAddress ,
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
            SetWorkOrderUUID: typeof DashBoardActiosn.SetWorkOrderUUID
        }
    }

    type AppProps =
    & IMapStateToProps
    & MapDispatchToProps


    class DashBoard extends  React.Component<AppProps> {


        addImageToWorkOrder(WorkOrder_UUID,WorkOrder_ID)  {

            let data = {UUID: WorkOrder_UUID,ID: WorkOrder_ID}
            let navdata ={RoutePath:'image'}

            this.props.actions.SetWorkOrderUUID(data);
            this.props.actions.Navigation(navdata);
        }

        getWorkOrders = () => {
         
            
            this.props.actions.GetWorkOrders();
        }

        componentWillMount(){
            this.getWorkOrders();
        }

        render() {
           
            const { CompanyUUID, Email, FirstName,LastName,MiddleName,Username,WorkOrders } = this.props;
    
            if (Email == undefined){
                return(
                    <Container>
                    <Header>
                        <Body>
                        <Title>CarSys Work Orders</Title>
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
                        <Title>CarSys Work Orders</Title>
                        </Body>
                    </Header>
                    <Content padder>
                   
                    {/* <Button block primary onPress={this.getWorkOrders}style={{marginTop: 10, marginBottom: 10}}><Text>Work Orders</Text></Button> */}
                    <ScrollView>
                        {WorkOrders!=undefined  &&       WorkOrders[0]!=undefined &&            
                        
                        <FlatList
                            data={WorkOrders}
                            renderItem={({item}) => (
                                <View style={styles.itemContainer}>
                                
                                <View   style={{ flexDirection: 'row', height: 90, padding: 20, }}>

                                    <View style={{backgroundColor: 'rgb(255,207,0)', flex: 0.5,borderRadius:10,borderColor:'rgb(0,0,0)',borderWidth:1,alignItems:'center'}} >
                                    
                                        <Text>{item.Vehicle.Registration}</Text>
                                        <Text>{item.Workorder.ID}</Text>

                                    

                                    </View>
                                    <View style={{flex: 0.2}} >
                                        <TouchableOpacity   onPress={() => this.addImageToWorkOrder(item.Workorder.UUID, item.Workorder.ID)}    >
                                        <Icon name='camera'/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                </View>
                            )}
                            keyExtractor={item => item.Workorder.UUID}
                            numColumns={numColumns} />}
                    </ScrollView>
                    </Content>
                </Container>
            )
        }
    }

    export default connect<IMapStateToProps,any>(mapStateToProps, mapDispatchToProps)(DashBoard)


    const numColumns = 1;
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
            height: 90,
          },

        item: {
            flex: 1,
            margin: 3,
            backgroundColor: 'lightblue',
        },

        CameraButton:{
            marginRight:40,
            marginLeft:40,
            marginTop:10,
            paddingTop:10,
            paddingBottom:10,
            backgroundColor:'rgb(207,219,64)',
            borderRadius:10,
            borderWidth: 1,
            borderColor: '#fff'
          }

        }
    )