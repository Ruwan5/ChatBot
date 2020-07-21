// import firebase from "firebase";
import * as firebase from 'firebase';
// import firebaseConfig from "../../App"

// const firebaseConfig = {
//     apiKey: "AIzaSyC90VUvarpkhqlKMofe1KOm9JGAjdW5V1Y",
//     authDomain: "chatbot-b0191.firebaseapp.com",
//     databaseURL: "https://chatbot-b0191.firebaseio.com",
//     projectId: "chatbot-b0191",
//     storageBucket: "chatbot-b0191.appspot.com",
//     messagingSenderId: "694802794380",
//     appId: "1:694802794380:web:63cab10b7f1cc8436a38a9"
// };

class Firebase {
    // constructor() {
    //     if(!firebase.apps.length){
    //         firebase.initializeApp(firebaseConfig);
    //     }

    // }

    addPost = async ({text, localUrl}) => {
        console.log(text)
        console.log(localUrl)
        if(localUrl == null){
            let posts ={}
            posts['text'] = text.toString();
            posts['uid'] = this.uid.toString(),
            posts['timestamp'] = this.timestamp.toString(),

            firebase.firestore().collection("posts").add(posts).then(
                alert("Successfully Posted!")
            )
        } else {
            var remoteUrl = this.uploadPhotoAsync(localUrl);
            console.log(remoteUrl)
            firebase.firestore().collection("posts").add({
                text: text.toString(),
                uid: this.uid.toString(),
                timestamp: this.timestamp.toString(),
                image: remoteUrl.toString()
            }).then(
                alert("Successfully Posted!")
            )
        }


        // firebase.firestore().collection("posts").add({
        //     text,
        //     uid: this.uid,
        //     timestamp: this.timestamp,
        //     image: remoteUrl
        // })
        // return new Promise(async (res, rej) => {
        //      firebase.firestore()
        //         .collection("posts")
        //         .add({
        //             text: text,
        //             uid: this.uid,
        //             timestamp: this.timestamp,
        //             image: remoteUrl
        //         })
        //         .then(ref => {
        //             res(ref);
        //         })
        //         .catch(error => {
        //             rej(error);
        //         })
        // })
    }

    uploadPhotoAsync = async url => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`
        console.log(path)
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