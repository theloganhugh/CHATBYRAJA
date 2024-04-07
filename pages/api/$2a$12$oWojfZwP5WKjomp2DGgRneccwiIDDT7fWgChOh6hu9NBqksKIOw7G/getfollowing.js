import { MongoClient , ObjectId} from 'mongodb';
import { isValidElement } from 'react';


async function handler(req, res) {
    let comu = [];
    let como = [];
   // console.log(req.body);
  if (req.method === 'POST') {
 
const userid=req.body.idcookie;
const otherid = req.body.id;

    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db();
     
      let filteru = {_id:ObjectId(userid)};
      let filtero = {_id:ObjectId(otherid)}
   
      const postCollection = db.collection('user');
      const resultu = await postCollection.findOne(filteru);
      const resulto = await postCollection.findOne(filtero);
      
     comu = resultu.following;
      como = resulto.followers;
      
      if(userid!=otherid){
    const ress=  comu.findIndex(element => element === resulto.username);
    console.log(ress)
      if(ress===-1 ){
        comu.push(resulto.username);
      }
      const ress1= como.findIndex(element => element ===resultu.username);
      console.log(ress1)
      if(ress1===-1){
        como.push(resultu.username);
      }
      
     
    }
    const datao= {
      $set: {
        followers: como
     // comments:[],
   
      },
    }

    const datau= {
      $set: {
        following: comu
     // comments:[],
   
      },
    }
      const options = { upsert: true };
      const resultu1 = await postCollection.updateOne(filteru, datau, options);
      const resulto1 = await postCollection.updateOne(filtero, datao, options);

//console.log(com);
    res.status(201).json({ message: 'Fetching following', });
  }
}

export default handler;