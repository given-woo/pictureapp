import './View.css';

import React from 'react';

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import { useCollection } from "react-firebase-hooks/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

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
        var docRef = db.collection("PictureBase").doc(props.name);
        docRef.get().then((doc) => {
            docRef.set({
                createdAt: doc.data().createdAt,
                imgurl : doc.data().imgurl,
                likes: doc.data().likes + 1,
            })
        });
    }

    const minusLike = () => {
        var docRef = db.collection("PictureBase").doc(props.name);
        docRef.get().then((doc) => {
            docRef.set({
                createdAt: doc.data().createdAt,
                imgurl : doc.data().imgurl,
                likes: doc.data().likes - 1,
            })
        });
    }

    return (
        <>
            <img src={imgurl}></img>
            <p>{likes}</p>
            <button onClick={plusLike}>Vote UP</button>
            <button onClick={minusLike}>Vote Down</button>
        </>
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
