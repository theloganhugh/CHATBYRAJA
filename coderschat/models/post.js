const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    username:{
        type: String,
        required: true,
    },
    caption:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('post', PostSchema);
