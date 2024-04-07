
import { MongoClient } from 'mongodb';


async function handler(req, res) {
    console.log(req.body);
  if (req.method === 'POST') {
    let data = req.body.data;
    const relate=req.body.relate;
    data.relate=relate;
    
   const username=data.username;

    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db();
const users=db.collection("user");

    const postCollection = db.collection('posts');
    const exploredb=db.collection('Explore');
    const result = await postCollection.insertOne(data);
    if(relate.length!==0){
    for(let r of relate){
    const explore= await exploredb.find({relate:r}).toArray();
    if(explore.length===0){
      const newexplore=await exploredb.insertOne(
        {
          relate:r,
          post:[result.insertedId]
        }
      )
    }
    else{
      const updateDocument = {
        $push: { "post": result.insertedId}
      };
      const updateexplore=await exploredb.updateOne({
        relate:r, 
      }, updateDocument);
    }
    }
  }
    const updateDocument = {
      $push: { "post": result.insertedId}
    };
    const userresult = await users.updateOne({
      username:username, 
    }, updateDocument);
    //console.log(result);
console.log(userresult);

    client.close();

    res.status(201).json({ message: 'post inserted!' });
  }
}

export default handler;