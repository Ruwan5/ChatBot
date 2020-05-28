import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';

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

const AppStack = createStackNavigator({
    Home: HomeScreen
});

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
});

export default createAppContainer(
    createSwitchNavigator({
        Loading: LoadingScreen,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: "Loading"
    }
    )
);
