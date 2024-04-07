
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import { Fragment } from "react";
import Post from "../../components/postcomponents/Post";
import MainNavigation from "../../components/MainNavigation";
import { MongoClient , ObjectId} from "mongodb";
import Layout from "../../components/Layout";
import Newpostcom from "../../components/postcomponents/Newpostcom";
import { useState , useRef} from "react";
import { useRouter } from "next/router";
import Spinner from "../../components/Spinner";
import classes from "./style.module.css"
export default function Home(props) {
  
////console.log(props.user)
  const router = useRouter();
 const inputref=useRef();
  const [newpost, setnewpost] = useState( false );
  const [spinner, setspinner] = useState( false );
  function viewposthandler() {
   
    const param = 'add-post';
    router.push(
        {
          pathname: `/`,
          query: {
            param
          }
        },
        `/?param=${param}`,
        {shallow: true}
    );
    setnewpost( !newpost);
  }
  async function addpostHandler(enteredpostData, relate) {
    relate=relate.toLowerCase().trim();
    setnewpost( !newpost);
    const relatearr=[];
     setspinner(true);
     if(relate.length!==0){
      let temp="";
     for(let c of relate){
        if(c!==" "){
          temp=temp+c;
        }
        else{
          temp=temp.trim();
          relatearr.push(temp);
          temp="";
        }
     }
     console.log(relatearr)
    }
    const reqdata={
      data:enteredpostData,
      relate:relatearr
    }
    const response = await fetch("/api/newpost", {
      method: "POST",
      body: JSON.stringify(reqdata),
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
 function searchhandler (event){
  event.preventDefault();
  router.push(`/allpost?${inputref.current.value}`)
  inputref.current.value=""
  console.log(`/allpost/${inputref.current.value}`)
 }
  function closemodel (){
    router.push("/");
    setnewpost(false);
  }
  return (
    <Fragment>
    <Head>
      <style>
      
@import url('https://fonts.googleapis.com/css2?family=Coda:wght@800&display=swap');
</style>
    </Head>
   
    <MainNavigation viewpost={viewposthandler} dp={props.user.dp} username={props.user.username}/>
    <div> po</div>
    <div className={classes.nav}><form className={classes.sform} onSubmit={searchhandler}>
            <div className={classes.control}>
              <input
                className={classes.incom}
                type="text"
                placeholder="Search"
                ref={inputref}
                required
                id="search"
                onSubmit={searchhandler}
                //onChange={checkcom}
                //user={props.user}
              />
              <button
                className={classes.combtn}
                
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
          <button className={classes.btn}>Recent</button>
          <button className={classes.btn}>Movies</button>
          <button className={classes.btn}>Music</button>
          <button className={classes.btn}>Sports</button>
          <button className={classes.btn}>Gaming</button>
          <button className={classes.btn}>News</button>
          <button className={classes.btn}>Learning</button>
          <button className={classes.btn}>Fashion</button >
       
          </div>
    <Layout >
      {newpost&& !spinner && (
        <div className={styles.modelback}>
          <div className={styles.overlay}>
            <div className={styles.close} > <button className={styles.button} onClick={closemodel}> <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAADhu0ooAAAABmJLR0QA/wD/AP+gvaeTAAAG3ElEQVRoge2aeWxURRzHP/O220KpiFhKWwoCAm0tQSIFlaQIRTm6vVAoBC9QI2AkKngS4gHGAzUKGsSooIJBiwq024JBFNEQ5QhELN3lMITDoKJy9IDuMf4xu+zbdne73YNi6TfZzHsz8/v+ft+dNzO/fbNwsVBw1wMMHn6IHr3r6dGnnhtyDlA4/d6L5v+iYGTBFoQmAe+PEJK8qZbWDS5SmDZnC40FNha7cutHrRhhBGDeZyIp1bfAlF4S01TJk29IzBZJhWVcNEMRUWM278/kqHU7swoSvOpj42DGfBhzBwhNH0ktyJsxZe6NRjha811CQLk1EZzl1NR4ixQCnlkMYyd5iwSQdEKKMr4+mBSNkCIvtLQqFk1+AVxL127VXm05eTB0pC8rJ5JdQG9s9rVUHoiLdFiRFSqloKPhAyS3AMdJ6nkbfdLPXGjPLfRn+T2aIx84AgzH6fgEKSM6rSIrtMI6H8HdQA1SmChIP07GkIcwxqrHtk+GL6t6HDyKKesEmmE8cBooocI6L5KhRe5bq6i+AylKXXcTyM8ou9BWPG02fa97kdzCzo2sTuCUUyjM/P5CTaV1PE5ZDmgIeSemzNWRCC8yQs3VQ0BsBeIRYg6m9Deb9Ck92pGOdZMQDAIpkWIv9fFrKOlZ36RvuXUOQr4B1CO0UZgG/BxuiOELXW9JxcB2oAewnPyM+8PmBDBblgKzgBPYY4ZR3O9oOHThzdHSqgQMVAI9QG6lzjErLD49kmseATYDycTYyyitSmjOJBBCF/q81Ig3rAKuR2IFWzElWQ3hBOOF7GwbmuF2EFXAYOINn1MqDaHShS402/oqUAT8gyYLyR/0b8hc/pDX/wyIQuAvII9O1pdCpQptjpZbpiNYDtjQGEdexrehBhAUzNYckJuAOISciSnzvZZStHxEzdYcBMsAEHJ21EUC5Kf/gJAzAZDibSotuS2laJlQ8/6+IL8CYhEsCuWbDRmmzI+A1wEjTtZQUT2gJebBC91Y1RWcG4BEoJLa9IhmLkFhZ/pTwHqgK05RhvmXq4I1DU7ozp1G7IZSYACwhzrHZEqEI6Rgw8HzwomsmYpgB4J0MK6jtCo2GNPghP6RsAQYjdq8CynJqgkj3PBQkF2HnWLgGIgRxBveDcaseaHm6rlIZqLSseJwM5SIoCjjd6SzCKgF7qPC+lhzJp7tpXzfQoShAIjVtSYgZU8AJL8jxOlIxxwWBFcgZZrr7hiIsxfapGxAk5XkZcxHCKfgu+86UJd6QGfQtiD5E4Ohl0ZN8vo2KxJAkIR0rhVUWGxIYlo7nijDrl0GIgFiovMW8BJEu9C2hnahbQ3tQtsamt9DT/0NVbvg7ClPXf+BcO116vrQPlW67/3h7Cmo3g0OOwwcCld08d3v8H74rRoaznvqUq+BQTd6/B341bdtWh/F7QMCs0X6Dc78Kax4Dc6f865P6AyfbVfXk4aocs0uvzSsWwGfLIYGF0+MEaY/DkW6k/2Gc/D6E7Btk48oBaz8EbpcrfzV1/r2IzRY/ZOKrxH8j+hPm2HZQuVk8HBI1qXD/Qd6rv05dWNLOXzwqgpiSA44nbBnG7z/MlzZFUYWqH6fvq1Edr4Kskeoc1Q3ElNUX72/cSVNfXVP8ykysNBVS1T50HMwfkpgMYGwdoUqZy+AMRPVdeVqWPoCfPmhR+gPG1T54nLom9k878MLWhSG/8Xo2CFV5ha3iLAJjhxU5SjdkeHoCao8etBTd851BNMlMTx/fuB/RO12VcZ1CM+DzfXy3qh7tePmdPsAuP4mNaovzYbcIjWP0/qqaWL08Vpoo+vgLsYIN432+8i6cen8crn/Kdj/C1j2qI8bvfrBvCVKtB7vPOu5Lp4GDzwdkP7SEZqYDO+UweZ16nG329R2dOQgLJoLi7/0/t+DezESGtw6oVl6/0KFBtIJDgcYQj7b8c3jcHja9OjYCfLv9Nw3nIcZ49S+evyw96hGbDHqlqzKX3e0iDAonr2uc92klMC2sXHQyTX3zoR3huV/RHOL4bOl8MqjUHSP92qoz4zccC8Ojfs05gFY/7EqR+seOV8Zj2U3HLaqRKFfVmB/EGJmZLepTOXHjU3b9JlRYRY4fby0d/fxxzNslFpkYozqfvIwqD3TlCe2Azz9FgwbGdgfBMyMAqeAADu2wO5tnvQN1GiNdS0GGz6HQ1VN7fR99DwAg29W/zcSulNLXzzdUmFEHqT0CtzPje5pMOlBn03NC20juGx+prULbWtoF9rWcFkJvRy2l5Magt9aO4qoQ1CugWMiAltrxxJFHAbHPJWDbdyXgt2wDiEHIQUIWYeUp0H8nx/rsyC+QfIKBekn/wPzXDMv1wEN6gAAAABJRU5ErkJggg==' /> </button></div>
            <Newpostcom onaddpost={addpostHandler} close={closemodel} user={props.user} />
          </div>
        </div>
      )}
      {spinner && (
        <div className={styles.modelback}>
         
            <Spinner  />
         
        </div>
      )}
    
     
        <div className={styles.main}>
          {props.nodata &&
          <div className={styles.nodata}>
          <img
              
              src='https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png'
            />
            </div>
            }

         {!props.nodata &&<div className={styles.container}>
            { props.postlist.map((post) => (
              <Fragment>
              <Post
                key={post.id}
                id={post.id}
                image={post.image}
                username={post.username}
                caption={post.caption}
                com={post.comments}
                user={post.user}
              />
              
              </Fragment>
            ))}
          </div>}
        </div>
    
    </Layout>
    </Fragment>
  );
}


export async function getServerSideProps({ req, res }) {
 // console.log(req.param.q)
let flag=true;
  if(!req.cookies.token){
    
flag=false;
}
  const client = await MongoClient.connect(
    "mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
  );
  const db = client.db();
  let nodataflag=false;
  let postlist=[];
if(flag===true){  
const users=db.collection("user");
const result = await users.findOne({
  _id:ObjectId(req.cookies.token), 
});
const post =db.collection('posts');
const resultpost = await post.find({public:true}).toArray();

//console.log(resultpost);
if(resultpost.length===0)
{
  postlist={
    username:result.username,
    caption:"",
    image:'https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png'
  }
  nodataflag=true;
}
if(!nodataflag){

postlist=resultpost.reverse();

}
const userdata={
  username:result.username,
  dp:result.dp,
  following:result.following
}
client.close();
if(nodataflag===true ||postlist.length===0){
  return {
    props: {
      postlist: postlist,
     user:userdata,
     nodata:true,
    },
   
  };
}



  return {
    props: {
     postlist: postlist.map((post) => ({
        caption: post.caption,
          image: post.image,
          id: post._id.toString(),
          username:post.username,
          comments:post.comments,
          user:userdata,
      })), 
      user:userdata,
     nodata:false,
    }
    
  };
}
client.close(); 
if(flag===false){
   return {
    redirect: {
      permanent: false,
      destination: "/sign-up",
    },
    props:{},
  };
}


}

