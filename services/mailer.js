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
};
module.exports.readyToVote = (user,msg) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'A new operation is waiting your vote',
    html: `<h1>New operation:</h1><h2>${msg}</h2><br/><p>We are waiting for your vote: </p>`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
      console.log(err)
    }else
      console.log(info);
  });
};
module.exports.opearionRejected = (email,msg) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'One operation has been processed',
    html: `<h1>Operation:</h1><h2>${msg}</h2><br/><p>Has been Rejected</p>`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
      console.log(err)
    }else
      console.log(info);
  });
};
module.exports.operationApproved = (email,msg) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'One operation has been processed',
    html: `<h1>Operation:</h1><h2>${msg}</h2><br/><p>Has been Approved</p>`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
      console.log(err)
    }else
      console.log(info);
  });
};
module.exports.operationApprovedButfailed = (email,msg) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'One operation has been processed',
    html: `<h1>Operation:</h1><h2>${msg}</h2><br/><p>Has been Approved, but has not been executed (ERROR 0012045)</p>`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
      console.log(err)
    }else
      console.log(info);
  });
};