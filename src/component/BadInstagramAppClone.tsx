'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { PermissionsAndroid } from 'react-native';


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

export default class BadInstagramCloneApp extends Component {

    
  render() {
    requestCameraPermission()

    requestReadWritePermission()

    requestRecordAudio()

    return (
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
        <TouchableOpacity
            onPress={this.takeVideo.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> Video </Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> Pic </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options)
      console.log(data.uri);
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

AppRegistry.registerComponent('BadInstagramCloneApp', () => BadInstagramCloneApp);