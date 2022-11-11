import { MessageModel } from "../Models/MessageModel.js";

export const createMessage = async(req,res)=>{
    const {chatId,senderId,text} = req.body 
    try {
        const data = MessageModel({
            chatId,senderId,text
        })

        const result = await data.save()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json('something went wrong!')
        
    }
}

export const getMessage = async(req,res)=>{
    const {chatId} = req.params
    try {
        const chat = await MessageModel.find({chatId})
        res.status(200).json(chat)
        
    } catch (error) {
        res.status(500).json('something went wrong!')
        
    }
}