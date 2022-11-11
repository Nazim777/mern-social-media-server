import express from 'express'
const router = express.Router()
import { createChat, findChat, userChat } from '../Controller/ChatController.js'

router.post('/createchat',createChat)
router.get('/userchat/:userId',userChat)
router.get('/findchat/:firstId/:secondId',findChat)


export default router