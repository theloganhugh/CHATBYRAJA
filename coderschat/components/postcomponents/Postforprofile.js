import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import Card from "../Cardforprofile";
import classes from "./Postforprofile.module.css";
import Head from "next/head";
import { useState } from "react";
import Updatepostcom from "./updatepostcom";
import { Fragment } from "react";
import {useRef} from 'react';
import Comments from "./Comments";
import Viewpost from "./vewpost";


function Post(props) {
  let nlikes = "";
  const [viwpost, setviwpost] = useState(false);

  const [dummy, setdummy] = useState(false);
const authuser= props.username===props.user.username;
  console.log(authuser);
  const [spinner, setspinner] = useState( false );
  const [comstate, setcomstate] =useState([]);
  const [likearrayst, setlikearrayst] = useState([]);
  const [like, setlike] = useState(false);
  const [rel, setrel] =useState("");
  const [nlike, setnlike] = useState("");
  async function getcom() {
    let com = [];
    //  ////console.log(dummy);
    const postid = { postid: props.id };
    const response = await fetch(
      "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/getcomments",
      {
        method: "post",
        body: JSON.stringify(postid),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((data) => (com = JSON.parse(data).data));

    //  ////console.log(com);

    setcomstate(com);
  }
  useEffect(async () => {
    let com = [];
    let likearray = [];
  

    //  ////console.log(dummy);
    const postid = { postid: props.id };
    const response = await fetch(
      "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/getcomments",
      {
        method: "post",
        body: JSON.stringify(postid),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((data) => (com = JSON.parse(data).data));

    //  ////console.log(com);

    setcomstate(com);
    const response11 = await fetch(
      "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/getlikes",
      {
        method: "post",
        body: JSON.stringify(postid),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((data) => (likearray = JSON.parse(data).data));
    console.log(likearray)
    if (likearray) {
      setnlikes(likearray.length);
      setlikearrayst(likearray);
      const index = likearray.indexOf(props.user.username);
      if (index > -1) {
        setlike(true);
      } else {
        setlike(false);
      }
    }
    let tstr="";
    if(props.relate){
    for(let r of props.relate){
      tstr=tstr+r +" ";
    }
    setrel(tstr)
  }
  else{
    setrel("")
  }
  }, []);
  //console.log(likearray)
  function setnlikes(n) {
    if (n === 0) {
      nlikes = "";
      setnlike(nlikes);
    } else if (n === 1) {
      nlikes = n + " like";
      setnlike(nlikes);
    } else if (n <= 1000) {
      nlikes = n + " likes";
      setnlike(nlikes);
    } else if (n > 1000 && n < 1000000) {
      n = n / 1000;
      nlikes = Number.parseFloat(n).toFixed(2) + "k likes";
      setnlike(nlikes);
    } else if (n > 1000000 && n < 1000000000) {
      n = n / 1000000;
      nlikes = Number.parseFloat(n).toFixed(2) + "M likes";
      setnlike(nlikes);
    } else {
      n = n / 1000000000;
      nlikes = Number.parseFloat(n).toFixed(2) + "B likes";
      setnlike(nlikes);
    }
  }
  const router = useRouter();
  const bodyInputRef = useRef();
  const [confirmdelete, setconfirmdelete] = useState(false);
  const [updatepost, setupdatepost] = useState(false);
 // const [spinner, setspinner] = useState(false);
  const [postmenu, setpostmenu] = useState(false);
  const [combtn, setcombtn] = useState(true);
 

  function postmenuhandler() {
    setpostmenu(!postmenu);
  }
  function checkcom() {
    if(bodyInputRef.current.value==='')
      setcombtn(true);
    else{
      setcombtn (false);
    }
  }
  function closemodel() {
    router.push("/");
    setupdatepost(false);
    setpostmenu(false);
    setconfirmdelete(false);
  }
  function viewconfirmdel() {
    setconfirmdelete(!confirmdelete);
  }
  function viewcurrpost() {
    setviwpost(true);
  }
  async function deletepost() {
 
    const postid = { id: props.id };
    setpostmenu(false);
    setspinner(true);
    const param = "delete-post";
    router.push(
      {
        pathname: `/`,
        query: {
          param,
        },
      },
      `/?param=${param}`,
      { shallow: true }
      
    );
   
    const response = await fetch("/api/delete-post", {
      method: "DELETE",
      body: JSON.stringify(postid),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
   // console.log(data);

    router.push("/");
    setspinner(false);
  }
  function viewposthandler() {
    const param = "update-post";
    router.push(
      {
        pathname: `/`,
        query: {
          param,
        },
      },
      `/?param=${param}`,
      { shallow: true }
    );
    setupdatepost(!updatepost);
  }
  async function closemodelv() {
    // router.push("/");
    let likearray = [];
    const postid = { postid: props.id };
   
    const response11 = await fetch(
      "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/getlikes",
      {
        method: "post",
        body: JSON.stringify(postid),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((data) => (likearray = JSON.parse(data).data));

    //console.log(likearray)
    if (likearray) {
      setnlikes(likearray.length);
      setlikearrayst(likearray);
      const index = likearray.indexOf(props.user.username);
      if (index > -1) {
        setlike(true);
      } else {
        setlike(false);
      }
    }
   
    getcom();
    setupdatepost(false);
    setpostmenu(false);
    setconfirmdelete(false);
    setviwpost(false);
  }
  async function addcomhandler(event)
  {
    setspinner(true);
    event.preventDefault();
    setdummy(!dummy);
setcombtn(true);
    const bodycom=  bodyInputRef.current.value;
    const comdata={
      body:bodycom,
      postid:props.id, 
      
    }
    const response = await fetch("/api/addcomments", {
      
      method: "POST",
      body: JSON.stringify(comdata),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
 //  console.log(response);
 
    bodyInputRef.current.value="";
    getcom();
    setspinner(false);
  }
 async function delcom(comdata){
setspinner(true);
  const response = await fetch("/api/deletecom", {
            
    method: "DELETE",
    body: JSON.stringify(comdata),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
//  console.log(response);
console.log(response);
getcom();
setspinner(false);
 }
  async function updatehandler(enteredpostData) {
    setupdatepost(!updatepost);
    setspinner(true);
    enteredpostData.id = props.id;
    
    const response = await fetch("/api/update-post", {
      method: "PUT",
      body: JSON.stringify(enteredpostData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
   console.log(data);

    router.push("/");
    setspinner(false);
    setpostmenu(false);
  }
  return (
    <Fragment>

      <Head>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,300&display=swap');
</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,600&display=swap');
</style>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Offside&display=swap');
        </style>
      </Head>
      
      {postmenu && (
        <div className={classes.modelback}>
          <div className={classes.postmenu}>
          <button className={classes.btn} onClick={viewcurrpost}>
              View post
            </button>
         { authuser&&  <button className={classes.btn} onClick={viewposthandler}>
              Update
            </button>}
          { authuser && <button className={classes.btn} onClick={viewconfirmdel}>
              Delete
            </button>}
            <button className={classes.btn} onClick={postmenuhandler}>
              Close
            </button>
          </div>
        </div>
      )}
      {confirmdelete && (
        <div className={classes.modelback}>
          <div className={classes.confirmdel}>
            Are you sure you want to delete the post
            <button className={classes.btn} onClick={deletepost}>
              Delete
            </button>
            <button className={classes.btn} onClick={closemodel}>
             Close
            </button>
          </div>
        </div>
      )}
      {updatepost && !spinner && (
        <div className={classes.modelback}>
          <div className={styles.overlay}>
            <div className={styles.close}>
              {" "}
              <button className={styles.button} onClick={closemodel}>
                {" "}
                <img src="data:image/png;base64,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" />{" "}
              </button>
            </div>
            <Updatepostcom
              image={props.image}
              caption={props.caption}
              username={props.username}
              onUpdatepost={updatehandler}
            />
          </div>
        </div>
      )}
     {viwpost && !spinner && (
        <div className={classes.modelback}>
          <div className={styles.overlay}>
            <div className={styles.close}>
              {" "}
              <button className={styles.button} onClick={closemodelv}>
                {" "}
                <img src="data:image/png;base64,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" />{" "}
              </button>
            </div>
            <Viewpost
              image={props.image}
              caption={props.caption}
              username={props.username}
              //comm={comstate}
              delcom={delcom}
              user={props.user}
              // closevw={closevw}
              postmenu={postmenuhandler}
              postid={props.id}
              ispro={true}
            />
          </div>
        </div>
      )}
      {spinner && (
        <div className={styles.modelback}>
          <Spinner />
        </div>
      )}

      <Card>
        
        <div className={classes.image}>
          <img src={props.image[0].url} onClick={postmenuhandler} />
        </div>

      </Card>
    </Fragment>
  );
}

export default Post;
