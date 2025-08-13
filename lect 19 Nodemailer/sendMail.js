const env = require('dotenv');
env.config();
const nodemailer = require('nodemailer');

const sendMail = async (req, res) => {
//   let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  let info = await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: "vijitverma78@gmail.com",
    subject: "NodeMailer Demo",
    text: "Hello, this is a stylish NodeMailer demo email!",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Node Mailer Demo</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background-color: #4a90e2;
            padding: 20px;
            text-align: center;
            color: white;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px;
            text-align: center;
          }
          .content h2 {
            font-size: 20px;
            color: #333;
          }
          .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #666;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            margin: 20px 0;
            background-color: #4a90e2;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
          }
          .button:hover {
            background-color: #357abd;
          }
          .footer {
            background-color: #f4f4f4;
            padding: 15px;
            text-align: center;
            font-size: 14px;
            color: #999;
          }
          @media only screen and (max-width: 600px) {
            .container {
              width: 100%;
              margin: 10px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NodeMailer Demo</h1>
          </div>
          <div class="content">
            <h2>Welcome to Our Demo</h2>
            <p>This is a stylish email template created for the NodeMailer demo. It features a clean design with a responsive layout, perfect for professional communication.</p>
            <a href="https://example.com" class="button">Learn More</a>
          </div>
          <div class="footer">
            <p>&copy; 2025 NodeMailer Demo. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  });

  console.log("Message sent: ", info.messageId);
  res.json(info);
};

module.exports = sendMail;