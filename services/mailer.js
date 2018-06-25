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