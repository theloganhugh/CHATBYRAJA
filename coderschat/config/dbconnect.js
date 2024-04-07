import { MongoClient, ObjectId } from 'mongodb';


  const client = await MongoClient.connect(
    'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
  );
 
export default client;