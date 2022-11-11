import express from 'express'
import { createPost, deletePost, geTimeLinePost, postLike, updatepost,commentPost,getSingleUserPost } from '../Controller/PostController.js'
const router = express.Router()
import CheckLogin from '../middlewares/CheckLogin.js'

router.post('/createpost',CheckLogin, createPost)
router.put('/updatepost/:id',CheckLogin,updatepost)
router.delete('/deletepost/:id', CheckLogin,deletePost)
router.put('/postlike/:id',CheckLogin, postLike)
router.put('/postcomment/:id',CheckLogin, commentPost)
router.get('/timelinepost/:id',geTimeLinePost)
router.get('/singleuserpost/:id',getSingleUserPost)
export default router