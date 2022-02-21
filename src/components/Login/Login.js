import React from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";

import Button from "@mui/material/Button";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        dispatch({
          type: actionTypes.SET_SESSION,
          uid: result.user.uid,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <section className="login">
      <div className="login__container">
        <div className="login__container--text"></div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </section>
  );
}

export default Login;
