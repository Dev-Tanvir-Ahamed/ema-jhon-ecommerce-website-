import React, { useContext, useState } from "react";
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import {
  googleSignIn,
  googleSignOut,
  initializeApp,
  facebookSignIn,
  createUserWithEmailAndPassword,
  signInEmailAndPassword,
} from "./LoginManager";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSingInuser: false,
    name: "",
    email: "",
    password: "",
    img: "",
    error: "",
    updateUserName: "",
    success: false,
  });
  initializeApp();

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  };

  const handleGoogleSignIn = () => {
    googleSignIn().then((res) => {
      handleResponse(res, true);
    });
  };

  const handleGoogleSignOut = () => {
    googleSignOut().then((res) => {
      setUser(res);
      handleResponse(res, false);
    });
  };

  const handleFacebookLogin = () => {
    facebookSignIn();
  };

  // const handleGithubSignIn = () => {
  //   firebase
  //     .auth()
  //     .signInWithPopup(githubProvider)
  //     .then((res) => {
  //       const { displayName } = res.user;
  //       const gitUser = {
  //         name: displayName,
  //       };
  //       setUser(gitUser);
  //       console.log("github", user);
  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // The email of the user's account used.
  //       var email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       var credential = error.credential;
  //       console.log(errorCode, errorMessage, email, credential);
  //       // ...
  //     });
  // };

  const handleClickEmail = (e) => {
    let isFormValid = true;
    console.log(e.target.name, e.target.value);
    if (e.target.name === "email") {
      isFormValid = /^\w+([-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        e.target.value
      );
    }
    if (e.target.name === "password") {
      isFormValid =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(
          e.target.value
        );
    }
    if (isFormValid) {
      let newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password).then(
        (res) => {
          handleResponse(res, true);
        }
      );
    }

    if (!newUser && user.email && user.password) {
      signInEmailAndPassword(user.email, user.password).then((res) => {
        handleResponse(res, true);
      });
    }
  };

  return (
    <div>
      {user.isSingInuser ? (
        <button onClick={handleGoogleSignOut}> Google sign out</button>
      ) : (
        <button onClick={handleGoogleSignIn}>Google sign in</button>
      )}

      <button onClick={handleFacebookLogin}>Facebook SignIn</button>

      {/* <button onClick={handleGithub}>Github sign in</button> */}

      {user.isSingInuser && (
        <div>
          <p>Welcome to {user.name}</p>
          <p>{user.email}</p>
          <img src={user.img} alt="" />
        </div>
      )}
      <h1>Our Own Authentication</h1>
      <input
        type="checkbox"
        name="newUser"
        id=""
        onChange={() => setNewUser(!newUser)}
      />
      <label htmlFor="newUser">New User Resister</label>
      <form action="" onSubmit={handleSubmit}>
        {newUser && (
          <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleClickEmail}
          />
        )}
        <br />
        <input
          type="email"
          placeholder="enter your email"
          onChange={handleClickEmail}
          name="email"
        />
        <br />
        <input
          type="password"
          id=""
          placeholder="Enter your Password"
          onChange={handleClickEmail}
          name="password"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
      <p>{user.name}</p>
      <p>{user.email}</p>
      <p>{user.password}</p>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green" }}>
          Succesfully {newUser ? "created" : "sign in"} User
        </p>
      )}
    </div>
  );
};

export default Login;
