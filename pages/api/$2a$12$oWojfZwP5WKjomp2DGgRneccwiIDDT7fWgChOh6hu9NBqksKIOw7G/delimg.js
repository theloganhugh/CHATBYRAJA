import { MongoClient, ObjectId } from "mongodb";
import cookie from "cookie";
import cloudinary from "cloudinary";
import "dotenv/config";
async function handler(req, res) {
  const delid= req.body.delid;
  if (req.method === "DELETE") {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    // console.log(process.env.CLOUDINARY_CLOUD_NAME);
  
      for (let r of delid) {
       
        const str=r
        await cloudinary.uploader.destroy(str, function (error, result) {
          console.log(result, error);
        });
      }

      res.status(201).json({ message: "deleted" });

    
    
  }
  
}

export default handler;
