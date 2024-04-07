
import { MongoClient } from 'mongodb';



async function handler(req, res) {
    console.log(req.body);
  if (req.method === 'POST') {
    const data = req.body;
    data.name='User';
    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db();
    
    const postCollection = db.collection('user');

    const result = await postCollection.insertOne(data);

  //  console.log(result);

    client.close();

    res.status(201).json({ message: 'post inserted!' });
  }
}

export default handler;