import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput} from 'react-native';
// import Firebase from "./Firebase/Firebase"
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';


export default class PostScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            image: null
        };
    }

    selectFile = () => {
        var options = {
          title: 'Select Image',
          customButtons: [
            {
              name: 'customOptionKey',
              title: 'Choose file from Custom Option'
            },
          ],
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
              image: source
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
              filePath: res,
              fileData: res.data,
              fileUri: res.uri
            });
          }
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Icon  name='arrow-back' type='metarial'/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ fontWeight: "500"}}>Post</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Image source={require("../assets/avatar.png")} style={styles.avatar}></Image>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{flex:1}}
                        placeholder="Want to share somthing">
                        </TextInput>
                </View>
                <View >
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

                {/* <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
                    <Image source={{uri: this.state.image}} style={{ width: "100%", height: "100%"}}></Image>
                </View> */}
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB"
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