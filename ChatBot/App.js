import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Icon } from 'react-native-elements';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import MessageScreen from './screens/MessageScreen';
import PostScreen from './screens/PostScreen';
import NotificationScreen from './screens/NotificationScreeen';
import ProfileScreen from './screens/ProfileScreen';



import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC90VUvarpkhqlKMofe1KOm9JGAjdW5V1Y",
    authDomain: "chatbot-b0191.firebaseapp.com",
    databaseURL: "https://chatbot-b0191.firebaseio.com",
    projectId: "chatbot-b0191",
    storageBucket: "chatbot-b0191.appspot.com",
    messagingSenderId: "694802794380",
    appId: "1:694802794380:web:63cab10b7f1cc8436a38a9"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const AppContainer = createStackNavigator(
    {
       default: createBottomTabNavigator(

            {
                Home: {
                    screen: HomeScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Icon name="home" size={24} color={tintColor}></Icon>

                    }
                },
                Message: {
                    screen: MessageScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Icon name="chat" size={24} color={tintColor}></Icon>

                    }
                },
                Post: {
                    screen: PostScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) =>
                        <Icon
                            name="add"
                            size={48}
                            color="#E9446A"
                            style={{
                                shadowColor:"#E9446A",
                                shadowOffset: { width: 0, height: 0},
                                shadowRadius: 10,
                                shadowOpacity: 0.3
                            }}>
                            </Icon>

                    }
                },
                Notification: {
                    screen: NotificationScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Icon name="notifications" size={24} color={tintColor}></Icon>

                    }
                },
                Profile: {
                    screen: ProfileScreen,
                    navigationOptions: {
                        tabBarIcon: ({tintColor}) => <Icon name="person" size={24} color={tintColor}></Icon>

                    }
                },
            },
            {
                defaultNavigationOptions: {
                    tabBarOnPress: ({navigation, defaultHandler}) => {
                        if(navigation.state.key === "post"){
                            navigation.navigate("PostModal");
                        } else {
                            defaultHandler()
                        }
                    }
                },
                tabBarOptions: {
                    activeTintColor: "#161F3D",
                    inactiveTintColor: "#B8BBC4",
                    showLabel: false
                }
            }
       ),
       postModal: {
           screen: PostScreen
       }
    },
    {
        mode: "modal",
        headerMode: "none",
        // initialRouteName: "postModal"
    }
)

const AuthStack = createStackNavigator({
    Login: {screen: LoginScreen, navigationOptions:{headerShown: false}},
    Register: {screen: RegisterScreen, navigationOptions:{headerShown: false}},

});

export default createAppContainer(
    createSwitchNavigator({
        Loading: LoadingScreen,
        App: AppContainer,
        Auth: AuthStack
    },
    {
        initialRouteName: "Auth"
    }
    )
);
