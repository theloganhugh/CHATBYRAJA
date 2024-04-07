
import { MongoClient, ObjectId } from 'mongodb';

import cookie from "cookie";
async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie ||"");
    console.log(req.body);
    const id=req.body.id
  if (req.method === 'PUT') {
    const data= {
        $set: {
          username:req.body.username,
        caption:req.body.caption,
        image:req.body.image,
        public:req.body.public,
        relate:req.body.relate
       // comments:[],
     
        },
    }
    console.log(id);
console.log(data);
const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db();
    const filter = {_id:ObjectId(`${id}`)};
    const postCollection = db.collection('posts');
    const result = await postCollection.findOne(filter);
    const exploredb=db.collection('Explore');
    const user = db.collection('user');
    const userdata=await user.findOne({
      username: result.username,
    });
    if(userdata._id.toString()===cookies.token){
   
    const options = { upsert: true };
     for(let r of result.relate){
    const index=  req.body.relate.indexOf(r);
      if(index===-1){
        const filter = { relate: r };
        const res = await exploredb.updateOne(filter, {
          $pull: { post: result._id },
        });
      }
     }
    if(req.body.relate.length!==0){ 
    for(let r of req.body.relate){
      const index=  result.relate.indexOf(r);
      if(index===-1){
        const explore= await exploredb.find({relate:r}).toArray();
        if(explore.length===0){

          const newexplore=await exploredb.insertOne(
            {
              relate:r,
              post:[result._id]
            }
          )
      }
      else{
        const updateDocument = {
          $push: { "post": result._id}
        };
        const updateexplore=await exploredb.updateOne({
          relate:r, 
        }, updateDocument);
      }
    }
    }
  }
    const re = await postCollection.updateOne(filter, data, options);
    client.close();

    res.status(201).json({ message: 'post updated!' });
    }
    else{
      res.status(401).json({ message: 'failed!' });
    }
  }

 /*if(req.method==='GET'){
  const client = await MongoClient.connect(
    'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
  );
  const db = client.db();
  const postCollection = db.collection('posts');
 const allpost= await postCollection.find().toArray();

 for( let p of allpost){
  const newimg=[];
  for (let r of p.image) {
    let i = r.indexOf("/my-post/");
    i += "/my-post/".length;
    let j = r.indexOf(".jpg");
    let str = r.slice(i, j);
    str='my-post/' + str;
    const temoimg={
      url:r,
      id:str
    }
    newimg.push(temoimg)
  }
  const filter = {_id:p._id};
  const data= {
    $set: {
     image:newimg
 
    }
  }
  const result = await postCollection.updateOne(filter, data);
 }
  
  

  res.status(201).json({ message: 'post updated!',data:"po"});
  }
  */
  
}

export default handler;