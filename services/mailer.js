'use strict';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports.testMail = () => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'roger.knl@gmail.com',
    subject: 'Test de mailer',
    html: '<h1>Bon dia KNL!!</h1><p>Ara podem posar qualsevol cosa: ¯\\_(ツ)_/¯</p>'
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
      console.log(err)
    }else
      console.log(info);
 });
}
module.exports.readyToVote = (user,msg) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'A new operation is waiting your vote',
    html: `<h1>New operation:</h1><br/><h2>${msg}</h2<p>We are waiting for your vote: ¯\\_(ツ)_/¯</p>`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
      console.log(err)
    }else
      console.log(info);
 });
}