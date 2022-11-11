import express from 'express'
import dotev from 'dotenv'
import {database} from './database/database.js'
import router from './Routes/AuthRouter.js'
import userRouter from './Routes/UserRouter.js'
import postRouter from './Routes/PostRouter.js'
import uplaodRouter from './Routes/UploadRouter.js'
import chatRoute from './Routes/ChatRouter.js'
import messageRoute from './Routes/MessageRouter.js'
import cors from 'cors'
dotev.config()
const app = express()


app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json())
// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

app.use(router)
app.use(userRouter)
app.use(postRouter)
app.use(uplaodRouter)
app.use(chatRoute)
app.use(messageRoute)
database()


app.listen(process.env.PORT,()=>{
    console.log('server listening on port 5000')
})