import mongoose from "mongoose";
const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePicture: {
        type:String
    },
    coverPicture: {
            type: String
        },
        about:String,
        livesin: String,
        worksAt: String,
        relationship: String,
        followers: [] ,
        following: [],
        pendingFriendRequest:[],
        friends:[],
},
{
    timestamps:true
}

)
export const userModel = mongoose.model('users',UserSchema)