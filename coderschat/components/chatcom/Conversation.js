import { PromiseProvider } from "mongoose";
import { useEffect, useState } from "react";
import classes from "./conversation.module.css";

export default function Conversation({ conversation, currentUser }) {
  
 // console.log(conversation)
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    //const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        let com=null;
        const response = await fetch(
          "/api/$2a$12$oWojfZwP5WKjomp2DGgRneccwiIDDT7fWgChOh6hu9NBqksKIOw7G/geton",
          {
            method: "post",
            body: JSON.stringify({_id:currentUser.username}),
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
        setUser(com);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();

  }, [currentUser, conversation]);

  return (
    <div className={classes.conversation}>
      <img
        className={classes.conversationImg}
        src={
          user===null? "https://freedesignfile.com/upload/2018/08/Robot-cartoon-image-design-vector.jpg":
            user.dp  === ""
             ? "https://freedesignfile.com/upload/2018/08/Robot-cartoon-image-design-vector.jpg"
             :user.dp
              
           

          
        }
       
        alt="dp "
      />
      <span className={classes.conversationName}>{currentUser?.username}</span>
    </div>
    
  );
}
