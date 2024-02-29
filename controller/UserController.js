const db = require("../db")
const bcrypt = require('bcrypt')

class UserController {

    async register(req, res) {
        const { username, email, password } = req.body
        const hashPasswd = await bcrypt.hash(password, 10)
        try {
            const result = await db.query('INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)', [username, email, hashPasswd, "user"])
            res.json(result.rows[0])
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Error during register"})
        }
    }

    async login(req, res) {
        const { email, password } = req.body
        try {
            const result = await db.query('SELECT * FROM users WHERE email = $1', [email])
            if(result.rows.length > 0){
                const user = result.rows[0]
                const passwdMatch = await bcrypt.compare(password, user.password)
                if(passwdMatch){
                    req.session.user = user
                    res.json(user)
                } else {
                    res.status(401).json({ error: 'Incorrect password or email'})
                }
            } else {
                res.status(401).json({ error: 'User not found'})
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error during login'})
        }
    }

    async getUser(req, res) {
        try {
            if (req.session.user) {
               const userId = req.session.user.id;
               const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
   
               if (result.rows.length > 0) {
                  const user = result.rows[0];
                  res.json(user);
               } else {
                  res.status(404).json({ error: 'User not found'});
               }
            } else {
               res.status(401).json({ error: 'User not logged in'});
            }
         } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error'});
        }
    }

    async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);

            if (result.rows.length > 0) {
                  const user = result.rows[0];
                  res.json(user);
               } else {
                  res.status(404).json({ error: 'User not found'});
               }
        } catch (error) {
            console.error(error)
        }
    }

    async getUsersExceptMe (req, res) {
        try{
            if (req.session.user) {
                const users = await db.query('SELECT * FROM users WHERE id != $1', [req.session.user.id])
                res.json(users.rows)
            } else {
                console.error("User is not logged in")
            }
        } catch (err) {
            console.error(err)
        }
    }

    async getUsers(req, res) {
        try {
            const users = await db.query('SELECT * FROM users')
            res.json(users.rows)
        } catch (error) {
            console.error(error)
            res.status(511).json({error: 'client needs to authenticate to gain network access.'})
        }
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        const { username, email, role } = req.body;
        try {
            const result = await db.query('UPDATE users SET username = $1, email = $2, role = $3 WHERE id = $4', [username, email, role, userId]);
            if (result.rows.length === 1) {
                const updatedUser = result.rows[0];
                res.json(updatedUser);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating user' });
        }
    }

    async updateUserInfo(req, res) {
        const { username, email, password } = req.body;
        try {
            if (req.session.user) {
                const userId = req.session.user.id;
                const hashPasswd = await bcrypt.hash(password, 10)
                const result = await db.query('UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4', [username, email, hashPasswd, userId]);
                if (result.rows.length === 1) {
                    const updatedUser = result.rows[0];
                    res.json(updatedUser);
                } else {
                res.status(404).json({ error: 'User not found' });
                }
            } else {
                res.status(404).json({ error: 'User not logged in' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating user' });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            // Assuming you have a function to execute SQL queries, replace it with your actual implementation
            const result = await db.query('DELETE FROM users WHERE id = $1', [userId])
            if (result.rowCount === 1) {
                res.json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error deleting user' });
        }
    }

}

module.exports = new UserController()