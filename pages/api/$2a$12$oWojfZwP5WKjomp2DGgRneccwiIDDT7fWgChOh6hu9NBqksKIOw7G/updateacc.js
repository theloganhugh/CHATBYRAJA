

import bcrypt from "bcryptjs";
import cookie from "cookie";
import { MongoClient , ObjectId} from 'mongodb';





async function handler(req, res) {
     
let cfg=false;
  if (req.method === 'POST') {
 let flag=true;
    const data = req.body;
    var cookies = cookie.parse(req.headers.cookie || '');

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
    if(!result){
  flag=  false;
    
    }
  if(flag===true){
    bcrypt.compare(data.cpassword, result.password, async function(err, response) {
      
      if (err){
        // handle error
        console.log(err);
      }
     // console.log(response);
      if (response&&flag){ 
        const data1= {
            $set: {
                password:data.password ,
                email:data.email,
            },
        }
        let filter = {_id:ObjectId(name)};
        const options = { upsert: true };

        const result = await users.updateOne( filter, data1, options);
          cfg=true;
          client.close();
        }
        
      
      
      
    });
  }
     
 if(cfg===true)
 {
  res.statusCode = 200;
  res.json({ success: true });
 }
  res.statusCode = 401;
  res.json({ success: false });

  }
  

 
  
}


export default handler;