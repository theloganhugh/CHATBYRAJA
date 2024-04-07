import Card from "../Card";
import classes from "./login.module.css";
import React, { useState, useEffect } from 'react';
import { useRef } from "react";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { Fragment } from "react";
import { hash } from "bcryptjs";

function Signup(props) {
  const router = useRouter();
  const [spinner, setspinner] = useState(false);
  const [eremail, seteremail] = useState(false);
  const [viewuser, setviewuser] = useState(false);
  const [viewemail, setviewemail] = useState(false);
  const [viewpass, setviewpass] = useState(false);
  const [viewcpass, setviewcpass] = useState(false);
  const [ername, setername] = useState(false);
  const [ercpass, setercpass] = useState(false);
  const [ersubmit, setersubmit] = useState(true);
  const [validemail, setvalidemail] = useState(false);
  const [validemail2, setvalidemail2] = useState(true);
  const [validuser, setvaliduser] = useState(true);
  const [validpass, setvalidpass] = useState(true);
  const userInputRef = useRef();
  const passInputRef = useRef();
  const pass2InputRef = useRef();
  const emailInputRef = useRef();
  function focusemail() {
    setviewemail(true);
    seteremail(false);
    
    setvalidemail(false);
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
  useEffect(() => {
if(!validuser && !validpass && !validemail2 && !validemail)
    setersubmit(false);
    else
    setersubmit(true);
  }, [validemail, validemail2, validuser , validpass]);

  function checkemail(event) {
    if (validateEmail(event.target.value)) {
      setvalidemail(false);
    } else {
      setvalidemail(true);
    }
    if (!validemail) {
      for (let user of props.userlist) {
        if (user.email === event.target.value) {
          seteremail(true);
          setersubmit(true);
          setvalidemail2(true);
          // console.log(eremail);
          break;
        } else {
          seteremail(false);
          setvalidemail2(false);
        }
      }
    }
  }
  function focususername() {
    setviewuser(true);
    setername(false);

  }
  function focuspass() {
    setviewpass(true);
    setercpass(false);
   
  }
  function focuscpass() {
    setviewcpass(true);
 
    setercpass(false);
  }
  function checkusername(event) {
    for (let user of props.userlist) {
      if (user.username === event.target.value) {
        setername(true);
        setersubmit(true);
        setvaliduser(true);
        //  console.log(eremail);
        break;
      } else {
        setername(false);
        setvaliduser(false);
      }
    }
  }
  function checkpass(params) {
    const enteredPass = passInputRef.current.value;
    const enteredPass2 = pass2InputRef.current.value;
    if (enteredPass2 !== enteredPass) {
      setercpass(true);
      setersubmit(true);
      setvalidpass(true);
    } else {
      setercpass(false);
      setvalidpass(false);
    }
  }
  async function submitHandler(event) {
    event.preventDefault();

    const enteredUser = userInputRef.current.value;
    const enteredPass = passInputRef.current.value;
    const enteredPass2 = pass2InputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const userData = {
      username: enteredUser,
      email: enteredEmail,
      password: await hash(enteredPass, 12),
      dp: "",
      post: [],
      bio: "Hey I m on CodersChat",
      following: [],
      followers: [],
    };
    if (!validuser && !validpass && !validemail2 && !validemail) {
      setspinner(true);

      const response = await fetch("/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/newuser", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(response);

   //   console.log(userData);
      router.push("/");
      setspinner(false);
    } else {
      setersubmit(true);
    }
  }
  return (
    <Fragment>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Comforter&display=swap');
        </style>
      </Head>
      
        {spinner && (
          <div className={styles.modelback}>
            <Spinner />
          </div>
        )}

        <form className={classes.sform} onSubmit={submitHandler}>
          <div className={classes.control}>
            {viewuser && <label htmlFor="username">Username </label>}
            <input
              type="text"
              onFocus={focususername}
             // onBlur={validsub}
              onChange={checkusername}
              placeholder="User Name"
              required
              id="username"
              ref={userInputRef}
            />
            {ername && (
              <span className={classes.err}> ! Username is already used</span>
            )}
            {viewemail && <label htmlFor="email">Email </label>}
            <input
              type="email"
              onFocus={focusemail}
              onChange={checkemail}
             // onBlur={validsub}
              placeholder="Email"
              required
              id="email"
              ref={emailInputRef}
            />
            {eremail && (
              <span className={classes.err}> ! email is already used</span>
            )}
            {validemail && (
              <span className={classes.err}> ! enter valid email</span>
            )}
            {viewpass && <label htmlFor="password">Password </label>}
            <input
              type="password"
              required
              id="password"
              placeholder="Password"
              onChange={checkpass}
             // onBlur={validsub}
              onFocus={focuspass}
              ref={passInputRef}
            />

            {viewcpass && <label htmlFor="password">Confirm Password </label>}
            <input
              type="password"
              required
              id="password"
              placeholder="Confirm Password"
              onChange={checkpass}
             // onBlur={validsub}
              onFocus={focuscpass}
              ref={pass2InputRef}
            />
            {ercpass && (
              <span className={classes.err}>
                {" "}
                ! Those passwords didn’t match. Try again
              </span>
            )}
            <div className={classes.actions}>
              <button onClick={submitHandler} disabled={ersubmit}>
                Sign Up!
              </button>
            </div>
          </div>
        </form>
      
    </Fragment>
  );
}

export default Signup;
