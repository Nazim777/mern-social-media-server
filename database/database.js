import mongoose from "mongoose";
export  const database = async()=>{
   try {
    await mongoose.connect(process.env.MONGO_DB)
    console.log('database connection successfully!')
   } catch (error) {
    console.log(error)
    
   }
}