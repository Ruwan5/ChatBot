import React from 'react';
import {Text, View, StyleSheet, ScrollView, Alert, Image,FlatList, Button, KeyboardAvoidingView, TextInput, TouchableHighlight, Keyboard, TouchableOpacity } from 'react-native';
import { Icon, Divider } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore'
import Firebase from "./Firebase/Firebase"
import moment from 'moment'


export default class MessageScreen extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //       data: [
    //         {id:1, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit amet"},
    //         {id:2, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit amet"} ,
    //         {id:3, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
    //         {id:4, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
    //         {id:5, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"},
    //         {id:6, date:"9:50 am", type:'out', message: "Lorem ipsum dolor sit a met"},
    //         {id:7, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
    //         {id:8, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
    //         {id:9, date:"9:50 am", type:'in',  message: "Lorem ipsum dolor sit a met"},
    //       ]
    //     };
    // }


    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            message: "",
            id: "",

        }


    }


    componentDidMount() {
        this.getMessages();


        // setInterval(this.getMessages, 1000)
    }

    getMessages = () =>{
        let msg = [];

        const user = this.props.uid || Firebase.shared.uid
        this.setState({id: user})


        firestore().collection("messages").orderBy('date', 'asc').get().then(querySnapshot => {
            querySnapshot.forEach( function (doc) {

                if(user == doc.data().id){
                    msg.push({
                        message: doc.data().message,
                        date: doc.data().date,
                        id: doc.data().id,
                        type: doc.data().type,
                        fname: doc.data().fname
                    })
                } else {
                    msg.push({
                        message: doc.data().message,
                        date: doc.data().date,
                        id: doc.data().id,
                        type: "in",
                        fname: doc.data().fname
                    })
                }

            })

            this.setState({msg});
        })
    }

    renderDate = (date) => {
        return(
          <Text style={styles.time}>
            {date}
          </Text>
        );
    }


    sendMessage = () => {


        if(this.state.message != ""){

            const user = this.props.uid || Firebase.shared.uid
            firestore().collection("users").doc(user).onSnapshot( doc=>{
                var userName = doc.data().fname
                this.setState({userName: userName}, ()=>{
                    console.log("R");
                    console.log(this.state.userName);
                })
            })


            var time = moment().utcOffset('+05:30').format('HH:mm');
            firestore().collection("messages").add(
                {
                   id: this.state.id,
                   message: this.state.message,
                   date: time,
                   type: "out",
                   fname: this.state.userName
                }
            ).catch(err => {
                Alert.alert(err);
            })
            this.setState({message: ""})

        } else {
            Alert.alert("Empty message!")
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Chat</Text>

                </View>

                <FlatList style={styles.list}
                    data={this.state.msg}
                        keyExtractor= {(item) => {
                        return item.id;}}
                        renderItem={(message) => {
                        const item = message.item;
                        let inMessage = item.type === 'in';
                        let itemStyle = inMessage ? styles.itemIn : styles.itemOut;

                    return (
                    <View style={[styles.item, itemStyle]}>
                        {!inMessage && this.renderDate(item.date)}
                        <View style={[styles.balloon]}>
                        <Text style={{fontStyle: "italic", color: "#00F",}}>{item.fname}</Text>
                        <Text>{item.message}</Text>
                    </View>
                        {inMessage && this.renderDate(item.date)}
                    </View>
                    )
                }}/>

                <View style={styles.footer}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Write a message..."
                            underlineColorAndroid='transparent'
                            onChangeText={(msg) => this.setState({message: msg})}
                            value={this.state.message}
                            clearButtonMode='always'/>
                    </View>

                    <TouchableOpacity style={styles.btnSend} onPress={this.sendMessage}>
                        <Icon name="send" style={styles.iconSend} />
                    </TouchableOpacity>
                </View>
            </View>
        );
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
    list:{
        paddingHorizontal: 17,
      },
    footer:{
        flexDirection: 'row',
        height:60,
        backgroundColor: '#eeeeee',
        paddingHorizontal:10,
        padding:5,
    },
    btnSend:{
        backgroundColor:"#00BFFF",
        width:40,
        height:40,
        borderRadius:360,
        alignItems:'center',
        justifyContent:'center',
    },
    iconSend:{
        width:30,
        height:30,
        alignSelf:'center',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        height:40,
        flexDirection: 'row',
        alignItems:'center',
        flex:1,
        marginRight:10,
    },
    inputs:{
        height:40,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    balloon: {
        maxWidth: 250,
        padding: 15,
        borderRadius: 20,
    },
    itemIn: {
        alignSelf: 'flex-start'
    },
    itemOut: {
        alignSelf: 'flex-end'
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15,
        fontSize:12,
        color:"#808080",
    },
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
        backgroundColor:"#add8e6",
        borderRadius:300,
        padding:5,
    },

});