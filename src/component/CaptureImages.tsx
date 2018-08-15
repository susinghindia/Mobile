'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
//import * as cameraActions from '../actions/camera'
import * as cameraActions from '../actions/actions'
import {Body, Button, Container, Content, Header, Icon,  Title, Toast} from "native-base"

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


  
export async function requestRecordAudio() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          'title': 'WorOrder Images',
          'message': 'App needs access to record audio ' +
                     'so you can save audio.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can Save audio")
      } else {
        console.log("You can not Save audio")
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

class CaptureImages extends Component<AppProps> {

    
  render() {
    requestCameraPermission()

    requestReadWritePermission()

    requestRecordAudio()

    const { WORKORDER_UUID,WORKORDER_ID } = this.props;

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
          <Title>Work Order : {WORKORDER_ID}</Title>
          </Body>
      </Header>
      

      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
           
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        {/* <TouchableOpacity
            onPress={this.takeVideo.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> Video </Text>
        </TouchableOpacity> */}

        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> Pic </Text>
        </TouchableOpacity>
        </View>
      </View>
    
    </Container>
    );
  }

  takePicture = async function() {
    
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      
      this.camera.takePictureAsync(options)
      .then((data) => {
         let UploadData = {category: 'workorder-images',dataPath:data.uri,UUID:this.props.WORKORDER_UUID,base64Data:data.base64}
         this.props.actions.UploadImage(UploadData)
         
      })
      .catch(err => console.error(err));

    }
  };

  takeVideo = async function() {
    if (this.camera) {
      const options = { maxDuration:5, quality:RNCamera.Constants.VideoQuality['480p']};
      //const data = await this.camera.takePictureAsync(options)
      const record = await this.camera.recordAsync(options);
     // const record = await this.camera.recordAsync(RNCamera.Constants.VideoQuality["2160p"]);
      console.log(record.uri);
    }
  };
}



interface IMapStateToProps {
  WORKORDER_UUID: string,
  WORKORDER_ID: string

}

type MapDispatchToProps = {
  actions: {
      UploadImage: typeof cameraActions.UploadImage
  }
}

const mapStateToProps = state => {
  
  return {
      WORKORDER_UUID: state.mobilereducer.WORKORDER_UUID,
      WORKORDER_ID :  state.mobilereducer.WORKORDER_ID

  }
}


const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators(cameraActions,dispatch)}
  
}

type AppProps =
& IMapStateToProps
& MapDispatchToProps

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
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
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
 
});

AppRegistry.registerComponent('CaptureImages', () => CaptureImages);

export default connect<any,any>(mapStateToProps, mapDispatchToProps)(CaptureImages)