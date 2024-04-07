import classes from "./Userprofile.module.css";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Router from 'next/router'

import styles from "../../styles/Home.module.css";
import flash from "flash";

function Userprofile(props) {
  
  const [model, setmodel] = useState(false);
  let idcookie;
  let id;
  useEffect(() => {
    async function getcook() {
      console.log("poo");
      console.log(props);
    }
    getcook();
  }, []);
  const [disfolow, setdisfolow] = useState(props.disfollow);

  async function followingHandler() {
    if (props.fing === false) {
      const postid = { id: props.userDetails.id, idcookie: props.idcookie };
      const response = await fetch(
        "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/getfollowing",
        {
          method: "post",
          body: JSON.stringify(postid),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
    }

    Router.reload(window.location.pathname)
  }
  function setunfollow() {
    console.log("pioopa");
    setmodel(true);
  }
  async function unfollowHandler() {
   
      const postid = { id: props.userDetails.id, idcookie: props.idcookie };
      const response = await fetch(
        "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/unfollow",
        {
          method: "post",
          body: JSON.stringify(postid),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
    

    Router.reload(window.location.pathname)
  }
  function closemodel() {
    Router.reload(window.location.pathname)
    setmodel(false);
  }
  return (
    <div className={classes.profilebox}>
      <div className={classes.profileDescriptionBox}>
        <div className={classes.profileboxleft}>
          <div className={classes.profileimgcontainer}>
            <img
              src={
                props.userDetails.dp === ""
                  ? "https://freedesignfile.com/upload/2018/08/Robot-cartoon-image-design-vector.jpg"
                  : props.userDetails.dp
              }
              alt=""
            ></img>
          </div>
        </div>
        <div className={classes.profileboxright}>
          <div className={classes.samelineitems}>
            <h1> {props.userDetails.name} </h1>

            <span className={classes.profilefollow}>
              {!props.fing && props.disfollow && (
                <button
                  className={classes.followerbtn}
                  onClick={followingHandler}
                >
                  Follow
                </button>
              )}
              {props.fing && props.disfollow && (
                <button className={classes.followingbtn} onClick={setunfollow}>
                  Following
                </button>
              )}
              {model && (
                <div className={classes.modelback}>
                  <div className={classes.overlay}>
                    <div className={classes.confirmdel}>
                      Are you sure you want to unfollow
                      
                      <button className={classes.btn} onClick={unfollowHandler} >
                        unfollow
                      </button>
                      <button className={classes.btn} onClick={closemodel}>
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </span>
          </div>
          <div className={classes.profilefollowers}>
            <button className={classes.followerbtn}>
              {props.userDetails.following.length} following
            </button>{" "}
            <button className={classes.followerbtn}>
              {" "}
              {props.userDetails.followers.length} followers
            </button>
          </div>
          <p className={classes.profilebio}> {props.userDetails.bio} </p>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
