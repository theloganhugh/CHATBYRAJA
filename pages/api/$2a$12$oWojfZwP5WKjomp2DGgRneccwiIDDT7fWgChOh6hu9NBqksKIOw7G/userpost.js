

async function handler(req, res) {

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );
  
  } catch (e) {
    console.log("could not connect");
  }
  
return userdata;

}
  export default handler;