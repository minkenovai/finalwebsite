const db = require("../db")

class PostController {

    async getPosts(req, res) {
        try {
            const posts = await db.query('SELECT * FROM posts')
            res.json(posts.rows)
        } catch (err) {
            console.error(err)
            res.json(err)
        }
    }

    async getPostsById(req, res) {
        const userId = req.session.user.id;
        try {
            const result = await db.query("SELECT * FROM posts WHERE user_id=$1", [userId])
            res.json(result.rows)
        } catch (error) {
            console.error(error)
            res.json(error)
        }
    }

    async updatePost(req, res) {
        const postId = req.params.id
        const { title, description } = req.body
        try {
            const post = await db.query('UPDATE posts SET title = $1, description = $2 WHERE id = $3', [title, description, postId])
            res.json(post.rows[0])
        } catch (err) {
            console.error(err)
            res.json(err)
        }
    }

    async deletePost(req, res) {
        const postId = req.params.id
        try {
            const result = await db.query('DELETE FROM posts WHERE id = $1', [postId])
            res.json({  message: 'Post deleted' })
        } catch (err) {
            console.error(err)
            res.json({ error: 'Error deleting post' })
        }
    }

    async addPost(req, res) {
        const { title, description } = req.body;
        const userId = req.session.user.id;
        try {
            const result = await db.query('INSERT INTO posts (user_id, title, description) VALUES ($1, $2, $3) RETURNING *', [userId, title, description])
            res.json(result.rows[0])
        } catch (err) {
            console.error(err)
            res.json(err)
        }
    }

}

module.exports = new PostController();