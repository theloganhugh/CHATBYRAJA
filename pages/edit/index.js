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
import clasess from "./style.module.css";
import Acc from "../../components/editcom/Acc";
import Per from "../../components/editcom/Per";
import Dp from "../../components/editcom/Dp";

export default function Home(props) {
  const [spinner, setspinner] = useState(false);
  const router = useRouter();
  const [state, setstate] = useState("i");
  const [newpost, setnewpost] = useState(false);
  function ci (){
setstate("i");
  }
  function cp (){
setstate("p");
  }
  function cd() {
setstate("d");
  }

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
  return (
    <Fragment>
      <MainNavigation
        viewpost={viewposthandler}
        username={props.user.username}
        dp={props.user.dp}
      />
      <Layout>
        <div className={clasess.main}>
          <div className={clasess.left}>
            <div className={clasess.menu}>
              <div className={state === "i" ? clasess.itemsel : clasess.items}
              onClick={ci}
              >
                Account information
              </div>
              <div className={state === "p" ? clasess.itemsel : clasess.items}
                  onClick={cp}>
                Personal information
              </div>
              <div className={state === "d" ? clasess.itemsel : clasess.items}
                  onClick={cd}>
                Profile picture
              </div>
            </div>
          </div>
          <div className={clasess.right}>
            <div className={clasess.itch}>
              {state === "i" && <Acc userlist={props.userlist}></Acc>}
              {state === "p" && (
                 <Per></Per>
              )}
              {state === "d" && (
                <Dp image={
                  props.user.dp === ""
                    ? "https://freedesignfile.com/upload/2018/08/Robot-cartoon-image-design-vector.jpg"
                    : props.user.dp
                }></Dp>
              )}
            </div>
          </div>
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
    let userlist = await users.find().toArray();

    const result = await users.findOne({
      _id: ObjectId(req.cookies.token),
    });

    const postids = result.post;
    const userdata = {
      username: result.username,
      bio: result.bio,
      following: result.following,
      followers: result.followers,
      //  post:result.post,
      dp: result.dp,
      email: result.email,
      id: result._id.toString(),
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
          userlist: userlist.map((user) => ({
            username: user.username,
            email: user.email,
          })),
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
        userlist: userlist.map((user) => ({
          username: user.username,
          email: user.email,
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
