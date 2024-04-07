
import { MongoClient } from 'mongodb';



async function handler(req, res) {
    const client = await MongoClient.connect(
        'mongodb+srv://ramraj:candid1234@cluster0.kun1l.mongodb.net/posts?retryWrites=true&w=majority'
      );
      const db = client.db();  
      const covncollec = db.collection('Conversation');
    console.log(req.body);
    const data = req.body.data;
    const type=req.body.type;
  if (req.method === 'POST') {
      if(type==='new'){
  const convdata={ members:[data.senderId, data.receiverId]};
  const result1 = await covncollec.findOne({members: { $all: [data.senderId, data.receiverId] }});
  if(result1===null){
  const result = await covncollec.insertOne(convdata);
    res.status(201).json({ message: 'coversation inserted!' , data:result});}
    else{
      res.status(200).json({ message: 'coversation exist' ,});
    }
      }
      if(type==='all'){
        const result = await covncollec.find({ members: { $in: [data.userId] }}).toArray();
        const newres=[];
        for(let r of result){
            r._id=r._id.toString();
          
            newres.push(r);
        }
        res.status(201).json({ message: 'success', data:newres});
      }
      else if(type==='one'){
        const result = await covncollec.findOne({members: { $all: [data.firstUserId, data.secondUserId] }});
        res.status(201).json({ message: 'success', data:result});
      }
      client.close();
}
}

export default handler;