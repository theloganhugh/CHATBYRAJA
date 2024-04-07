
import { MongoClient } from 'mongodb';
import bcrypt from "bcryptjs";
import cookie from "cookie";





async function handler(req, res) {
     

  if (req.method === 'POST') {
 let flag=true;
    const data = req.body;
    const client = await MongoClient.connect(
      'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
    );
    const db = client.db(); 
  //  console.log("user");
    const users = db.collection('user');
    const result = await users.findOne({
      username:data.username, 
    });
    if(!result){
  flag=  false;
    
    }
  if(flag===true){
    bcrypt.compare(data.password, result.password, function(err, response) {
      client.close();
      if (err){
        // handle error
        console.log(err);
      }
     // console.log(response);
      if (response&&flag){
        
          res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", result._id, {
              httpOnly: true,
              secure: process.env.NODE_ENV !== "development",
              maxAge: 7*24*60 * 60,
              sameSite: "strict",
              path: "/",
            })
          ); 
          res.statusCode = 200;
          res.json({ success: true });
        }
        else{
          res.statusCode = 401;
          res.json({ success: false });
        }
      
      
      
    });
  }else{
    res.statusCode = 401;
    res.json({ success: false });
  }
    
    
  }
  
 
 

 
  
}


export default handler;