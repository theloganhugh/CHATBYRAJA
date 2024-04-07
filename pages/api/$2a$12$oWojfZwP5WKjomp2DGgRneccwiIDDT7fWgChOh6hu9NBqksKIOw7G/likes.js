
import { MongoClient , ObjectId} from 'mongodb';
import { isValidElement } from 'react';


async function handler(req, res) {
    let com =[];
   // console.log(req.body);
  if (req.method === 'POST') {
 
const postid=req.body.postid;

    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db();
console.log(req.body.like)
    const options = { upsert: true };
    const data= {
        $set: {
         likes:req.body.like
     
        },
    }
      let filter = {_id:ObjectId(postid)};
      const postCollection = db.collection('posts');
      const result = await postCollection.updateOne(filter, data, options);

    console.log(result);
    res.status(201).json({ message: 'commment added' });
  }
  if(req.method==='DELETE'){
    const postid=req.body.postid;

    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db();
    const options = { upsert: true };
    const data= {
        $set: {
         likes:req.body.like
     
        },
    }
      let filter = {_id:ObjectId(postid)};
      const postCollection = db.collection('posts');
      const result = await postCollection.updateOne(filter, data, options);

    console.log(result);

    res.status(201).json({ message: 'commment added' });
  }
  
}

export default handler;