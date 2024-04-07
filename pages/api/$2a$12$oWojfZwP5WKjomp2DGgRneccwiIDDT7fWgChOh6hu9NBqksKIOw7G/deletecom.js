
import { MongoClient, ObjectId } from 'mongodb';
import cookie from "cookie";

async function handler(req, res) {
  
    const reqdata=req.body ;
    
  if (req.method === 'DELETE') {
   
    console.log(reqdata);
    const cookies = cookie.parse(req.headers.cookie ||"");
const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db();
const coms = db.collection('comments');

    const postCollection = db.collection('posts');
    const filter = {_id:ObjectId(`${reqdata.postid}`)};
    
    const resultpost = await postCollection.findOne(filter);
    const userfilter = {_id:ObjectId(`${cookies.token}`)};
    const user = db.collection('user');
    const userdata=await user.findOne(userfilter);
   // console.log(userdata);
    console.log(userdata._id.toString()===cookies.token);
    if(userdata._id.toString()===cookies.token){ 
      //console.log(userdata._id.toString()===cookies.token);
let comlist = resultpost.comments;

let newcomlist=[];
    console.log()
for( let i in comlist){ 
    console.log(comlist[i].id !== reqdata.comid)
    if ( comlist[i].id !== reqdata.comid ) { 
    
        newcomlist.push(comlist[i]);
    }

}

console.log(newcomlist)

const options = { upsert: true };
const newpostdata= {
  $set: {
 comments:newcomlist
  },
}
const comfilter = {_id:ObjectId(`${reqdata.comid}`)};
    
const userresult = await postCollection.updateOne(filter, newpostdata, options);
const detelepost = await coms.deleteOne(comfilter);
console.log(userresult);
console.log(detelepost);
    client.close();

    res.status(201).json({ message: 'deleted' });
}
else{
  res.status(401).json({ message: 'failed!' });
}
  }
}

export default handler;