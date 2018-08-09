import React, {Component} from 'react'
import {Body, Button, Container, Content, Header, Icon, Text, Title, Toast} from "native-base"
import Camera from 'react-native-camera'
import {StyleSheet, View} from 'react-native'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
//import * as cameraActions from '../actions/camera'
import * as cameraActions from '../actions/actions'

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    /* code change */
    return bindActionCreators({...cameraActions}, dispatch);
}

class WorkOrderImage extends Component {
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

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Upload Image</Title>
                    </Body>
                </Header>
                <View style={styles.container}>
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