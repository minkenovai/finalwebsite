document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if(validateForm()) {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        if (response.ok) {
            alert('Registration successful!');
            window.location.href = '/login';
            sendMail(email);
        } else {
          alert('Registration failed');
        }
    }
});

function validateForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
 
    if (email.trim() === "") {
      alert("Please enter your email address");
      return false;
    }
 
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return false;
    }
  
    if (password.trim() === "") {
      alert("Please enter a password");
      return false;
    }
 
    if (password.length <= 8) {
        alert("Password must be longer than 8 characters");
        return false;
    }
  
    var symbolPattern = /[!@#$%^&*().]/;
    if (!symbolPattern.test(password)) {
        alert("Password must contain at least one symbol like dot");
        return false;
    }
    return true;
}

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ikosyaa2004@gmail.com',
    pass: 'lflg nznd bwiz pmlp'
  }
});

var mailOptions = {
  from: 'ikosyaa2004@gmail.com',
  to: 'skill22899@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});