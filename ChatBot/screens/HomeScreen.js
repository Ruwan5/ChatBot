import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Image, FlatList} from 'react-native';
import * as firebase from 'firebase';
import { Icon } from 'react-native-elements';
import moment from 'moment'
import firestore from '@react-native-firebase/firestore'
import Firebase from "./Firebase/Firebase"

let postss = [
    {
        id: "1",
        name: "Ruwan chamara",
        text: "Sri Lanka is a tropical island situated close to the southern tip of India. The bird life of Sri Lanka is very rich for its size and 505 species have been recorded.",
        timestamp: 52418542,
        avater: require("../assets/avatar.png"),
        image: require("../assets/new.jpg")
    },
    {
        id: "2",
        name: "Ruwan chamara",
        text: "sijdfiokdmfkdmfijdfodkfodjfdjfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffmd",
        timestamp: 152142114,
        avater: require("../assets/avatar.png"),
        image: require("../assets/9.jpg")
    },
];

// let postss = [];


export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () =>{
        let posts=[];

        firestore().collection("posts").get().then(querySnapshot => {
            querySnapshot.forEach(function (doc){
                posts.push({
                    id: doc.data().uid,
                    image: doc.data().image,
                    timestamp: doc.data().timestamp,
                    text: doc.data().text
                })
            })
            console.log(posts)
            this.setState({
                posts
            })
            console.log(this.state.post)
        })
    }


    renderPost = post => {
        return (
            <View style={styles.feedItem}>

                <Image source={post.avater} style={styles.avatar}/>
                <View style={{flex: 1}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View>
                            <Text style={styles.name}>{post.name}</Text>
                            <Text style={styles.timestamp}>{moment(post).fromNow()}</Text>
                        </View>

                        <Icon name="more" size={24} color="#737888"/>

                    </View>

                    <Text style={styles.posts}>{post.text}</Text>
                    <Image source={{uri: post.image}} style={styles.postImage} resizeMode="cover"/>

                    <View style={{flexDirection: "row"}}>
                        <Icon name="favorite" size={24} color="#737888" style={{marginRight: 16}}/>
                        <Icon name="chat" size={24} color="#737888" />
                    </View>
                </View>
            </View>


        )
    }


    render() {
        LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Feed</Text>

                </View>

                <FlatList
                    style={styles.feed}
                    data={this.state.posts}
                    renderItem={({item}) => this.renderPost(item)}
                    // keyExtractor={item => item.uid}
                    // showsVerticalScrollIndicator={false}
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
        fontSize: 15,
        fontWeight: "500",
        color: "#C4C6CE"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    posts: {
        marginTop: 16,
        fontSize: 14,
        color: "#838899"
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    }
})