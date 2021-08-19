let router = require('express').Router();
const nodemailer = require('nodemailer');

//POST route from contact form
router.post('/contact', async (req, res)=>{
    //instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    })

    //specify what the email will look like
    const mailOpts = {
        from: req.body.email,
        to: process.env.GMAIL_USER,
        subject: 'New message from your portfolio',
        text: `${req.body.name} (${req.body.email}) says : ${req.body.message}`
    }

    //Attempt  to send the email
    smtpTrans.sendMail(mailOpts, (error, response)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(response)
        }
    })
});

module.exports = router;
