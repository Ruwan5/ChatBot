import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import Firebase from "./Firebase/Firebase"
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore'

const firebase = require("firebase");
require("firebase/firestore");

export default class PostScreen extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            user: {},
            text: "",
            image: null
        };
    }

    componentDidMount() {
      const user = this.props.uid || Firebase.shared.uid

      firestore().collection("users").doc(user).onSnapshot(doc => {
          this.setState({user: doc.data() })

      })

    }

    sendPost = () => {
      Firebase.shared.addPost({ text: this.state.text.trim(), localUrl: this.state.image}).then(res =>{
        this.setState({text: "", image: null})

      })
      .catch(err => {
        alert(err);
      })
    }

    selectFile = () => {
        var options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };

        ImagePicker.showImagePicker(options, res => {
          console.log('Response = ', res);

          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            let source = res;
            this.setState({
              image: source.uri
            });
          }
        });
    };

    cameraLaunch = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchCamera(options, (res) => {
          console.log('Response = ', res);

          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            const source = { uri: res.uri };
            console.log('response', JSON.stringify(res));
            this.setState({
              image: res.uri
            });
          }
        });
    }

    imageGalleryLaunch = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };

        ImagePicker.launchImageLibrary(options, (res) => {
          console.log('Response = ', res);

          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          } else {
            const source = { uri: res.uri };
            console.log('response', JSON.stringify(res));
            this.setState({
              image: res.uri
            });
          }
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon  name='arrow-back' type='metarial'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.sendPost}>
                        <Text style={{ fontWeight: "500"}}>Post</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Image style={styles.avatar} source={this.state.user.avatar ? {uri: this.state.user.avatar} : require('../assets/avatar.png')} />
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{flex:1}}
                        placeholder="Want to share somthing"
                        onChangeText={text => this.setState({text})}
                        value={this.state.text}>
                        </TextInput>
                </View>
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <TouchableOpacity style={styles.photo} onPress={this.selectFile}>
                        <Icon  name='photo' type='metarial' size={32} color="#D8D9DB"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photo} onPress={this.cameraLaunch}>
                        <Icon  name='camera' type='metarial' size={32} color="#D8D9DB"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photo} onPress={this.imageGalleryLaunch}>
                        <Icon  name='add-to-photos' type='metarial' size={32} color="#D8D9DB"/>
                    </TouchableOpacity>
                </View>

                <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
                    <Image source={{uri: this.state.image}} style={{ width: "100%", height: "100%"}}></Image>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: "#FFF",
        paddingBottom: 16,
        paddingTop: 64,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 5,
        borderBottomColor: "#EBECF4",
        shadowOffset: {height: 5},
        shadowColor: "#454D65",
    },
    inputContainer: {
        margin: 32,
        flexDirection: "row"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32
    },
});