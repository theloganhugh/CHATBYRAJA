import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  let com = null;
  // console.log(req.body);
  if (req.method === "POST") {
    const qname = req.body.q;

    const client = await MongoClient.connect(
      "mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
    );
    const db = client.db();
    const exploredb=db.collection('Explore');
    const postdb =db.collection('posts');
    const result= await exploredb.find({relate:qname}).toArray();
    
    if(result.length===0)
    {
        res.status(201).json({ message: "u got a user", data: [] });
    }
    else{
      let  relatepost=[];
      
      for(let p of result[0].post){
        
        const posres = await postdb.findOne({
          _id:ObjectId(p), 
        });
      if(posres.public===true){
       const postlist={
            caption: posres.caption,
              image: posres.image,
              id: posres._id.toString(),
              username:posres.username,
              comments:posres.comments,
              user:posres.username,
          }
       relatepost.push(postlist);
        }
        
      }
      relatepost=relatepost.reverse();
console.log(relatepost)
      res.status(201).json({ message: "u got a user", data: relatepost });
    }
  }
  
  }


export default handler;
