import React, {Component} from 'react'
import {Body, Button, Container, Content, Header, Icon, Text, Title, Toast} from "native-base"
//import Camera from 'react-native-camera'
import { RNCamera } from 'react-native-camera';
import {StyleSheet, View,TouchableOpacity} from 'react-native'
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

class WorkOrderImage extends React.Component <AppProps> {

    
    takePicture() {
       
        const options = {};
      
       // alert(this.props.WORKORDER_UUID)
        //options.location = ...
        this.camera.capture({metadata: options})
            .then((data) => {
                let UploadData = {category: 'employee-images',dataPath:data.path,UUID:this.props.WORKORDER_UUID}
               // this.props.actions.UploadImage('employee-images', data.path).then((result) => console.log('Reponse: ', result)).catch((error) => console.log('Error: ', error))
               this.props.actions.UploadImage(UploadData)
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


          
        )
    }
}

export default connect<any,any>(mapStateToProps, mapDispatchToProps)(WorkOrderImage)

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
  