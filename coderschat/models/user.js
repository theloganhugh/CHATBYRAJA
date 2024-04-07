const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserShema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    dp:{
        type:String,
        required: true
    },
    bio:{
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    followers:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    following:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

user= mongoose.model('user', UserShema);
export default user;