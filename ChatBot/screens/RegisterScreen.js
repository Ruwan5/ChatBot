import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
// import {Ionicons} from '@expo/vector-icons';


export default class RegisterScreen extends React.Component {
    state = {
        fname: "",
        lname: "",
        email: "",
        password: "",
        errorMessage: null
    }

    handleSignUp = () => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userCredentials => {
            return userCredentials.user.updateProfile({
                displayName: this.state.fname + this.state.lname
            })
        })
        .catch(error => this.setState({errorMessage: error.message}));
    }

    render() {
        return (
            <View style={styles.container}>

                {/* <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color ="#FFF"></Ionicons>
                </TouchableOpacity> */}

                <Text style={styles.greetings}>{'Hello!\nSign Up to get started.'}</Text>

                <View  style={styles.errorMassage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text> }
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={fname => this.setState({ fname })}
                            value={this.state.fname}>
                        </TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={lname => this.setState({ lname })}
                            value={this.state.lname}>
                        </TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Email Adress</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}>
                        </TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
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

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{color: "#FFF", fontWeight: "500"}}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: "center", marginTop: 20}} onPress={() => this.props.navigation.navigate("Login")}>
                    <Text style={{color: "#414959", fontSize: 13}}>
                        Already have an account? <Text style={{fontWeight: "500", color: "#E9446A"}}>Login</Text>
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
        marginBottom: 40,
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