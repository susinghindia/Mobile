import React, {Component} from 'react'
import {Body, Button, Container, Content, Header, Icon, Text, Title, Toast} from "native-base"
import RNCamera from 'react-native-camera'
import {StyleSheet, View,TouchableHighlight} from 'react-native'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
//import * as cameraActions from '../actions/camera'
import * as cameraActions from '../actions/actions'
import { PermissionsAndroid } from 'react-native';

// const mapStateToProps = (state) => {
//     return {

//     }
// }


let startVideo = false;
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

interface IMapStateToProps {
    WORKORDER_UUID: string,

}

type MapDispatchToProps = {
    actions: {
        UploadImage: typeof cameraActions.UploadImage
    }
}

const mapStateToProps = state => {
    
    return {
        WORKORDER_UUID: state.mobilereducer.WORKORDER_UUID
    }
  }

  
  const mapDispatchToProps = dispatch => {
    return {actions: bindActionCreators(cameraActions,dispatch)}
    
  }

  type AppProps =
  & IMapStateToProps
  & MapDispatchToProps
// const mapDispatchToProps = (dispatch) => {
//     /* code change */
//     return bindActionCreators({...cameraActions}, dispatch);
// }

class WorkOrderVideo extends React.Component <AppProps> {

    
    takePicture() {
       
        const options = {};
      
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => {
                let UploadData = {category: 'employee-images',dataPath:data.path,UUID:this.props.WORKORDER_UUID}
               // this.props.actions.UploadImage('employee-images', data.path).then((result) => console.log('Reponse: ', result)).catch((error) => console.log('Error: ', error))
               this.props.actions.UploadImage(UploadData)
            })
            .catch(err => console.error(err));
    }

    _startRecord() {
         setTimeout(this._recordVideo.bind(this), 500)
      }
    
      _recordVideo() {

        let options = {
            mode: Camera.constants.CaptureMode.video,
            target: Camera.constants.CaptureTarget.temp//Camera.constants.CaptureTarget.cameraRoll
          };
         // this.camera.capture({mode: Camera.constants.CaptureMode.video})
         this.camera.capture(options)
          .then((data) => console.log(data))
          .catch(err => console.error(err)); 
          this.setState({ isRecording: true });
      }
    
      _endVideo() {
        this.camera.stopCapture()
      }
    

    render() {
        
        
        requestCameraPermission()

        requestReadWritePermission()

        requestRecordAudio()

        const { WORKORDER_UUID } = this.props;
    
        if (WORKORDER_UUID == undefined){
            return(
                <Container>
                <Header>
                    <Body>
                    <Title>CarSys Upload Video</Title>
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
                    <Title>CarSys Upload Video {WORKORDER_UUID}</Title>
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
                    <RNCamera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}
                        orientation={Camera.constants.Orientation.auto}
                        captureMode = {Camera.constants.CaptureMode.video}
                    >
                    <Text style={styles.capture} onPress={this._startRecord.bind(this)}> Start recording </Text>
          <Text style={styles.capture} onPress={this._endVideo.bind(this)}> Stop recording </Text>

                  
                        
                    </RNCamera>
                </View>
            </Container>
        )
    }
}

export default connect<any,any>(mapStateToProps, mapDispatchToProps)(WorkOrderVideo)

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