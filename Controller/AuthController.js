import { userModel } from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const registerUser = async(req,res)=>{
    const {name,email,password} = req.body
    try {

        userModel.findOne({email},async(err,doc)=>{
            if(doc){
                return res.status(500).json({msg:'user already exits'})

            }
            else{
                const hashPassword = await bcrypt.hash(password,10)
                    const data = await userModel({
                        name,email,password:hashPassword,isAdmin:false
                    })
                    const result = await data.save()
                    const token = await jwt.sign({id:result._id,name:result.name},process.env.jwt_secret,{expiresIn:'1h'})
                   
                    return res.status(201).json({msg:'registered successfully', data:result,'token':token})
                
                    
            }
            
        })
   
    
        
    } catch (error) {
        res.status(500).json({msg:'something went wrong!'})
        
    }
}


export const userLogin = async(req,res)=>{
    const {email,password} = req.body
    try {
        userModel.findOne({email},async(err,doc)=>{
            if(!doc){
                return res.status(500).json({msg:'user does not exit!'})
            }else{
                const validate = await bcrypt.compare(password,doc.password)
                if(validate){
                    const token = await jwt.sign({id:doc._id,name:doc.name},process.env.jwt_secret,{expiresIn:'1h'})
                   return res.status(200).json({ msg:'login successfully!',data:doc, token:token})

                }else{
                    return res.status(500).json({msg:'password does not match!'})

                }
            }

        })
        
    } catch (error) {
        res.status(500).json({msg:'something went wrong!'})
        
    }
}