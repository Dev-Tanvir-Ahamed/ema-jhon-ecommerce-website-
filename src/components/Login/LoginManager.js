import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import firebaseConfig from "./firebase.config";
export const initializeApp = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

// var githubProvider = new firebase.auth.GithubAuthProvider();

// Google Sign In
export const googleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const displayUser = {
        isSingInuser: true,
        name: displayName,
        email: email,
        img: photoURL,
      };
      return displayUser;
    });
};

// Google Sign Out

export const googleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      const displayOut = {
        isSingInuser: false,
        name: "",
        email: "",
        img: "",
      };
      return displayOut;
    })
    .catch((error) => {
      // An error happened.
    });
};

// Facebook Login

export const facebookSignIn = () => {
  const Facebookprovider = new firebase.auth.FacebookAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(Facebookprovider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // The signed-in user info.
      var user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      // ...
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      // Signed in
      const { displayName, email } = res.user;
      let successUser = { ...res };
      successUser.error = "";
      successUser.isSingInuser = true;
      successUser.name = displayName;
      successUser.email = email;
      successUser.success = true;
      // eslint-disable-next-line no-undef
      updateUserName(name);
      return successUser;

      // ...
    })
    .catch((error) => {
      let newError = {};
      newError.error = error.message;
      newError.success = false;
      return newError;

      // ..
    });
};

// sign in user by email and password

export const signInEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const { displayName, email } = res.user;
      let successUser = { ...res.user };
      successUser.error = "";
      successUser.isSingInuser = true;
      successUser.name = displayName;
      successUser.email = email;
      successUser.success = true;
      return successUser;
      // setLoggedInUser(successUser);
    })
    .catch((error) => {
      let newError = { ...error };
      newError.error = error.message;
      newError.success = false;
      return newError;
    });
};

let updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      // Update successful
      console.log("updated successfully");
    })
    .catch((error) => {
      // An error occurred
      // ...
      console.log(error);
    });
};
