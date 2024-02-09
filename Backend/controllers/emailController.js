const nodemailer = require("nodemailer");

const config = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "litvakwebsite@gmail.com",
    pass: "qszkcvlqvfbhmwkb",
  },
};

const send = async (data) => {
  const transporter = nodemailer.createTransport(config);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return info.response;
    }
  });
};

const sendEmail = async (req, res) => {
  const { from, to, subject, text, html } = req.body;
  const data = { from, to, subject, text, html };

  const senderEmail = {
    from: to,
    to: from,
    subject: "We recieve Your Email",
    text: "The-Litvak-Team recieved your email, and we will get back to you soon!!! Thanks For reaching out to us...",
  };

  const sendEmail = await send(data);
  const senderEmails = await send(senderEmail);

  res.status(200).json({ status: true, sendEmail, senderEmails });
};

module.exports = { sendEmail };
