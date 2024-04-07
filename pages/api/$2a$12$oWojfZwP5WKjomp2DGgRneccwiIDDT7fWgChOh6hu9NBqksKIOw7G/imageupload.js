import multer from 'multer';
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
export { multerUploads };

async function uploadhandler(req, res) {
    console.log(req.body);
  if (req.method === 'POST') {
    
  }
}

export default uploadhandler;

app.post('/upload', multerUploads, (req, res) => {
    console.log('req.body :', req.body);
    });
