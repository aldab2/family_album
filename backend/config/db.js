import { error } from "console";
import mongoose  from "mongoose";

import Comment from "../models/commentModel.js";
import Family from "../models/familyModel.js";
import FriendRequest from "../models/friendRequestModel.js";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        await Comment.syncIndexes()
        await Family.syncIndexes()
        await FriendRequest.syncIndexes()
        await Post.syncIndexes()
        await User.syncIndexes()
        console.log(`MongoDB connected: ${conn.connection.host}:${conn.connection.port}`)
    }
    catch (error){
        console.error(`Error: ${error.message}`)
        process.exit(1);
    }

}

export default connectDB;