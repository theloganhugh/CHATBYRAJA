import Card from "../Card";
import Link from "next/link";
import { Fragment } from "react";
import classes from "./userarray.module.css";
import { useRouter } from "next/router";

function Userarray(props) {
  const router = useRouter();
  function handler() {
    const param = '/profile/'+props.username;
    router.push(param);
    
  }
  return (
    <Fragment>
      <div className={classes.card} onClick={handler}>
        
          <div className={classes.main}>
          
              <img className={classes.left} src={props.img === ""
                  ? "https://freedesignfile.com/upload/2018/08/Robot-cartoon-image-design-vector.jpg"
                  : props.img}>
              </img>
            
            <span className={classes.right}>
              <div>{props.username}</div>
              <div>{props.bio}</div>
            </span>
          </div>
       
      </div>
    </Fragment>
  );
}
;

export default Userarray;
