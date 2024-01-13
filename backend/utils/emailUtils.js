//familyspacesupp@gmail.com
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // You can use other email services as well
  auth: {
    user: 'familyspacesupp@gmail.com', // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

// Function to send the verification email
//const sendVerificationEmail = (req, res, next) => {
const sendVerificationEmail = (req, res, next) => {
  // Define email options
  const mailOptions = {
    from: 'familyspacesupp@gmail.com',
    to: req.user.email,
    subject: 'Family Space Verification Email',
    //text: "Your Actication Code is: " + req.user.activationCode + " Verify your email address please enter the code in log in page ,Please do not share it with others ",
    
    html: `<!DOCTYPE html>
    <html>
    <head>
        <title>Verify Your Email</title>
        <style>
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                font-family: Arial, sans-serif;
            }
            .header {
                background-color: #f2f2f2;
                padding: 10px;
                text-align: center;
            }
            .content {
                padding: 20px;
                background-color: #ffffff;
            }
            .footer {
                padding: 10px;
                background-color: #f2f2f2;
                text-align: center;
            }
            .logo {
                max-width: 150px;
                margin-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <!-- Logo Image -->
                <img src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/image8-2.jpg?width=893&height=600&name=image8-2.jpg" alt="Logo" class="logo">
                <h2>Welcome to Family Space!</h2>
            </div>
            <div class="content">
                <p>Thank you for signing up. Please verify your email address to complete your registration.</p>
                <p>Your verification code is: <strong>${req.user.activationCode}</strong></p>
                <p>Enter this code on the verification page to activate your account.</p>
            </div>
            <div class="footer">
                <p>If you did not sign up for this account, you can safely ignore this email.</p>
            </div>
        </div>
    </body>
    </html>
    `
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email: ', error);
    } else {
      console.log('Email sent smtp: ' + info.response);
      
    }
  });

  if (next) res.status(200).json({message: `Verification Email was sent to ${req.user.email}`});
  else return;
};



export { sendVerificationEmail};