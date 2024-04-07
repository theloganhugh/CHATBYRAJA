import Card from "../Card";
import classes from "./login.module.css";
import React, { useState, useEffect } from 'react';
import { useRef } from "react";
import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function Login(props) {
  const router = useRouter();
  const userInputRef = useRef();
  const passInputRef = useRef();
  const [ersubmit, setersubmit] = useState(true);
  const [viewuser, setviewuser] = useState(false);
  const [ername, setername] = useState(true);
  const [ercpass, setercpass] = useState(true);
  const [viewpass, setviewpass] = useState(false);
  const [frst, setfrst] =useState(true);
  const [loginerr, setloginerr] =useState(false);
  
  function focususername() {
    setviewuser(true);
    setfrst(false);
    setloginerr(false);

  }
  function focuspass() {
    setviewpass(true);
    setfrst(false);
    setloginerr(false);
 
  }
  function checkname() {
    if(userInputRef.current.value==='')
      setername(true);
    else{
      setername(false);
    }
  }
  function checkpass() {
    if(passInputRef.current.value==='')
      setercpass(true);
    else{
      setercpass(false);
    }
  }
  useEffect(() => {
    if(!ercpass && !ername)
        setersubmit(false);
        else
        setersubmit(true);
      }, [ername, ercpass]);
async function submitHandler(event) {
  
  event.preventDefault();

    const enteredUser = userInputRef.current.value;
    const enteredPass = passInputRef.current.value;
  
    
    const userData = {
      username: enteredUser,
      
      password:enteredPass,
       };
    
     
       const response = await fetch("/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      
     if(response.status===200)
{
  router.push("/");
}   
else{
  setloginerr(true);
  
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
      <Card>
        <form className={classes.sform} onSubmit={submitHandler}>
          <div className={classes.control}>
            {viewuser && <label htmlFor="username">Username </label>}
            <input
              type="text"
              onFocus={focususername}
              onChange={checkname}
              placeholder="User Name"
              required
              id="username"
              ref={userInputRef}
            />
            

            {viewpass && <label htmlFor="password">Password </label>}
            <input
              type="password"
              required
              id="password"
              placeholder="Password"
              onChange={checkpass}
              onFocus={focuspass}
              ref={passInputRef}
            />
            <div className={classes.actions}>
            <button disabled={ersubmit}>Login</button>
          </div>
          {!frst &&ersubmit && (
              <span className={classes.err}> ! Username or Password cant be empty</span>
            )}
             {loginerr && (
              <span className={classes.err}> ! Username or Password is incorrect</span>
            )}
          </div>
        
         
         
          
        </form>
      </Card>
    </Fragment>
  );
}

export default Login;
