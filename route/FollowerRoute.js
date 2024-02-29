const Route = require('express')
const router = new Route()
const FollowerController = require('../controller/FollowerController')

router.get('/followers/:id', FollowerController.getFollowersNumber)
router.get('/followees/:id', FollowerController.getFolloweesNumber)
router.get('/follows/:id1/:id2', FollowerController.followExist) 
router.post('/follows/follow/', FollowerController.follow) 
router.post('/follows/unfollow', FollowerController.unfollow)
router.get('/followers', FollowerController.getFollowers)
router.get('/followees', FollowerController.getFollowees)

module.exports = router;