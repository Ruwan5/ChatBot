import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity,Image, StatusBar, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: "",
        errorMessage: null
    }

    handleLogin = () => {

        const {email, password} = this.state

        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({errorMessage: error.message}));
    }

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
    }
})