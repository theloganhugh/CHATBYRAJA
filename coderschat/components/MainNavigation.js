import Link from "next/link";
import Head from "next/head";
import classes from "./MainNavigation.module.css";
import { Fragment } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import styles from "../styles/Home.module.css";
import Userarray from "./usercomponents/Userarray";
import { useState } from "react";
import { useRef } from "react";
import { PromiseProvider } from "mongoose";
function MainNavigation(probs) {
  const [drop, setdrop] = useState(false);
  const router = useRouter();
  const [spinner, setspinner] = useState(false);
  const searchq = useRef();
  const [qurry, setqurry] = useState(false);
  function closemodelv() {
    setqurry(false);
  }
  function prof(){
    router.push("/profile");
  }
  async function logout() {
    setspinner(true);

    console.log(router.pathname);
    const response = await fetch("/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/logout", {
      method: "POST",
      body: "",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(response);
    setspinner(false);
    router.push("/sign-up");
  }
  const [userarray, setuserarray] = useState([]);
  async function searchhandler(event) {
    let com = [];
    event.preventDefault();
    const givenName = searchq.current.value;
    const qname = { qname: givenName };
    const response = await fetch(
      "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/getuser",
      {
        method: "post",
        body: JSON.stringify(qname),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => response.text())
      .then((data) => (com = JSON.parse(data).data));
    setuserarray(com);
    setqurry(true);
    searchq.current.value = "";
  }
  function vwdrop(){
    setdrop(!drop);
  }
  return (
    <Fragment>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Comforter&display=swap');
        </style>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap');
</style>
      </Head>
      {spinner && (
        <div className={styles.modelback}>
          <Spinner />
        </div>
      )}
      {qurry && (
        <div className={classes.modelback}>

          <div className={styles.close}>
            {" "}
            <button className={styles.button} onClick={closemodelv}>
              {" "}
              <img src="data:image/png;base64,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" />{" "}
            </button>
          </div>
          {userarray.length > 0 && (
            <div
              className={userarray.length > 3 ? classes.overlay : classes.rlay}
            >
              {userarray.map((post) => (
                <Userarray
                  key={post.username}
                  username={post.username}
                  img={post.dp}
                  bio={post.bio}
                />
              ))}
            </div>
          )}
          {userarray.length === 0 && (
            <div className={classes.overlaynil}>No results</div>
          )}
        </div>
      )}
      <header className={classes.header}>
        <div className={classes.logo}>CodersChat</div>
        {router.pathname === "/explore" && (
          <form className={classes.sform} onSubmit={searchhandler}>
            <div className={classes.control}>
              <input
                className={classes.incom}
                type="text"
                placeholder="Find User"
                ref={searchq}
                required
                id="search"
                //onChange={checkcom}
                //user={props.user}
              />
              <button
                className={classes.combtn}
                onClick={searchhandler}
                // disabled={combtn}
              >
                <svg className={classes.svg1} viewBox="0 0 20 20">
                  <path
                    fill="none"
                    d="M19.129,18.164l-4.518-4.52c1.152-1.373,1.852-3.143,1.852-5.077c0-4.361-3.535-7.896-7.896-7.896
								c-4.361,0-7.896,3.535-7.896,7.896s3.535,7.896,7.896,7.896c1.934,0,3.705-0.698,5.078-1.853l4.52,4.519
								c0.266,0.268,0.699,0.268,0.965,0C19.396,18.863,19.396,18.431,19.129,18.164z M8.567,15.028c-3.568,0-6.461-2.893-6.461-6.461
								s2.893-6.461,6.461-6.461c3.568,0,6.46,2.893,6.46,6.461S12.135,15.028,8.567,15.028z"
                  ></path>
                </svg>
              </button>
            </div>
          </form>
        )}
        <nav>
          <ul>
            {router.pathname !== "/" && (
              <li className={classes.svge}>
                <Link href="/">
                  <svg className={classes.svg} viewBox="0 0 20 20">
                    <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
                  </svg>
                </Link>
              </li>
            )}
            {router.pathname !== "/explore" && router.pathname !== "/chat" && (
              <li className={classes.svge}>
                <button className={classes.button} onClick={probs.viewpost}>
                  <svg className={classes.svg} viewBox="0 0 20 20">
                    <path
                      fill="none"
                      d="M13.388,9.624h-3.011v-3.01c0-0.208-0.168-0.377-0.376-0.377S9.624,6.405,9.624,6.613v3.01H6.613c-0.208,0-0.376,0.168-0.376,0.376s0.168,0.376,0.376,0.376h3.011v3.01c0,0.208,0.168,0.378,0.376,0.378s0.376-0.17,0.376-0.378v-3.01h3.011c0.207,0,0.377-0.168,0.377-0.376S13.595,9.624,13.388,9.624z M10,1.344c-4.781,0-8.656,3.875-8.656,8.656c0,4.781,3.875,8.656,8.656,8.656c4.781,0,8.656-3.875,8.656-8.656C18.656,5.219,14.781,1.344,10,1.344z M10,17.903c-4.365,0-7.904-3.538-7.904-7.903S5.635,2.096,10,2.096S17.903,5.635,17.903,10S14.365,17.903,10,17.903z"
                    ></path>
                  </svg>
                </button>
              </li>
            )}

            {router.pathname !== "/explore" && (
              <li className={classes.svge}>
                <Link href="/explore">
                  <div className={classes.buttonlog}>
                    <svg className={classes.svg} viewBox="0 0 20 20">
                      <path
                        fill="none"
                        d="M14.584,1.617l-4.625,2.89L5.333,2.195L0.709,4.495v13.888l4.625-2.313l4.625,1.157l4.625-1.734l4.625,1.734
								V3.93L14.584,1.617z M18.053,15.492l-3.469-1.157l-4.625,1.734l-4.625-1.155l-3.468,1.734V5.086l3.468-1.734l4.625,2.312
								l4.625-2.891l3.469,1.734V15.492z M10.248,6.827c-0.16,0-0.29,0.163-0.29,0.363v6.781c0,0.201,0.129,0.363,0.29,0.363
								c0.16,0,0.289-0.162,0.289-0.363V7.19C10.537,6.99,10.408,6.827,10.248,6.827z M5.623,5.093c-0.16,0-0.29,0.163-0.29,0.363v7.938
								c0,0.201,0.129,0.363,0.29,0.363c0.16,0,0.289-0.162,0.289-0.363V5.456C5.912,5.256,5.783,5.093,5.623,5.093z M14.584,12.815
								c0,0.2,0.129,0.363,0.289,0.363s0.289-0.163,0.289-0.363V4.878c0-0.2-0.129-0.364-0.289-0.364s-0.289,0.164-0.289,0.364V12.815z"
                      ></path>
                    </svg>
                  </div>
                </Link>
              </li>
            )}
            {router.pathname !== "/chat" && (
              <li className={classes.svge}>
                <Link href="/chat">
                  <div className={classes.buttonlog}>
                    <svg className={classes.svg} viewBox="0 0 20 20">
                      <path
                        fill="none"
                        d="M12.871,9.337H7.377c-0.304,0-0.549,0.246-0.549,0.549c0,0.303,0.246,0.55,0.549,0.55h5.494
								c0.305,0,0.551-0.247,0.551-0.55C13.422,9.583,13.176,9.337,12.871,9.337z M15.07,6.04H5.179c-0.304,0-0.549,0.246-0.549,0.55
								c0,0.303,0.246,0.549,0.549,0.549h9.891c0.303,0,0.549-0.247,0.549-0.549C15.619,6.286,15.373,6.04,15.07,6.04z M17.268,1.645
								H2.981c-0.911,0-1.648,0.738-1.648,1.648v10.988c0,0.912,0.738,1.648,1.648,1.648h4.938l2.205,2.205l2.206-2.205h4.938
								c0.91,0,1.648-0.736,1.648-1.648V3.293C18.916,2.382,18.178,1.645,17.268,1.645z M17.816,13.732c0,0.607-0.492,1.1-1.098,1.1
								h-4.939l-1.655,1.654l-1.656-1.654H3.531c-0.607,0-1.099-0.492-1.099-1.1v-9.89c0-0.607,0.492-1.099,1.099-1.099h13.188
								c0.605,0,1.098,0.492,1.098,1.099V13.732z"
                      ></path>
                    </svg>
                  </div>
                </Link>
              </li>
            )}
            <li className={classes.svge}>
              <div>
                {" "}
                <img
                  src={
                    probs.dp === ""
                      ? "https://freedesignfile.com/upload/2018/08/Robot-cartoon-image-design-vector.jpg"
                      : probs.dp
                  }
                  className={classes.buttonimg}
                  onClick={vwdrop}
                />
              </div>
            </li>
          </ul>
        </nav>
      </header>
      {drop &&
      <span className={classes.drop}>
        <ul className={classes.dropdown}>
          <span className={classes.dropl}  onClick={prof}>View profile</span>
          <span className={classes.dropl}>Edit Profile</span>
          <span className={classes.dropl}onClick={logout} >Logout</span>
        </ul>
      </span>
}
    </Fragment>
  );
}

export default MainNavigation;
