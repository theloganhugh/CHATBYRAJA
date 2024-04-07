import Signup from "../../components/usercomponents/Signup";
import styles from "../../styles/Main.module.css";
import { MongoClient } from "mongodb";
import Login from  "../../components/usercomponents/Login";
import { useState } from "react";
import Head from "next/head";
import { Fragment } from "react";
function SignUp (props) {
  const [toggle, settoggle]=useState(true);
 

  function login(params) {
    settoggle(true);
    
  }
  function signup(params) {
    settoggle(false);
  }
  return (
<Fragment>
      <Head>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Fuzzy+Bubbles&display=swap');
</style>
      </Head>
    
    <div className={styles.main}>
         <div className={styles.leftside}>
        
          <img src="https://res.cloudinary.com/coderschat/image/upload/v1640415523/my-post/dmwwrdy5lhdez307oetq.png"></img>
          <div >
         <div className={styles.logo}>CodersChat</div>
         <div className={styles.tagline}> Talk your Geeky way</div>
         </div>
         </div>
         
    <div className={styles.right}>
    <div  className={styles.title}><button 
     onClick={signup}
      className={ toggle ? styles.btn : styles.line }>Sign Up</button>
      <button onClick={login}
       className={ toggle ? styles.linelogin: styles.btn }>Login in</button></div>
    {toggle ? <Login userlist={props.userlist} ></Login> : <Signup userlist={props.userlist} ></Signup>}
     
     </div>
     </div>
     </Fragment>
  );
}

export default SignUp;
export async function getServerSideProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
  );
  const db = client.db();

  const userCollection = db.collection("user");

  let userlist = await userCollection.find().toArray();
  
  client.close();

  return {
    props: {
      userlist: userlist.map((user) => ({
        username: user.username,
        email:user.email,
    
      })),
    }
    
  };
}