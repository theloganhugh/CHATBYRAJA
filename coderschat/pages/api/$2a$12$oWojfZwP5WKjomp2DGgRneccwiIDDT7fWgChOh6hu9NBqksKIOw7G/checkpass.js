
import { MongoClient , ObjectId} from 'mongodb';

import bcrypt from "bcryptjs";
import cookie from "cookie";





async function handler(req, res) {
     
let cfg=false;

  if (req.method === 'POST') {

    const data = req.body;
    var cookies = cookie.parse(req.headers.cookie || '');
    console.log(data.password)
    // Get the visitor name set in the cookie
    var name = cookies.token;
    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db(); 
  //  console.log("user");
    const users = db.collection('user');
    const result = await users.findOne({
        _id:ObjectId(name)
    });
    console.log(result.username)
    

    bcrypt.compare(data.password, result.password, function(err, response) {
      client.close();
      if (err){
        // handle error
        console.log(err);
      }
     
     console.log(response)
      if (response===true){ 
        cfg=true;
       
        res.statusCode = 200;
        res.json({ success: true });
        }
        
      else{
        res.statusCode = 401;
        res.json({ success: false });

      }
      
    });
  
  
  }
  
  
 
  
}


export default handler;