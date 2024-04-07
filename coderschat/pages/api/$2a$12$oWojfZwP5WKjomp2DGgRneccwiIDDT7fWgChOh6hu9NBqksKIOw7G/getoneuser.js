import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  let com = null;
  //console.log(req.body);
  if (req.method === "POST") {
    const qname = req.body._id;
console.log(req.body)
    const client = await MongoClient.connect(
      "mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
    );
    const db = client.db();
    const users = db.collection("user");
    const result = await  users.findOne({
        _id:ObjectId(qname), 
      });
      const senddata={
        _id:result._id.toString(),
        username:result.username,
        following:result.following,
        followers:result.followers,
        dp:result.dp,
        email:result.email,
        bio:result.bio
      }
      
      res.status(201).json({ message: "u got a user", data: senddata });
    //  console.log(senddata);
   
  }
 
  
  }


export default handler;
