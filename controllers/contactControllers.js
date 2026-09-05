const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).send("Invalid email address");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Contact form submission from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
  `,
    };

    await transporter.sendMail(mailOptions);

    res.send(
      `Email sent successfully by ${name}, from ${email}, with message: ${message}`,
    );
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
};
