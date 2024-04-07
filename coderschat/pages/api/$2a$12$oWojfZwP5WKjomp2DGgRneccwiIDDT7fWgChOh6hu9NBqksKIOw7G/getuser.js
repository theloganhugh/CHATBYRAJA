import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  let com = [];
  // console.log(req.body);
  if (req.method === "POST") {
    const qname = req.body.qname;

    const client = await MongoClient.connect(
      "mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
    );
    const db = client.db();
    const users = db.collection("user");
    const result = await users.find({ }, { username:true, _id:false}).toArray();
     // console.log("po");

   for(let r of result){
  
    if(r.username.includes(qname)){
     const l ={
       username:r.username,
       bio:r.bio,
       id:r._id.toString(),
       dp:r.dp
     }
     com.push(l);
     
}

  }
 // console.log(com);
    res.status(201).json({ message: "commment added", data: com });
  }
  /*
  if(req.method==='GET'){
    const client = await MongoClient.connect(
      "mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
    );
    const db = client.db();
    const users = db.collection("user");
    const str='User'
    const data= {
      $set: {
       name:str
   
      }
    }
    const filter = {};
    const result = await users.update(filter, data);
    res.status(201).json({ message: "commment added", data: result});
  }
  */
}

export default handler;
