import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import Firebase from "./Firebase/Firebase"
import { Icon } from 'react-native-elements';

export default class NotificationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    componentDidMount() {
        this.getUsers();

        // setInterval(this.getUsers, 5000);
    }

    getUsers = () =>{
        let users=[];

        firestore().collection("users").orderBy('fname', "asc").get().then(querySnapshot => {
            querySnapshot.forEach(function (doc){
                users.push({
                    avatar: doc.data().avatar,
                    email: doc.data().email,
                    fname: doc.data().fname,
                    lname: doc.data().lname
                })
            })
            this.setState({
                users
            })
        })
    }


    renderPost = users => {
        return (
            <View style={styles.feedItem}>

                <Image source={{uri: users.avatar}} style={styles.avatar}/>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style={styles.name}>{users.fname} {users.lname}</Text>
                        </View>

                        <Icon name="more" size={24} color="#737888"/>

                    </View>

                </View>
            </View>


        )
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Users</Text>

                </View>

                <FlatList
                    style={styles.feed}
                    data={this.state.users}
                    renderItem={({item}) => this.renderPost(item)}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EFECF4"
    },
    header: {
        paddingTop: 64,
        paddingBottom: 16,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 5,
        borderBottomColor: "#EBECF4",
        shadowColor: "#454D65",
        shadowOffset: {height: 5},
        shadowRadius: 15,
        shadowOpacity: 0.2,
        zIndex: 10
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "500"
    },
    feed: {
        marginHorizontal: 10
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        fontSize: 17,
        fontWeight: "500",

    },
});