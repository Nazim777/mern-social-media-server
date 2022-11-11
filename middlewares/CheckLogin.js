import  Jwt  from "jsonwebtoken";
import { userModel } from "../Models/UserModel.js";
const CheckLogin= async(req,res,next)=>{
    const {authorization} = req.headers 
    if(authorization&&authorization.startsWith('Bearer')){
        try {
            const token = authorization.split(' ')[1]
            const verifiedToken = Jwt.verify(token,process.env.jwt_secret)
            const {id} = verifiedToken
            req.user= await userModel.findById(id).select('-password')
           // console.log(req.user)
            next()
            
        } catch (error) {
            res.status(500).json({status:'failed','msg':'token not valid'})
            
        }

    }else{
        res.status(500).json({status:'failed','msg':'user not authenticated'})
    }

}
export default CheckLogin