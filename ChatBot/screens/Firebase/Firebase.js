import firebase from "firebase";
import firestore from '@react-native-firebase/firestore'


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

            firestore().collection("posts").add(
                {text: text.toString(),
                uid: this.uid.toString(),
                timestamp: this.timestamp.toString(),
                image: null},
            ).then(
                alert("Successfully Posted!")
            )
        } else {
            var remoteUrl = this.uploadPhotoAsync(localUrl, `photos/${this.uid}/${Date.now()}.jpg`);
            console.log(remoteUrl)
            firebase.firestore().collection("posts").add(
                {text: text.toString(),
                uid: this.uid.toString(),
                timestamp: this.timestamp.toString(),
                image: remoteUrl.toString()}
            ).then(
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

    uploadPhotoAsync = async (url, filename) => {
        // const path = `photos/${this.uid}/${Date.now()}.jpg`
        const path = filename
        console.log(path)
        return new Promise(async (res, rej) => {
            const response = await fetch(url)
            const file = await response.blob()

            let upload = firebase.storage().ref(filename).put(file)

            upload.on("state_changed", snapshot => {}, err => {
                rej(err);
            })
        })
    }


    createUser = async user => {
        let remoteUrl = null

        try{
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

            let db = this.firestore.collection("users").doc(this.uid.toString());

            db.set({
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                avatar: null
            });

            if(user.avatar){
                remoteUrl = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}.jpg`);

                db.set({avatar: remoteUrl}, {merge: true})
            }

            alert("User created successfully!");

        } catch (err){
            alert(err);
        }
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