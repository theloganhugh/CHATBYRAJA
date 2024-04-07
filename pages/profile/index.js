// import React from 'react';
// import profilebio from '../profilebio';
// import profileposts from '../profileposts';

// function profile() {
//    return (
//       <div>
//          <profilebio></profilebio>
//          <profileposts></profileposts>
//       </div>
//    )
// }

// export default profile

import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { Fragment } from "react";
import Post from "../../components/postcomponents/Postforprofile";
import MainNavigation from "../../components/MainNavigation";
import { MongoClient, ObjectId } from "mongodb";
import Layout from "../../components/Layout";
import Newpostcom from "../../components/postcomponents/Newpostcom";
import { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";
import Userprofile from "../../components/usercomponents/UserProfile";

// import React from 'react';
// import { MongoClient , ObjectId } from "mongodb";
// import Userprofile from '../../components/usercomponents/Userprofile';

//code
// function Func(props){
//   return (<Userprofile userDetails={props.userDetails}/>)
// }

// export default Func;

// export async function getServerSideProps({req,res}){
//   let flag=true;
//   if(!req.cookies.token){
//      flag=false;
//   }
//   const client = await MongoClient.connect(
//      "mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
//   );
//   const db = client.db();
//   let nodataflag=false;
//   if(flag===true){
//   const users=db.collection("user");
//   const result = await users.findOne({
//   _id:ObjectId(req.cookies.token),
//   });
//   // client.close();

//   return {
//      props: {
//         userDetails: {
//            username: result.username,
//            bio: result.bio,
//            following: result.following,
//            followers: result.followers,
//            dp: result.dp,
//            email: result.email,
//         },
//      }
//   };
// }
// }

//code2
export default function Home(props) {
  ////console.log(props.user)
  const router = useRouter();

  const [newpost, setnewpost] = useState(false);
  const [spinner, setspinner] = useState(false);
  function viewposthandler() {
    const param = "add-post";
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
    setnewpost(!newpost);
  }
  async function addpostHandler(enteredpostData) {
    setnewpost(!newpost);
    setspinner(true);
    const response = await fetch("/api/newpost", {
      method: "POST",
      body: JSON.stringify(enteredpostData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    //////console.log(data);

    router.push("/");
    setspinner(false);
  }
  function closemodel() {
    router.push("/");
    setnewpost(false);
  }
  return (
    <Fragment>
      <Head>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Coda:wght@800&display=swap');
        </style>
      </Head>
      <MainNavigation
        viewpost={viewposthandler}
        username={props.user.username}
        dp={props.user.dp}
      />
      <Layout>
        {newpost && !spinner && (
          <div className={styles.modelback}>
            <div className={styles.overlay}>
              <div className={styles.close}>
                {" "}
                <button className={styles.button} onClick={closemodel}>
                  {" "}
                  <img src="data:image/png;base64,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" />{" "}
                </button>
              </div>
              <Newpostcom
                onaddpost={addpostHandler}
                close={closemodel}
                user={props.postlist[0].user}
              />
            </div>
          </div>
        )}
        {spinner && (
          <div className={styles.modelback}>
            <Spinner />
          </div>
        )}

        <Userprofile userDetails={props.user} disfollow={false} />
        <div className={styles.main2}>
          {props.nodata && (
            <div className={styles.nodata}>
              <img src="https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png" />
            </div>
          )}
          {!props.nodata && (
            <div className={styles.container2}>
              {props.postlist.map((post) => (
                // eslint-disable-next-line react/jsx-key
                <Fragment>
                  <Post
                    key={post.id}
                    id={post.id}
                    image={post.postimg}
                    username={post.username}
                    caption={post.caption}
                    com={post.comments}
                    relate={post.relate}
                    public={post.public}
                    user={post.user}
                  />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </Fragment>
  );
}

export async function getServerSideProps({ req, res }) {
  let flag = true;
  if (!req.cookies.token) {
    flag = false;
  }
  const client = await MongoClient.connect(
    "mongodb+srv://vathsa:Osep23260@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
  );
  const db = client.db();
  let nodataflag = false;
  let postlist = [];
  if (flag === true) {
    const users = db.collection("user");
    const result = await users.findOne({
      _id: ObjectId(req.cookies.token),
    });

    const postids = result.post;
    const userdata = {
      username: result.username,
      bio: result.bio,
      following: result.following,
      followers: result.followers,
      dp: result.dp,
      email: result.email,
      id: result._id.toString(),
      name:result.name
    };

    if (postids.length === 0) {
      postlist = [
        {
          user: userdata,
          username: result.username,
          caption: "",
          image:
            "https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png",
        },
      ];
      nodataflag = true;
    }
    if (!nodataflag) {
      const posts = db.collection("posts");
      for (let id of postids) {
        id = id.toString();
        const posres = await posts.findOne({
          _id: ObjectId(id),
        });

        postlist.push(posres);
      }
      postlist = postlist.reverse();
    }

    client.close();
    if (nodataflag === true || postlist.length === 0) {
      return {
        props: {
          postlist: postlist,
          user: userdata,
          nodata: true,
        },
      };
    }

    return {
      props: {
        postlist: postlist.map((post) => ({
          caption: post.caption,
          image: post.image[0].url,
          id: post._id.toString(),
          username: post.username,
          postimg: post.image,
          relate: post.relate,
          public: post.public,
          comments: post.comments,
          user: userdata,
        })),
        user: userdata,
        nodata: false,
      },
    };
  }
  client.close();
  if (flag === false) {
    return {
      redirect: {
        permanent: false,
        destination: "/sign-up",
      },
      props: {},
    };
  }
}
