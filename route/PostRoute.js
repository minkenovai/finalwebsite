const Route = require('express')
const router = new Route()
const PostController = require('../controller/PostController')

router.get('/post/posts', PostController.getPosts)
router.post('/post/add', PostController.addPost)
router.put('/post/post/:id', PostController.updatePost)
router.delete('/post/post/:id', PostController.deletePost)
router.get('/post/posts/id', PostController.getPostsById)

module.exports = router