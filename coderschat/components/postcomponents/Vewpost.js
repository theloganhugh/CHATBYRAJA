import { useState } from "react";
import Card from "../Card";
import classes from "./Viewpost.module.css";
import Comments from "./Comments";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";

import Head from "next/head";

import Updatepostcom from "./updatepostcom";
import { Fragment } from "react";
import { useRef } from "react";

function Viewpost(props) {
  const [combtn, setcombtn] = useState(true);
  let nlikes = "";
  const [likearrayst, setlikearrayst] = useState([]);
  const [nlike, setnlike] = useState("");
  const [pos, setpos] = useState(0);
  const [curimg, setcurimg] = useState(props.image[pos]);
  const [dummy, setdummy] = useState(false);
  const authuser = props.username === props.user.username;
 // console.log(authuser);
  const [spinner, setspinner] = useState(false);
  const [comstate, setcomstate] = useState([]);
  const [like, setlike] = useState(false);
  const [ispro, setispro] = useState(props.ispro);

  async function getcom() {
    let com = [];

    const postid = { postid: props.postid };
    const response = await fetch(
      "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/getallcomments",
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

    //  console.log(com);

    setcomstate(com);
  }
  useEffect(async () => {
      
    let com = [];
    let likearray = [];
    //  console.log(dummy);
    //console.log(props.postid);
    const postid = { postid: props.postid };
    const response = await fetch(
      "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/getallcomments",
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

    console.log(ispro);

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
  }, []);
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
  async function changelike() {
    if (like === false) {
      const index = likearrayst.indexOf(props.user.username);
      if (index === -1) {
        likearrayst.push(props.user.username);
        // likearray.push('User')
      //  console.log(props.user.username);

        const postid = { postid: props.postid, like: likearrayst };
        const response = await fetch(
          "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/likes",
          {
            method: "POST",
            body: JSON.stringify(postid),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
      }
    } else {
      const index = likearrayst.indexOf(props.user.username);
      if (index > -1) {
        likearrayst.splice(index, 1);

        const postid = { postid: props.postid, like: likearrayst };
        const response = await fetch(
          "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/likes",
          {
            method: "DELETE",
            body: JSON.stringify(postid),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
      }
    }
    setlike(!like);
    setnlikes(likearrayst.length);
  }
  const router = useRouter();
  const bodyInputRef = useRef();
  const [confirmdelete, setconfirmdelete] = useState(false);
  function checkcom() {
    if (bodyInputRef.current.value === "") setcombtn(true);
    else {
      setcombtn(false);
    }
  }

  function viewconfirmdel() {
    setconfirmdelete(!confirmdelete);
  }

  async function addcomhandler(event) {
    setspinner(true);
    event.preventDefault();
    setdummy(!dummy);
    setcombtn(true);
    const bodycom = bodyInputRef.current.value;
    const comdata = {
      body: bodycom,
      postid: props.postid,
      username: props.user.username,
    };
    const response = await fetch(
      "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/addcomments",
      {
        method: "POST",
        body: JSON.stringify(comdata),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    //  console.log(response);

    bodyInputRef.current.value = "";
    getcom();
    setspinner(false);
  }
  function goleft() {
    if (pos > 0) {
      setcurimg(props.image[pos - 1]);
      setpos(pos - 1);
    }
    if (pos === 0) {
      setcurimg(props.image[props.image.length - 1]);
      setpos(props.image.length - 1);
    }

    //console.log(pos);
  }
  function goright() {
    if (pos < props.image.length - 1) {
      setcurimg(props.image[pos + 1]);
      setpos(pos + 1);
    } else if (pos === props.image.length - 1) {
      setcurimg(props.image[0]);
      setpos(0);
    }

   // console.log(pos);
  }
  return (
    <Fragment>
      {spinner && (
        <div className={styles.modelback}>
          <Spinner />
        </div>
      )}
      <Card>
        <div className={ispro ==true ? classes.formpro : classes.form}>
          <div className={classes.control}>
            <div className={classes.userblock}>
              <button className={classes.button} onClick={props.postmenu}>
                <img
                  className={classes.menu}
                  src="https://img.icons8.com/fluency/30/000000/menu--v2.png"
                />
              </button>

              <span className={classes.username}>{props.username}</span>
            </div>
            <hr
              style={{
                border: "0.1px solid wheat",
                width: "100%",
              }}
            />

            <div className={classes.image}>
              <div className={classes.slideshowcontainer}>
                <div className={classes.fade}>
                  {props.image.length > 1 && (
                    <div className={classes.numbertext}>
                      {pos + 1}/{props.image.length}
                    </div>
                  )}
                  <img src={curimg.url} className={classes.imageimg} />
                </div>

                {props.image.length > 1 && (
                  <>
                    <a className={classes.prev} onClick={goleft}>
                      &#10094;
                    </a>
                    <a className={classes.next} onClick={goright}>
                      &#10095;
                    </a>
                  </>
                )}
              </div>
            </div>
            <div>
              {" "}
              <span className={classes.user}>{props.username}</span>{" "}
              {props.caption}
            </div>
            <div className={classes.like} onClick={changelike}>
              {" "}
              <img
                src={
                  like
                    ? "https://img.icons8.com/color/35/000000/like--v3.png"
                    : "https://img.icons8.com/nolan/35/like.png"
                }
              />{" "}
              <span
                style={{
                  marginLeft: "5px",
                }}
              >
                {nlike}
              </span>
            </div>
          </div>
          <div className={classes.concom}>
            <div className={classes.ncom}>
              {comstate &&
                comstate.map((c) => (
                  <Comments
                    body={c.body}
                    username={c.username}
                    user={props.user}
                    id={c.id}
                    postid={props.postid}
                    handler={props.delcom}
                  />
                ))}
            </div>
            <form className={classes.sform} onSubmit={addcomhandler}>
              <div className={classes.scontrol}>
                <input
                  className={classes.incom}
                  type="text"
                  placeholder="Add comments"
                  ref={bodyInputRef}
                  required
                  id="comments"
                  onChange={checkcom}
                  user={props.user}
                />
                <button className={classes.combtn} disabled={combtn}>
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </Fragment>
  );
}

export default Viewpost;
