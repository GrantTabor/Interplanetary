require ("dotenv").config();

module.exports = {
    email: async (req, res, next) =>{
        var nodemailer = require('nodemailer');
        const {EMAIL, PASSWORD} = process.env
        
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });

        var mailOptions = {
            from: 'grantmtabor@gmail.com',
            to: 'grantmtabor@gmail.com',
            subject: 'Welcome to Interpanetary!',
            text: 'This game is a project I made to help learn more about react and node JS.'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}