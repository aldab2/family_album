import mongoose from "mongoose";

const familySchema = mongoose.Schema({
    spaceName:{
        type: String,
        required: true
    },
    familyMembers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    // friendRequests:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'FriendReqest'
    // }],
    friends: [{
        type: mongoose.Types.ObjectId,
        ref: 'Family',
        unique: true
    }]
},{
    timestamps:true
});

const Family = mongoose.model('Family',familySchema);





  

  

export default Family;