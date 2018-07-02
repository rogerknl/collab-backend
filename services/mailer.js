'use strict';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports.emailValidtor = (user,msg) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Validate email',
    html: `
    <html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>
<style>
body { font-family:arial; font-size: 9pt; }
</style>
<body bgcolor="#FFFFFF" text="#000000">
<p>Thank you for creating a Collab account. To complete the registration process, please choose one of the options below to verify your e-mail address.</p>
<br/>
<p>To confirm your email address, choose one of the following options:
<br>1. Click this link: <a target='_blank' href='${msg}'>Validate</a>
<br>2. Copy and paste this URL into your browser&rsquo;s address bar: ${msg}
</p>
<p>Thank you for choosing us!</p>
<br/>
<p>Sincerely,</p>
<p>Customer Service</p>
</body>
</html>`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      // eslint-disable-next-line
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
      // eslint-disable-next-line
      console.log(err);
    }else
    // eslint-disable-next-line
      console.log(info);
  });
};

module.exports.failedRecordingTransaction = ( tx ) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'Error on registering tx',
    html: `<h1>Error on registering:</h1><br/><p>${tx}</p>`
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      // eslint-disable-next-line
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
      // eslint-disable-next-line
      console.log(err);
    }else
    // eslint-disable-next-line
      console.log(info);
  });
};


module.exports.testMail = () => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'roger.knl@gmail.com',
    subject: 'Test de mailer',
    html: '<h1>Bon dia KNL!!</h1><p>Ara podem posar qualsevol cosa: ¯\\_(ツ)_/¯</p>'
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      // eslint-disable-next-line
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
      // eslint-disable-next-line
      console.log(err);
    }else
      // eslint-disable-next-line
      console.log(info);
  });
};
module.exports.readyToVote = (user,msg,urlOK,urlKO) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'A new operation is waiting your vote',
    html: `
    <html>
      <head>
      <style>
        p {
          font-size: 16px;
        }
        .content{
          width: 370px;
          margin: auto;
        }
        .votes {
          margin: auto;
          text-align:center;
        }
        a.btn{
          display: block;
          text-decoration: none;
          color: white;
          padding:20px;
          border-radius:10px;
          margin:10px;
          font-size: 20px;
          flex:1;
        }
        a.VoteOK{
          background-color: green;
        }
        a.VoteKO{
          background-color: red;
        }
      </style>
      </head>
      <body>
        <div class="content">
          <h1>New operation:</h1>
          <h2>${msg}</h2>
          <br/>
          <p>We are waiting for your vote: </p>
          <div class="votes">
            <a class="btn VoteOK" href="${urlOK}" target="_blank">VOTE YES</a>
            <a class="btn VoteKO" href="${urlKO}" target="_blank">VOTE NO</a>
          <div>
        </div>
      </body>
    </html>
    `
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      // eslint-disable-next-line
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
      // eslint-disable-next-line
      console.log(err);
    }else
    // eslint-disable-next-line
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
      // eslint-disable-next-line
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
      // eslint-disable-next-line
      console.log(err);
    }else
    // eslint-disable-next-line
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
      // eslint-disable-next-line
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
      // eslint-disable-next-line
      console.log(err);
    }else
    // eslint-disable-next-line
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
      // eslint-disable-next-line
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS);
      // eslint-disable-next-line
      console.log(err);
    }else
      // eslint-disable-next-line
      console.log(info);
  });
};