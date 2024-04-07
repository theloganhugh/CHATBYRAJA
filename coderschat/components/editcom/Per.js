import Card from "../Card";
import classes from "./acc.module.css";
import React, { useState, useEffect } from 'react';
import { useRef } from "react";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { Fragment } from "react";
import { hash } from "bcryptjs";

function Per(props) {
  const router = useRouter();
  const [viewuser, setviewuser] = useState(false);
  const [viewemail, setviewemail] = useState(false);
  const [viewpass, setviewpass] = useState(false);
  const [viewcpass, setviewcpass] = useState(false);
  const [spinner, setspinner] = useState(false);
  const [ersubmit, setersubmit] = useState(true);
  const userInputRef = useRef();
  const passInputRef = useRef();
  const pass2InputRef = useRef();
  const emailInputRef = useRef();
  
  function focususername() {
    setviewuser(true);
    setersubmit(false);
  }
  function focuspass() {
    setviewpass(true);
  }
  function focuscpass() {
    setviewcpass(true);
    setersubmit(false);
  }
  function focusemail() {
    setviewemail(true);
    setersubmit(false);
  }
  async function submitHandler(event) {
    event.preventDefault();

    const enteredUser = userInputRef.current.value;
  
  const enteredPass2 = pass2InputRef.current.value;
    const enteredEmail = emailInputRef.current.value;

    const userData = {
      bio: enteredEmail,
      age:enteredPass2,
      name:enteredUser,
    };
   
      setspinner(true);

      const response = await fetch("/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/updateper", {
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
            {viewuser && <label htmlFor="username">Name</label>}
            <input
              type="text"
             onFocus={focususername}
              //onBlur={checkusername}
              //onChange={checkusername}
              placeholder="Edit your Name"
            //  required
              id="username"
              ref={userInputRef}
            />
           
            {viewemail && <label htmlFor="email">Bio</label>}
            <input
              type="text"
             onFocus={focusemail}
             // onChange={checkemail}
             // onBlur={validsub}
              placeholder="Edit your Bio"
            //  required
              id="email"
              ref={emailInputRef}
            />
          

            {viewcpass && <label htmlFor="password">Age</label>}
            <input
              type="text"
             //required
              id="password"
             placeholder="Edit your Age"
              //onChange={checkpass}
             // onBlur={validsub}
              onFocus={focuscpass}
              ref={pass2InputRef}
            />
           
            <div className={classes.actions}>
              <button onClick={submitHandler} disabled={ersubmit}>
                Update
              </button>
            </div>
          </div>
        </form>
      
    </Fragment>
  );
}

export default Per;
