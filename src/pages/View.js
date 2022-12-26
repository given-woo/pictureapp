import './View.css';

import React from 'react';

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import { useCollection } from "react-firebase-hooks/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyAyIm8PyiWzA6IFA063jKLGQRqLVRUkhwg",
    authDomain: "pictureapp-44d55.firebaseapp.com",
    projectId: "pictureapp-44d55",
    storageBucket: "pictureapp-44d55.appspot.com",
    messagingSenderId: "181554752441",
    appId: "1:181554752441:web:02edc7a04a82d421522468"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = getStorage();

function Pic(props) {
    const {imgurl, likes} = props.image;

    const plusLike = () => {
        axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=0312fa8c8adc4c829dc0332a093cf39d').then((response) => {
            var docRef = db.collection("PictureBase").doc(props.name);
            docRef.get().then((doc) => {
                var likedBy = doc.data().likedBy;
                if(likedBy.includes(response.data.ip_address)) {
                    alert('Please vote another picture')
                }
                else {
                    likedBy.push(response.data.ip_address);
                    docRef.set({
                        createdAt: doc.data().createdAt,
                        imgurl : doc.data().imgurl,
                        likedBy: likedBy,
                        likes: doc.data().likes + 1,
                    })
                }
            });
        })
    }

    const minusLike = () => {
        axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=0312fa8c8adc4c829dc0332a093cf39d').then((response) => {
            var docRef = db.collection("PictureBase").doc(props.name);
            docRef.get().then((doc) => {
                var likedBy = doc.data().likedBy;
                if(likedBy.includes(response.data.ip_address)) {
                    alert('Please vote another picture')
                }
                else {
                    likedBy.push(response.data.ip_address);
                    docRef.set({
                        createdAt: doc.data().createdAt,
                        imgurl : doc.data().imgurl,
                        likedBy: likedBy,
                        likes: doc.data().likes - 1,
                    })
                }
            });
        })
    }

    return (
        <div className="image">
            <img src={imgurl}></img>
            <p>{likes} Up votes</p>
            <div className='buttons'>
                <button onClick={plusLike}>Vote Up</button>
                <button onClick={minusLike}>Vote Down</button>
            </div>
        </div>
    )
}

function View() {
    const Ref = db.collection("PictureBase");
    const query = Ref.orderBy("createdAt", "desc");
    const [value, loading, error] = useCollection(query, { idField: "id" });

    return (
        <div className="App">
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            {loading && <span>Collection: Loading...</span>}
            {value && value.docs.map((doc) => (
                <Pic image={doc.data()} name={doc.id} />
            ))}
        </div>
    );
}

export default View;
