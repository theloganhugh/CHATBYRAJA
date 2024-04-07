

import cookie from "cookie";





async function handler(req, res) {
     

  if (req.method === 'GET') {
   var cookies = cookie.parse(req.headers.cookie || '');

  // Get the visitor name set in the cookie
  var name = cookies.token;
  console.log(name);
  res.status(201).json({ message: 'commment added', data:name});
  }else{
    res.statusCode = 401;
    res.json({ success: false });
  }
    
    
  }
  
 
 

 
  



export default handler;