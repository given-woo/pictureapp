import './Form.css';

import { useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { useCollectionData } from "react-firebase-hooks/firestore";

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

function Form() {
    const navigage = useNavigate();

    const sendPicture = async (e) => {
        e.preventDefault();
        
        var file = document.forms['form']['file'].files[0];

        const Ref=db.collection("PictureBase");
        
        const imageName = Math.random().toString(36).substring(2, 12);
        const storageRef = ref(storage, imageName);

        if(file) {
            uploadBytes(storageRef, file).then((snapshot) => {
                getDownloadURL(storageRef).then((url) => {
                    Ref.add({
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                        imgurl : url,
                        likes: 0,
                        likedBy: [],
                    })
                });
            });
        }
        else {
            alert("Please upload a file!");
        }
    }

    return(
        <div className='Form'>
            <form name="form" onSubmit={sendPicture}>
                <label id="File" htmlFor="File-For">
                    Choose File
                </label>
                <input id="File-For" type="file" name="file" accept="image/png, image/jpeg, image/gif"></input>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default Form;