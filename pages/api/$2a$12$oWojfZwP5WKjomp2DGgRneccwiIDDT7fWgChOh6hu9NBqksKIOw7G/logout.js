
import cookie from "cookie";





async function handler(req, res) {
    
  if (req.method === 'POST') {
    
        
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 0,
            sameSite: "strict",
            path: "/",
          })
        );
        res.statusCode = 200;
        res.json({ success: true });
      } else {
        // response is OutgoingMessage object that server response http request
        return response.json({success: false, message: 'passwords do not match'});
      }
    
   
  }


export default handler;