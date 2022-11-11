import express from 'express'
const router = express.Router()
import { delelteUser, followers,friendRequestSent, getAllUser, singleUser, unFollowers, updateUser,friendRequestAccept,rejectFriendRequest, unfriend } from '../Controller/UserController.js'
import CheckLogin from '../middlewares/CheckLogin.js'
router.get('/singleuser/:id',singleUser)
router.get('/alluser', getAllUser)
router.put('/updateuser/:id',CheckLogin, updateUser)
router.delete('/deleteuser/:id',delelteUser)
router.put('/follow/:id',CheckLogin,followers)
router.put('/unfollow/:id',CheckLogin, unFollowers)
router.put('/friendrequest/:id',CheckLogin,friendRequestSent)
router.put('/friendrequestaccept/:id',CheckLogin,friendRequestAccept)
router.put('/rejectfriendrequest/:id',CheckLogin,rejectFriendRequest)
router.put('/unfriend/:id',CheckLogin,unfriend)

export default router

