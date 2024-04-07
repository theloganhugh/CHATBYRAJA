import { Fragment } from "react";
import classes from "../styles/err.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { getMiddlewareManifest } from "next/dist/client/route-loader";
import { useEffect } from "react";
import { useState } from "react";
export default function Home(props) {
 /* get random meme 
  
  useEffect(async () => {
     async function getmeme(){
    let mem="";
  const response = await fetch(
    "https://meme-api.herokuapp.com/gimme/1",
    {
      method: "get",
      
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((response) => response.text())
    .then((data) => (mem = JSON.parse(data)));
    console.log(mem.memes[0].url)
  return mem.memes[0].url;
}
const k=await getmeme();
console.log(k)
setmeme(k);
}, []);*/
const [meme , setmeme] =useState("");
  useEffect(()=>{
  let k = Math.floor(Math.random() * 65) +1;

  if(k===20)
  {
    k=k+'.gif'
  }
  else if(k>=1&&k<=26){
    k=k+'.png'
  }
  else if(k===39){
    k=k+'.jpeg'
  }
  else{
    k=k+'.jpg'
  }
  setmeme(`${k}`);
  console.log(k)
  }, [])
const router =useRouter();
  return (
    <Fragment>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Road+Rage&display=swap');
        </style>
        <style>
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@1,300&display=swap');
</style>
      </Head>
      <div className={classes.main}>
        <div className={classes.left}>
          <div className={classes.spamain}> <span>404|</span> <span className={classes.spa}>we can't find the page...</span></div>
         
         <div > 
          <button className={classes.btn} onClick={() => router.back()}> Back</ button>
          <button className={classes.btn} onClick={() => router.push('/')}> Home</ button>
          <button className={classes.btn} onClick={() => router.push('/allpost')}> Explore</ button>
          <button className={classes.btn} onClick={() => router.push('/chat')}> Chat</ button>
          </div>
        </div>

        <div className={classes.right}>
          <img className={classes.img} src={meme}></img>
        <div className={classes.meme}>...but we found a meme for you</div>
        </div>
      </div>
    </Fragment>
  );
}

  
  