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