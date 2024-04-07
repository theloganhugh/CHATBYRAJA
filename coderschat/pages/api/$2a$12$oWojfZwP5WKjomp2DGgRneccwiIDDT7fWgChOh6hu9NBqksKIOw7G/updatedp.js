import bcrypt from "bcryptjs";
import cookie from "cookie";
import { MongoClient , ObjectId} from 'mongodb';

async function handler(req, res) {
     

  if (req.method === 'POST') {
 let flag=true;
    const data = req.body;
    var cookies = cookie.parse(req.headers.cookie || '');
    var name = cookies.token;
    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db(); 
    const users = db.collection('user');
    const result = await users.findOne({
        _id:ObjectId(name)
    });
    if(!result){
  flag=  false;
    
    }
  if(flag===true){
        const data1= {
            $set: {
                dp:data.dp
            },
        }
        let filter = {_id:ObjectId(name)};
        const options = { upsert: true };
        const result = await users.updateOne( filter, data1, options);
          client.close();
          res.statusCode = 200;
          res.json({ success: true });   
  }
     
 else{
    res.statusCode = 401;
    res.json({ success: false });
 }


  }
  

 
  
}


export default handler;