import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    chatId:{
        type:String
    },
    senderId:{
        type:String
    },
    text:{
        type:String
    },
},
{
    timestamps:true
}
)

export const MessageModel = mongoose.model('messages',messageSchema)