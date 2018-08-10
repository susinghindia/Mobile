import React, {Component} from 'react'
import {Body, Button, Container, Content, Header, Icon, Text, Title, Toast} from "native-base"
import Camera from 'react-native-camera'
import {StyleSheet, View} from 'react-native'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
//import * as cameraActions from '../actions/camera'
import * as cameraActions from '../actions/actions'
import { PermissionsAndroid } from 'react-native';

// const mapStateToProps = (state) => {
//     return {

//     }
// }



export async function requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          'title': 'WorOrder Images',
          'message': 'App needs access to your camera ' +
                     'so you can take pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }


  
export async function requestReadWritePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'WorOrder Images',
          'message': 'App needs access to write ' +
                     'so you can save pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can Save pictures")
      } else {
        console.log("You can not Save pictures")
      }
    } catch (err) {
      console.warn(err)
    }
  }


  
export async function requestReadPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'WorOrder Images',
          'message': 'App needs access to write ' +
                     'so you can save pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can Read DIR")
      } else {
        console.log("You can not Read DIR")
      }
    } catch (err) {
      console.warn(err)
    }
  }

interface IMapStateToProps {
    WORKORDER_UUID: string,

}

const mapStateToProps = state => {
    
    return {
        WORKORDER_UUID: state.mobilereducer.WORKORDER_UUID
    }
  }



const mapDispatchToProps = (dispatch) => {
    /* code change */
    return bindActionCreators({...cameraActions}, dispatch);
}

class WorkOrderImage extends React.Component <IMapStateToProps> {

    
    takePicture() {
       
        const options = {};
       // alert(this.props.WORKORDER_UUID)
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => {
                this.props.uploadImage('employee-images', data.path).then((result) => console.log('Reponse: ', result)).catch((error) => console.log('Error: ', error))
            })
            .catch(err => console.error(err));
    }

 
    

    render() {
        
        
        requestCameraPermission()

        requestReadWritePermission()

        const { WORKORDER_UUID } = this.props;
    
        if (WORKORDER_UUID == undefined){
            return(
                <Container>
                <Header>
                    <Body>
                    <Title>CarSys Upload Image</Title>
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
                    <Title>CarSys Upload Image {WORKORDER_UUID}</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        orientation={Camera.constants.Orientation.auto}
                    >
                        <Button block iconLeft onPress={this.takePicture.bind(this)}><Icon name='camera'/><Text>Take picture</Text></Button>
                        
                    </Camera>
                </View>
            </Container>
        )
    }
}

export default connect<any,any>(mapStateToProps, mapDispatchToProps)(WorkOrderImage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
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