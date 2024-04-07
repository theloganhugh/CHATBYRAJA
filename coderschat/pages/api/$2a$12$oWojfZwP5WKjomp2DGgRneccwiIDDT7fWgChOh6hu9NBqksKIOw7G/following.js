import { MongoClient , ObjectId} from 'mongodb';
import { isValidElement } from 'react';


async function handler(req, res) {
   let com =[];
   // console.log(req.body);
   if (req.method === 'POST') {
 
   const userid=req.body._id;

    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db();
   console.log(req.body.following)
    const options = { upsert: true };
    const data= {
      $push: { "following": userid.toString()
      }
    }
      let filter = {_id:ObjectId(userid)};
      const userCollection = db.collection('user');
      const result = await userCollection.updateOne(filter, data, options);

    console.log(result);
    res.status(201).json({ message: 'following user' });
  }
  if(req.method==='follow'){
    const postid=req.body.userid;

    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db();
    const options = { upsert: true };
    const data= {
        $set: {
         following:req.body.following     
        },
    }
      let filter = {_id:ObjectId(userid)};
      const userCollection = db.collection('user');
      const result = await userCollection.updateOne(filter, data, options);

    console.log(result);

    res.status(201).json({ message: 'followers added' });
  }
  
}

export default handler;