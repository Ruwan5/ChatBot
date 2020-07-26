import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, Button, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';
import Firebase from "./Firebase/Firebase"
import firestore from '@react-native-firebase/firestore'


export default class ProfileScreen extends React.Component {

    state = {
        user: {}
    }

    unsubscribe = null;

    componentDidMount() {
        // const {email, displayName} = firebase.auth().currentUser;
        // this.setState({email, displayName});
        const user = this.props.uid || Firebase.shared.uid

        this.unsubscribe = firestore().collection("users").doc(user).onSnapshot(doc => {
            this.setState({user: doc.data() });
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    signOutUser() {
        firebase.auth().signOut();
    }



    render() {
        return (
            <View style={styles.container}>

                <View style={{ marginTop: 64, alignItems: "center"}}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={this.state.user.avatar ? {uri: this.state.user.avatar} : require('../assets/avatar.png')} />
                    </View>
                    <Text style={styles.name}>{this.state.user.fname} {this.state.user.lname}</Text>
                </View>

                <View style={styles.statusContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.stateAmount}>20</Text>
                        <Text style={styles.stateTitle}>Posts</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.stateAmount}>241</Text>
                        <Text style={styles.stateTitle}>Followers</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.stateAmount}>150</Text>
                        <Text style={styles.stateTitle}>Following</Text>
                    </View>
                </View>
                <View style={styles.logout}>

                    <Button  onPress={() => {this.signOutUser()}} title="Log out" />
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        fontSize: 20,
        fontWeight: "600"
    },
    statusContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },
    stateAmount: {
        color: "#4F566D",
        fontSize: 18,
        fontWeight: "300"
    },
    stateTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4
    },
    logout:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#68a0cf',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
      },

});