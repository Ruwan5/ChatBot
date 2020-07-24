// import React from 'react';
// import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
// import * as firebase from 'firebase';
// import { Icon } from 'react-native-elements';


// export default class RegisterScreen extends React.Component {
//     state = {
//         fname: "",
//         lname: "",
//         email: "",
//         password: "",
//         errorMessage: null
//     }

//     handleSignUp = () => {
//         firebase
//         .auth()
//         .createUserWithEmailAndPassword(this.state.email, this.state.password)
//         .then(userCredentials => {
//             return userCredentials.user.updateProfile({
//                 displayName: this.state.fname + this.state.lname
//             })
//         })
//         .catch(error => this.setState({errorMessage: error.message}));
//     }

//     render() {
//         return (
//             <View style={styles.container}>

//                 <View style={{ position: "absolute", top: 44, alignItems: "center", width: "100%"}}>
//                     <Text style={styles.greetings}>{'Hello!\nSign Up to get started.'}</Text>
//                     <TouchableOpacity style={styles.avatar}>
//                         <Icon  name='add' type='metarial'/>
//                     </TouchableOpacity>
//                 </View>



//                 <View style={styles.form}>
//                     <View>
//                         <Text style={styles.inputTitle}>First Name</Text>
//                         <TextInput
//                             style={styles.input}
//                             autoCapitalize="none"
//                             onChangeText={fname => this.setState({ fname })}
//                             value={this.state.fname}>
//                         </TextInput>
//                     </View>

//                     <View style={{marginTop: 32}}>
//                         <Text style={styles.inputTitle}>Last Name</Text>
//                         <TextInput
//                             style={styles.input}
//                             autoCapitalize="none"
//                             onChangeText={lname => this.setState({ lname })}
//                             value={this.state.lname}>
//                         </TextInput>
//                     </View>

//                     <View style={{marginTop: 32}}>
//                         <Text style={styles.inputTitle}>Email Adress</Text>
//                         <TextInput
//                             style={styles.input}
//                             autoCapitalize="none"
//                             onChangeText={email => this.setState({ email })}
//                             value={this.state.email}>
//                         </TextInput>
//                     </View>

//                     <View style={{marginTop: 32}}>
//                         <Text style={styles.inputTitle}>Password</Text>
//                         <TextInput
//                             style={styles.input}
//                             secureTextEntry
//                             autoCapitalize="none"
//                             onChangeText={password => this.setState({ password})}
//                             value={this.state.password}>

//                         </TextInput>
//                     </View>
//                 </View>

//                 <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
//                     <Text style={{color: "#FFF", fontWeight: "500"}}>Sign Up</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity style={{ alignSelf: "center", marginTop: 20}} onPress={() => this.props.navigation.navigate("Login")}>
//                     <Text style={{color: "#414959", fontSize: 13}}>
//                         Already have an account? <Text style={{fontWeight: "500", color: "#E9446A"}}>Login</Text>
//                     </Text>
//                 </TouchableOpacity>

//                 <View  style={styles.errorMassage}>
//                     {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text> }
//                 </View>
//             </View>


//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,

//     },
//     greetings: {
//         marginTop: -32,
//         fontSize: 18,
//         fontWeight: "400",
//         textAlign: "center"
//     },
//     errorMassage: {
//         height: 30,
//         alignItems: "center",
//         justifyContent: "center",
//         marginHorizontal: 20
//     },
//     error: {
//         color: "#E9446A",
//         fontSize: 13,
//         fontWeight: "600",
//         textAlign: "center"
//     },
//     form: {
//         top: 180,
//         marginBottom: 200,
//         marginHorizontal: 30
//     },
//     inputTitle: {

//         color: "#BABF9E",
//         fontSize: 10,
//         textTransform: "uppercase"
//     },
//     input: {
//         borderBottomColor: "#BABF9E",
//         borderBottomWidth: StyleSheet.hairlineWidth,
//         height: 40,
//         fontSize: 15,
//         color: "#161F3D"
//     },
//     button: {
//         marginHorizontal: 30,
//         backgroundColor: "#E9446A",
//         borderRadius: 4,
//         height: 52,
//         alignItems: "center",
//         justifyContent: "center"
//     },
//     avatar: {
//         width: 100,
//         height: 100,
//         borderRadius: 50,
//         backgroundColor: "#E1E2E6",
//         marginTop: 15,
//         justifyContent: "center",
//         alignItems: "center"
//     },
// })





import React from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image} from 'react-native';
import * as firebase from 'firebase';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import Firebase from './Firebase/Firebase'


export default class RegisterScreen extends React.Component {
    state = {

        user : {
            fname: "",
            lname: "",
            email: "",
            password: "",
            avatar: null,
        },
        errorMessage: null
    }

    handleSignUp = () => {

        Firebase.shared.createUser(this.state.user);
    }

    handlePickAvater = async () => {
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
                    user: {...this.state.user, avatar: res.uri}
                });
              }
              console.log(this.state.user.avatar)
            });

    };


    render() {
        return (
            <View style={styles.container}>

                <View style={{ position: "absolute", top: 44, alignItems: "center", width: "100%"}}>
                    <Text style={styles.greetings}>{'Hello!\nSign Up to get started.'}</Text>
                    <TouchableOpacity style={styles.avaterPlaceholder} onPress={this.handlePickAvater}>
                        <Image source={{uri: this.state.user.avatar}} style={styles.avatar}/>
                        <Icon
                            name='add'
                            type='metarial'
                            size={40}
                            color="#FFF"
                            style={{marginTop: 6, marginLeft: 2}}/>
                    </TouchableOpacity>
                </View>



                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={fname => this.setState({ user: {...this.state.user, fname} })}
                            value={this.state.user.fname}>
                        </TextInput>
                    </View>

                    <View style={{marginTop: 30}}>
                        <Text style={styles.inputTitle}>Last Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={lname => this.setState({  user: {...this.state.user, lname} })}
                            value={this.state.user.lname}>
                        </TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Email Adress</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ user: {...this.state.user, email} })}
                            value={this.state.user.email}>
                        </TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({  user: {...this.state.user, password} })}
                            value={this.state.user.password}>

                        </TextInput>
                    </View>
                </View>

                <View  style={styles.errorMassage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text> }
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
        marginTop: -32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMassage: {
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        top: 180,
        marginBottom: 200,
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
    avaterPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50,

    },
})