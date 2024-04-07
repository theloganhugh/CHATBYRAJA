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


   
      let filter = {_id:ObjectId(userid)};
      const postCollection = db.collection('user');
      const result = await postCollection.findOne(filter);
      com=result.followers;
//console.log(com);
    res.status(201).json({ message: 'Fetching following', data:com});
    
  }
}

export default handler;