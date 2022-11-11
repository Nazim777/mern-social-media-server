import express from 'express'
import { createMessage, getMessage } from '../Controller/MessageController.js'
const router = express.Router()
router.post('/createmessage',createMessage)
router.get('/getmessage/:chatId',getMessage)

export default router