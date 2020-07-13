import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyC90VUvarpkhqlKMofe1KOm9JGAjdW5V1Y",
    authDomain: "chatbot-b0191.firebaseapp.com",
    databaseURL: "https://chatbot-b0191.firebaseio.com",
    projectId: "chatbot-b0191",
    storageBucket: "chatbot-b0191.appspot.com",
    messagingSenderId: "694802794380",
    appId: "1:694802794380:web:63cab10b7f1cc8436a38a9"
};

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    addPost = async ({text, localUrl}) => {
        const remoteUrl = await this.uploadPhotoAsync(localUrl);

        return new Promise((res, rej) => {
            this.firestore
                .collection("posts")
                .add({
                    text,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUrl
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                })
        })
    }

    uploadPhotoAsync = async url => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`

        return new Promise(async (res, rej) => {
            const response = await fetch(url)
            const file = await response.blob()

            let upload = firebase.storage().ref(path).put(file)

            upload.on("state_changed", snapshot => {}, err => {
                rej(err);
            })
        })
    }


    get firestore(){
        return firebase.firestore();
    }

    get uid (){
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return Date.now();
    }

}

Firebase.shared = new Firebase();
export default Firebase;