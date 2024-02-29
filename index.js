const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userRouter = require('./route/UserRoute')
const postRouter = require('./route/PostRoute')
const followerRouter = require('./route/FollowerRoute')


const PORT = 3000;
const HOST = 'localhost';
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
   secret: 'session_code',
   resave: false,
   saveUninitialized: true
}));

app.use('/admin', postRouter); 
app.use('/admin', userRouter); 
app.use('/', postRouter);
app.use('/', userRouter); 
app.use('/', followerRouter);

app.get('/', (req, res) => {
   if (req.session.user) {
      res.sendFile(__dirname + '/public/user.html')
   } else {
      res.redirect('/login');
   }
});

app.get('/login', (req,res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.get('/register', (req,res) => {
    res.sendFile(__dirname + '/public/register.html')
})

app.get('/admin', (req, res) => {
   if (req.session.user) {
      if(req.session.user.role == "admin"){
         res.sendFile(__dirname + '/public/admin.html')
      } else {
         res.redirect('/login')
      }
   } else {
      res.redirect('/login')
   }
})

app.get('/logout', (req, res) => {
   req.session.destroy((err) => {
      if (err) {
         console.error(err);
      } else {
         res.redirect('/login');
      }
   });
});

app.listen(PORT, () => console.log(`http://${HOST}:${PORT}`));