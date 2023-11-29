import mongoose from "mongoose";
import { commentSchema } from "./commentModel.js";

const postSchema = mongoose.Schema({
    author:{
        type: String,
        // ref: 'User',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date().now,
    },
    takenWith: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    family: {
        type: mongoose.Types.ObjectId,
        ref: 'Family',
        required: true
    },
    comments: [{
      type: commentSchema
    }],
    edited: {
        type: Boolean,
        default: false
    }
},
{
    timestamps:true
});



const Post = mongoose.model('Post',postSchema);
export default Post