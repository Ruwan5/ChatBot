import firebase from "firebase";
import firestore from '@react-native-firebase/firestore'
import { Alert} from 'react-native';



class Firebase {
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
              Alert.alert("Successfully Posted!")
            )
        } else {
            this.uploadPhotoAsync(localUrl, `photos/${this.uid}/${Date.now()}.jpg`).then(res => {
                var remoteUrl = res;

                firestore().collection("posts").add(
                    {text: text.toString(),
                    uid: this.uid.toString(),
                    timestamp: this.timestamp.toString(),
                    image: remoteUrl}
                )
                .then(
                    Alert.alert("Successfully Posted!")
                )
            })

        }

    }

    uploadPhotoAsync = async (url, filename) => {
        const path = filename
        return new Promise(async (res, rej) => {
            const response = await fetch(url)
            const file = await response.blob()

            let upload = firebase.storage().ref(filename).put(file)

            upload.on("state_changed", snapshot => {}, err => {
                rej(err);
            },
            async () => {
                const url = await upload.snapshot.ref.getDownloadURL();
                console.log("test")
                console.log(url)
                res(url);
            });
        })
    }


    createUser = async user => {
        let remoteUrl = null

        try{
            await firebase.auth().createUserWithEmailAndPassword(user.email, user.password);

            firestore().collection("users").doc(this.uid.toString())
            .set({
                fname: user.fname,
                lname: user.lname,
                email: user.email,
                avatar: null
            });

            if(user.avatar){
                remoteUrl = await this.uploadPhotoAsync(user.avatar, `avatars/${this.uid}.jpg`);

                firestore().collection("users").doc(this.uid.toString()).set({avatar: remoteUrl}, {merge: true})
            }

            Alert.alert("User created successfully!");

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