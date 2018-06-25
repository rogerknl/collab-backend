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
    from: process.env.EMAIL_USER, // sender address
    to: 'roger.knl@gmail.com', // list of receivers
    subject: 'Test de mailer', // Subject line
    html: '<h1>Bon dia KNL!!</h1><p>Ara podem posar qualsevol cosa: ¯\\_(ツ)_/¯</p>'// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
      console.log(err)
    }else
      console.log(info);
 });
}