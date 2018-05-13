import firebase from 'firebase';
import store from "./store";

const config = {
  apiKey: "AIzaSyCV6gIStVUYNGcsJIO4rH2uqz5_q32mCR8",
  authDomain: "gears-guru-admin.firebaseapp.com",
  databaseURL: "https://gears-guru-admin.firebaseio.com",
  projectId: "gears-guru-admin",
  storageBucket: "gears-guru-admin.appspot.com",
  messagingSenderId: "636255070931"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log("Got user! ", user);
    const authedUser = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      lastSignInTime: user.metadata.lastSignInTime,
      creationTime: user.metadata.creationTime,
    };
    store.dispatch({ type: "ADD_AUTHED_USER_SUCCESS", user: authedUser });
  } else {
    // No user is signed in.
  }
});

export default firebase;