import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,Image, StatusBar, LayoutAnimation, Alert} from 'react-native';
import { firebase } from '@firebase/app';
import '@firebase/firestore'
import '@firebase/auth';
require("firebase/firestore");
import Dialog from "react-native-dialog";


export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null,
        dialogVisible: false,
        resetMail: null,
    }

    showDialog = () => {
        this.setState({ dialogVisible: true });
        console.log(this.state.dialogVisible)
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleLogin = () => {
        const {email, password} = this.state
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage: error.message}));
    }

    sendResetEmail = () => {
        if(this.state.resetMail != null){
            const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(this.state.resetMail) === true){
                firebase.auth().sendPasswordResetEmail(this.state.resetMail)
                .then(function (user) {
                    Alert.alert('Please check your email... Reset email has been sent')
                }).catch(function (e) {
                    Alert.alert(e);
                })
            }
            else{
                Alert.alert("Invalid email address!");
            }

            this.setState({ dialogVisible: false });
        } else {
            Alert.alert("No email Address to send reset mail");
        }

    };


    render() {
        LayoutAnimation.easeInEaseOut();
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Image
                    source={require("../assets/20.png")}
                    style={{marginTop: -400, marginLeft:-5, width:550, height: 550}}
                ></Image>

                {/* <Image
                    source={require("../assets/c.png")}
                    style={{marginTop: -80, width:80, height:80, alignSelf: "center"}}
                >
                </Image> */}

                <Text style={styles.greetings}>{'Hello!\nWellcome to ChatBot'}</Text>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Adress</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}>
                        </TextInput>
                    </View>

                    <View style={{marginTop: 28}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password})}
                            value={this.state.password}>

                        </TextInput>
                    </View>
                </View>

                <View  style={styles.errorMassage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text> }
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{color: "#FFF", fontWeight: "500"}}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32}} onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={{color: "#414959", fontSize: 13}}>
                        New to ChatBot? <Text style={{fontWeight: "500", color: "#E9446A"}}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>

                <View>
                    <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>Reset Password</Dialog.Title>
                    <Dialog.Description>
                        Enter your registered email address
                    </Dialog.Description>
                    <Dialog.Input placeholder="Enter email here" underlineColorAndroid="black"  onChangeText={(email) => this.setState({resetMail: email})}></Dialog.Input>
                    <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                    <Dialog.Button label="Ok" onPress={this.sendResetEmail} />
                    </Dialog.Container>
                </View>

                <TouchableOpacity style={{ alignSelf: "center", marginTop: 12}} onPress={() => this.showDialog()}>

                    <Text style={{fontWeight: "500", color: "#E9446A"}}>Forgot Password? </Text>

                </TouchableOpacity>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    greetings: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMassage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginTop: 50,
        marginBottom: 15,
        marginHorizontal: 30
    },
    inputTitle: {

        color: "#BABF9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#BABF9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },

})