import Card from "../Card";
import classes from "./acc.module.css";
import React, { useState, useEffect } from "react";
import { useRef } from "react";
import Spinner from "../../components/Spinner";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { Fragment } from "react";
import { hash } from "bcryptjs";

function Dp(props) {
  const router = useRouter();
  const [imageSrc, setImageSrc] = useState([props.image]);

  const [curimg, setcurimg] = useState(imageSrc);
  const [btn, setbtn] = useState(false);
  const [filedata, setfiledata] = useState([]);
  const captionInputRef = useRef();
  const [urlarr, seturlarr] = useState(props.image);
  const [spinner, setspinner] = useState(false);
  const [curlen, setcurlen] = useState(props.image.length);
  const [delid, setdelid] = useState([]);
  const relateref = useRef();

  const userInputRef = useRef();
  const passInputRef = useRef();
  const pass2InputRef = useRef();
  const emailInputRef = useRef();
 
  function OnChangehandler(changeEvent) {
    const reader = new FileReader();
    //    for( let f of changeEvent.target.files){

    reader.onload = function (onLoadEvent) {
      //  console.log(onLoadEvent)
      setImageSrc(onLoadEvent.target.result);
      setcurimg(onLoadEvent.target.result);
      console.log(imageSrc.length);
      setfiledata(changeEvent.target.files[0]);
    };

    if (changeEvent.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    // }
  }
  async function submitHandler(event) {
    event.preventDefault();
    let imggg="";
    const formdata = new FormData();
   
    formdata.append("file", filedata);
    formdata.append("upload_preset", "my-post");
    try{
    const imagedata = await fetch(
      "https://api.cloudinary.com/v1_1/coderschat/image/upload",
      {
        method: "POST",
        body: formdata,
      }
    ).then((response) => response.json());
    const imgin={
      url:imagedata.url,
      id:imagedata.public_id
    }
    imggg=imgin.url;
}catch(e){
    flash.set({ info: '500 | Server Error Try again' })
    return
  }
  

    const userData = {
     dp:imggg
    };

    setspinner(true);

    const response = await fetch(
      "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/updatedp",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
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
          <p className={classes.center}>
            {imageSrc.length > 0 ? (
              <label for="image" className={classes.customfileupload}>
                {" "}
                <img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/20/000000/external-upload-ui-essential-kmg-design-flat-kmg-design.png" />{" "}
                <span>change image</span>
              </label>
            ) : (
              <label for="image" className={classes.customfileupload}>
                {" "}
                <img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/20/000000/external-upload-ui-essential-kmg-design-flat-kmg-design.png" />{" "}
                <span>change image</span>
              </label>
            )}
            <input
              type="file"
              name="file"
              id="image"
              style={{
                display: "none",
              }}
              onChange={OnChangehandler}
            />
          </p>
          <div className={classes.slideshowcontainer}>
            <div className={classes.fade}>
              <img src={curimg} className={classes.image} />
            </div>
          </div>
        </div>
        <div className={classes.actions}>
            <button >
              <img src="https://img.icons8.com/fluency/48/000000/edit-image.png"/>
            </button>
          </div>
      </form>
    </Fragment>
  );
}

export default Dp;
