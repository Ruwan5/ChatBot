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

var firebaseConfig = {
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

const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => <Icon name="3d-rotation" size={24} color={tintColor}></Icon>

            }
        }
    },
    {}
)

const AuthStack = createStackNavigator({
    Login: {screen: LoginScreen, navigationOptions:{headerShown: false}},
    Register: {screen: RegisterScreen, navigationOptions:{headerShown: false}},

});

export default createAppContainer(
    createSwitchNavigator({
        Loading: LoadingScreen,
        App: AppTabNavigator,
        Auth: AuthStack
    },
    {
        initialRouteName: "Loading"
    }
    )
);
