import mongoose from "mongoose";
import PostModel from "../Models/PostModel.js";
import {userModel} from '../Models/UserModel.js'


export const createPost = async(req,res)=>{
    try {

        const {desc,image} = req.body
        // console.log(req.user) 
       
        const {_id,name} = req.user
       
            const post = await PostModel({
                userId:_id,
                userName:name,
                desc,
                image
            })
            const result = await post.save()
            res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error);
        
    }
}

export const updatepost = async(req,res)=>{
    const {id} = req.params
    try {
        const {_id} = req.user
        const post = await PostModel.findById(id)
        if(post.userId==_id){
            const update = await PostModel.findByIdAndUpdate(id,req.body,{new:true})
            res.status(200).json(update)
        }else{
            res.status(500).json('action forbidden!')
        }
    } catch (error) {
        res.status(500).json(error);
        
    }
}

export const deletePost = async(req,res)=>{
    const {id} = req.params
    const {_id} = req.user
    try {
        const post = await PostModel.findById(id)
        if(post.userId==_id){
           await post.deleteOne()
           res.status(200).json('post delete successfully!')
        }else{
            res.status(500).json('action forbidden!')
        }
    } catch (error) {
        res.status(500).json(error);
        
    }
}

export const postLike = async(req,res)=>{
    const id = req.params.id;
    const userId = req.user._id 
    // console.log('tourId',id,'userId',userId)
  
    try {
      const post = await PostModel.findById(id);
      if (!post.likes.includes(userId)) {
         const updatePost = await PostModel.findByIdAndUpdate(id,{
            $push:{likes:userId}
        },{new:true})
      return   res.status(200).json(updatePost);
      } else {
        const updatePost = await PostModel.findByIdAndUpdate(id,{
        $pull:{likes:userId}
    },{new:true})
      return  res.status(200).json(updatePost);
      }
    } catch (error) {
      res.status(500).json(error);
    }
}


export const commentPost = async(req,res)=>{
    const {id} = req.params 
    const {_id,name} = req.user
    const {comment} = req.body
    // console.log(comment)
    // console.log(_id,name)
    try {
        const tour = await PostModel.findByIdAndUpdate(id,{
            $push:{comments:{id:_id,name,comment}}
        },{new:true})
    res.status(200).json(tour)
    } catch (error) {
        res.status(500).json(error);
        
    }
}

export const geTimeLinePost = async(req,res)=>{
    const {id} = req.params
    try {
        const currentUserPost = await PostModel.find({userId:id})
        const followingUserPost = await userModel.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(id)
                },
                
            },
            {
                $lookup:{
                    from:'posts',
                    localField:'following',
                    // localField:['following','friends'],
                    foreignField:'userId',
                    as:"followingPosts",
                },
            },
            {
                $project:{
                    followingPosts:1,
                    _id:0
                },
            },

        ])
        res
        .status(200)
        .json(currentUserPost.concat(...followingUserPost[0].followingPosts)
        .sort((a,b)=>{
            return b.createdAt - a.createdAt;
        })
        );

        
    } catch (error) {
        res.status(500).json(error);
        
    }
}

export const getSingleUserPost = async(req,res)=>{
    const {id} = req.params
    try {
        const posts = await PostModel.find({userId:id})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error);

        
    } 
}
