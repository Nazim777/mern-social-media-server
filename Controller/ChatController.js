import { ChatModel } from "../Models/ChatModel.js";

export const createChat = async(req,res)=>{
      try {
        const chat = await ChatModel.findOne({
          members: { $all: [req.body.senderId, req.body.receiverId] },
        });

        if(!chat){
          const newChat = new ChatModel({
            members: [req.body.senderId, req.body.receiverId],
          });
          const result = await newChat.save();
          res.status(200).json(result);
        }else{
          res.status(200).json('you already create chat with this user!');

        }
        
        
      } catch (error) {
        res.status(500).json(error);
      }
}

export const userChat = async(req,res)=>{
    try {
        const chat = await ChatModel.find({
          members: { $in: [req.params.userId] },
        });
        res.status(200).json(chat);
      } catch (error) {
        res.status(500).json(error);
      }
}

export const findChat = async(req,res)=>{
    try {
        const chat = await ChatModel.findOne({
          members: { $all: [req.params.firstId, req.params.secondId] },
        });
        res.status(200).json(chat)
      } catch (error) {
        res.status(500).json(error)
      }
}