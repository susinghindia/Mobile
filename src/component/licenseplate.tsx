
import React from 'react';

import { splitRegistration } from '../utils/vehicle'
import { View, TouchableOpacity, TextInput, StyleSheet,FlatList ,Dimensions} from 'react-native'
import {Body, Button, Card, CardItem, CheckBox, Container, Content, Form, Header, Input, Item, Label, Left, ListItem, Right, Text, Title,Icon,Toast} from "native-base";
import Camera from 'react-native-camera'

interface ILicensePlateProps {
    size?: 'small'
    registration: string
  
//    onDelete? (): void
  }



  
  export class LicensePlate extends React.Component<ILicensePlateProps> {


    takePicture() {
        const options = {};
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => {
                this.props.uploadImage('employee-images', data.path).then((result) => console.log('Reponse: ', result)).catch((error) => console.log('Error: ', error))
            })
            .catch(err => console.error(err));
    }

    scannedBarcode = (data) => {
        Toast.show({text: data.data, duration: 1500, position: 'top'})
    }

    render () {


        
      const { registration } = this.props
      const { countryCode, licensePlate } = splitRegistration(registration)
  
  
      return (
        <View style={styles.itemContainer}>
            <Text style={styles.item}>
             { countryCode } :  { licensePlate }
             </Text>

              <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        onBarCodeRead={this.scannedBarcode}
                        aspect={Camera.constants.Aspect.fill}
                        orientation={Camera.constants.Orientation.auto}
                    >
                        <Button block iconLeft onPress={this.takePicture.bind(this)}><Icon name='camera'/><Text>Take picture</Text></Button>
                    </Camera>
              

        </View>
      )
    }
  }


   
  
  export default LicensePlate
  const numColumns = 3;
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
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      color: '#000',
      padding: 10,
      margin: 40
  }
  
    })