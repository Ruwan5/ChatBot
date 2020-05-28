import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greetings}>{'Hello!\nWellcome to ChatBot'}</Text>

                <View  style={styles.errorMassage}>
                    <Text>Error</Text>
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Email Adress</Text>
                        <TextInput style={styles.input} autoCapitalize="none"></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry autoCapitalize="none"></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text>Sign In</Text>
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
    form: {
        marginBottom: 48,
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