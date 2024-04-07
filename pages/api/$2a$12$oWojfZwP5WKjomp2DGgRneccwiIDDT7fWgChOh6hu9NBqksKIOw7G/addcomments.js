
import { MongoClient , ObjectId} from 'mongodb';


async function handler(req, res) {
    console.log(req.body);
  if (req.method === 'POST') {
    const data = req.body;
const postid=req.body.postid;

    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db();
const comments=db.collection("comments");

    const postCollection = db.collection('posts');

    const result = await comments.insertOne(data);
    const updateDocument = {
      $push: { "comments": {id:result.insertedId.toString(), 
            body:data.body}
    }
    };
    const finalres = await postCollection.updateOne({
      _id: ObjectId(postid)
    }, updateDocument);
 
    client.close();

    res.status(201).json({ message: 'commment added' });
  }
}

export default handler;