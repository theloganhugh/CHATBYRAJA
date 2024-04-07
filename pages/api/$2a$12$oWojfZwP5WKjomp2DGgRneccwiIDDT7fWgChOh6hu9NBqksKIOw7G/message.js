import { MongoClient } from "mongodb";

async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority"
  );
  const db = client.db();
  const msgcollec = db.collection("Message");
  console.log(req.body);
  const data = req.body.data;
  const type = req.body.type;
  if (req.method === "POST") {
    if (type === "new") {
      const msgdata = data;
      console.log(msgdata);
      const result = await msgcollec.insertOne(msgdata);
      res.status(201).json({ message: "coversation inserted!", data: result });
    }
    if (type === "all") {
      const result = await msgcollec
        .find({ conversationId: data.conversationId })
        .toArray();
      const newres = [];
      for (let r of result) {
        r._id = r._id.toString();

        newres.push(r);
      }
      res.status(201).json({ message: "success", data: newres });
    }
   /* if (type == "many") {
      const filter = {};
      const data = {
        $set: {
          time: new Date(),
        },
      };
      const result = await msgcollec.updateMany(filter, data);
      res.status(201).json({ message: "success", data: result })
    }
  }*/
  client.close();
}
}

export default handler;
