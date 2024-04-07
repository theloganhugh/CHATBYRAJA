import React from 'react';
import { MongoClient , ObjectId } from "mongodb";
import Userprofile from '../components/usercomponents/Userprofile';

function Func(props){
  return (<Userprofile userDetails={props.userDetails}/>)
}

export default Func;

export async function getServerSideProps({req,res}){
  let flag=true;
  if(!req.cookies.token){
     flag=false;
  }
  const client = await MongoClient.connect(
     "mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
  );
  const db = client.db();
  let nodataflag=false;
  if(flag===true){  
  const users=db.collection("user");
  const result = await users.findOne({
  _id:ObjectId(req.cookies.token), 
  });
  // client.close();   

  return {
     props: {
        userDetails: {
           username: result.username,
           bio: result.bio,
           following: result.following,
           followers: result.followers,
           dp: result.dp,
           email: result.email,
        },
     }
  };
}
}