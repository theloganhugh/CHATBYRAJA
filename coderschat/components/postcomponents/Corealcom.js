import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";
import Card from "../Card";
import classes from "./corcom.module.css";
import Head from "next/head";
import { useState } from "react";
import Updatepostcom from "./updatepostcom";
import { Fragment } from "react";
import { useRef } from "react";
import Comments from "./Comments";
import Viewpost from "./vewpost";
import { useHistory } from "react-router";

function Post() {

  const props = {
    
    username: "Raja",
    caption:
      "Its natural to want to share your happiness with others. Whether youre taking a selfie or capturing a gorgeous sunset in your post, a good quote that captures the joy and happiness youre feeling can be contagious to your followers.",
    image: [
      "https://i.pinimg.com/originals/5a/20/de/5a20de6af9c328102e05b4e0edb312a8.jpg",
      "https://res.cloudinary.com/cloudinary/image/upload/c_fill,w_770/dpr_3.0,f_auto,fl_lossy,q_auto/more_macaroons.jpg",
      "https://res.cloudinary.com/cloudinary/image/upload/CloudinaryDemoApp1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
      "https://cloudinary-res.cloudinary.com/image/upload/mod-addon-1.png",
    ],
  };
  const [pos, setpos]=useState(0);
  const [curimg, setcurimg]=useState(props.image[pos])
  function goleft(){

      if(pos>0){
        setcurimg(props.image[pos-1])
         setpos(pos-1)
      }
       if(pos===0){
        setcurimg(props.image[props.image.length-1])
        setpos(props.image.length-1)
      }
      
     
      console.log(pos)
  }
  function goright(){
      
    if(pos<props.image.length-1){
        setcurimg(props.image[pos+1])
        setpos(pos+1);
    }
    else if(pos===props.image.length-1){
        setcurimg(props.image[0])
      setpos(0)
    }

    console.log(pos)
}
  return (
    <Fragment>
      <Card>
        <div >
          <div className={classes.userblock}>
            <button className={classes.button}>
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
            }}
          />

          <div className={classes.slideshowcontainer}>
            <div className={classes.fade}>
              <img src={curimg} className={classes.image} />
            </div>
            {imageSrc.length > 1 && (
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

          <div className={classes.content}>
            <span className={classes.user}>{props.username}</span>{" "}
            {props.caption}
            <div className={classes.like}>
              {" "}
              <img src="https://img.icons8.com/color/35/000000/like--v3.png" />{" "}
              <span
                style={{
                  marginLeft: "5px",
                }}
              >
                {200}
              </span>
            </div>
            <div className={classes.allcom}>view all comments</div>
          </div>
          <form className={classes.sform}>
            <div className={classes.control}>
              <input
                className={classes.incom}
                type="text"
                placeholder="Add comments"
                // ref={bodyInputRef}
                required
                id="comments"
                //  onChange={checkcom}
                //user={props.user}
              />
              <button
                className={classes.combtn}
                //  onClick={addcomhandler}
                disabled={true}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </Card>
    </Fragment>
  );
}

export default Post;
