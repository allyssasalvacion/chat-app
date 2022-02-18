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
      })
      .catch((error) => alert(error.message));
  };

  return (
    <section className="login">
      <div className="login__container">
        <img
          src="https://seeklogo.com/images/W/whatsapp-logo-8AE44BBBB0-seeklogo.com.png"
          alt="logo"
        />
        <div className="login__container--text">
          <h1>Whatsapp</h1>
        </div>
        <Button onClick={signIn}>Sign In With Google</Button>
      </div>
    </section>
  );
}

export default Login;
