import { MongoClient, ObjectId } from "mongodb";
import cookie from "cookie";
import cloudinary from "cloudinary";
import "dotenv/config";
async function handler(req, res) {
  const id = req.body.id;
  if (req.method === "DELETE") {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    // console.log(process.env.CLOUDINARY_CLOUD_NAME);
    //console.log(process.env.CLOUDINARY_API_KEY);
    //console.log(process.env.CLOUDINARY_API_SECRET);

    //console.log("ppo");
    const cookies = cookie.parse(req.headers.cookie || "");
    const client = await MongoClient.connect(
      "mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
    );
    const db = client.db();

    const postCollection = db.collection("posts");
    const filter = { _id: ObjectId(`${id}`) };
    const comdb = db.collection("comments");
    const result = await postCollection.findOne(filter);

    const user = db.collection("user");
    const userdata = await user.findOne({
      username: result.username,
    });
    //console.log("po");
    //console.log(userdata._id.toString()===cookies.token);
    if (userdata._id.toString() === cookies.token) {
      //console.log(userdata._id.toString()===cookies.token);

      const exp = db.collection("Explore");

      let postlist = userdata.post;
      const relate = result.relate;
      for (let r of relate) {
        const filter = { relate: r };
        const res = await exp.updateOne(filter, {
          $pull: { post: result._id },
        });
        console.log(res);
      }
      let newpostlist = [];
      //console.log(id!==postlist[1].toString())
      for (let i in postlist) {
        if (postlist[i].toString() !== id) {
          //console.log(postlist[i])
          newpostlist.push(postlist[i]);
        }
      }
      if (result.comments.length !== 0) {
        for (let c of result.comments) {
          const comfilter = {
            _id: ObjectId(`${c.id}`),
          };
          const delcom = await comdb.deleteOne(comfilter);
          console.log(delcom);
        }
      }
      //console.log(newpostlist)
      const userid = userdata._id;
      const userfilter = { _id: userid };
      const options = { upsert: true };
      const newuserdata = {
        $set: {
          post: newpostlist,
        },
      };
      for (let r of result.image) {
       
        const str=r.id
        await cloudinary.uploader.destroy(str, function (error, result) {
          console.log(result, error);
        });
      }

      const userresult = await user.updateOne(userfilter, newuserdata, options);
      const detelepost = await postCollection.deleteOne(filter);
      //console.log(userresult);
      //console.log(detelepost);
      client.close();

      res.status(201).json({ message: "deleted" });
    } else {
      res.status(401).json({ message: "failed!" });
    }
  }
  
}

export default handler;
