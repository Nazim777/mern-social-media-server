import mongoose from "mongoose";
import { userModel } from "../Models/UserModel.js";
import cloudinary from '../Utils/Cloudinay.js'
 
export const singleUser = async(req,res)=>{
    const {id} = req.params
    try {
       
        const user = await userModel.findById(id)
        if(user){
            const {password,...otherData} = user._doc
            res.status(200).json(otherData)
            
        }else{
            res.status(500).json('no user exist')
        }
         

     
    } catch (error) {
        console.log(error)
        
    }
}


export const getAllUser = async(req,res)=>{
    try {
    let data = await userModel.find()
    
        res.status(200).json(data)
        
    } catch (error) {
        res.status(500).json(error);
        
    }
}


export const updateUser  = async (req,res)=>{
    const {id} = req.params
    const {currentUserId,adminStatus} = req.body
   
    const {_id} = req.user
   
    try {
        if(id==_id || adminStatus){
            const updatedData = await userModel.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json(updatedData)
        }else{
            res.status(500).json('access denied')
        }
    } catch (error) {
        res.status(500).json(error);
        
    }
}

export const delelteUser = async(req,res)=>{
    const {id} = req.params
    const {currentUserId} = req.body 
    try {
        if(id===currentUserId){
            await userModel.findByIdAndDelete(id)
            res.status(200).json('user deleted successfully!')
        }else{
            res.status(200).json('access denied!')
            
        }
    } catch (error) {
        res.status(500).json(error);
        
    }
}



export const followers = async(req,res)=>{
    const {id} = req.params
    // console.log(id)
    // const {currentUserId} = req.body
    const currentUserId  = req.user._id
    try {
        const followUser = await userModel.findById(id)
        const followingUser = await userModel.findById(currentUserId)
        if(!followUser.followers.includes(currentUserId)){
            const update = await userModel.findByIdAndUpdate(id,{$push:{followers:currentUserId}},{new:true})
        //   await followUser.updateOne({$push:{followers:currentUserId}})
          await followingUser.updateOne({$push:{following:id}})
          res.status(200).json(update)

        }else{
            res.status(500).json('user already follow this user!')
        }

    } catch (error) {
        res.status(500).json(error);
        
    }

}

export const unFollowers = async(req,res)=>{
    const {id} = req.params 
    // const {currentUserId} = req.body
    const currentUserId = req.user._id
    // console.log(currentUserId)
    // console.log(id)
    try {
        const followUser = await userModel.findById(id)
        const followingUser = await userModel.findById(currentUserId)
        if(followUser.followers.includes(currentUserId)){
            const update = await userModel.findByIdAndUpdate(id,{$pull:{followers:currentUserId}},{new:true})
        //   await  followUser.updateOne({$pull:{followers:currentUserId}})
           await followingUser.updateOne({$pull:{following:id}})
            res.status(200).json(update)

        }else{
            res.status(200).json('this user do not followed by you!')
        }

        
    } catch (error) {
        res.status(500).json(error);
        
    }
}



export const friendRequestSent = async(req,res)=>{
    const {id} = req.params
    const {_id} = req.user
    try {
        const user = await userModel.findById(id)
        if(!user.pendingFriendRequest.includes(_id) && !user.friends.includes(_id)){
            const update = await userModel.findByIdAndUpdate(id,{
                $push:{pendingFriendRequest:_id}
            },{new:true})
            res.status(200).json(update)

        }else{
            const update = await userModel.findByIdAndUpdate(id,{
                $pull:{pendingFriendRequest:_id}
               
            },{new:true})
            res.status(200).json(update)

        }
    } catch (error) {
        res.status(500).json(error);
        
    }
}

export const friendRequestAccept= async(req,res)=>{
    const {id} = req.params
    const {_id} = req.user
    // console.log(id)
    try {
        const friendrequestSenderInfo = await userModel.findById(id)
        const friendrequestAcceptorInfo = await userModel.findById(_id)
        if(!friendrequestAcceptorInfo.friends.includes(id) &&!friendrequestSenderInfo.friends.includes(_id)){

            
            
                const update = await userModel.findByIdAndUpdate(_id,{
                    $pull:{pendingFriendRequest:new mongoose.Types.ObjectId(id)},
                    $push:{friends:new mongoose.Types.ObjectId(id)}
                   
                },{new:true})
                await friendrequestSenderInfo.updateOne({$push:{friends:_id}},{new:true})
    
               return res.status(200).json(update)

            
             
        }else{
            return res.status(200).json('user already in friendlist!')
        }

    } catch (error) {
        res.status(500).json(error);
        
    }

}


export const rejectFriendRequest= async(req,res)=>{
    const {id} = req.params
    const {_id} = req.user
    try {
        const user = await userModel.findByIdAndUpdate(_id,{
            $pull:{pendingFriendRequest:new mongoose.Types.ObjectId(id)}
        },{new:true})
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json(error);
        
    }
}


export const unfriend = async(req,res)=>{
    const {id} = req.params
    const {_id} = req.user


    try {
        const unFriendUser = await userModel.findById(id)
        const update = await userModel.findByIdAndUpdate(_id,{
            $pull:{friends:new mongoose.Types.ObjectId(id)}
        },{new:true})
        await unFriendUser.updateOne({$pull:{friends:_id}},{new:true})

        res.status(200).json(update)
    } catch (error) {
        res.status(500).json(error);
        
    }
}