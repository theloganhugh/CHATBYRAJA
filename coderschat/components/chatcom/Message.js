import classes from "./message.module.css";
import { format, render, cancel, register } from 'timeago.js';
import { useState } from "react";
import { useEffect } from "react";
export default function Message({ message, own, dp }) {
  const [mdp, setmdp] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        let com=null;
        const response = await fetch(
          "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/getoneuser",
          {
            method: "post",
            body: JSON.stringify({_id:message.sender}),
            type:'all',
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
          .then((response) => response.text())
          .then((data) => (com = JSON.parse(data).data));
          console.log(com);
        setmdp(com.dp);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();

  }, []);
  return (
    <>
      <div className={classes.main}>
        <div className={own ? classes.messagown : classes.message}>
          <div className={classes.msgTop}>
            <img
              className={classes.messageImg}
              src={
                mdp === ""
                  ? "https://freedesignfile.com/upload/2018/08/Robot-cartoon-image-design-vector.jpg"
                  : mdp
              }
              alt=""
            />
            {message.text.includes(
              "https://res.cloudinary.com/coderschat/image/upload"
            ) ? (
              <img className={own ? classes.ownmessageText : classes.messageText} src={message.text}>
               
              </img>
            ) : (
              <p className={own ? classes.ownmessageText : classes.messageText}>
                {message.text}
              </p>
            )}
          </div>
          <div className={classes.msgBottom}>{format(message.time)}</div>
        </div>
      </div>
    </>
  );
}
