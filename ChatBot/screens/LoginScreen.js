import React from 'react';
import {View, Text, StyleSheet, } from 'react-native';

export default class LoginScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.greetings}>{'Hello!\nWellcome to ChatBot'}</Text>

            </View>
        )
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
    }
})