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
    friends: [{
        type: mongoose.Types.ObjectId,
        ref: 'Family',
    }]
},{
    timestamps:true
});

const Family = mongoose.model('Family',familySchema);





  

  

export default Family;