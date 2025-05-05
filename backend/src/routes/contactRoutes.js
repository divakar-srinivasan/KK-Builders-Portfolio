const express = require('express');
const nodemailer = require('nodemailer');
const config = require('../config/dotenv');
const router = express.Router();

const sendAdminEmail = (formData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.emailUser,
          pass: config.emailPass,
        },
    });

    const mailOptions = {
        from: config.emailUser,
        to: config.emailUser,
        replyTo: formData.email,
        subject: 'New Construction Inquiry - KK Builder, Erode',
        text: `🏗️ New Construction Inquiry Received!

                  Hello KK Builder Team,

                  You have a new opportunity to build someone's dream! Here's the client's information:

                  👤 Name: ${formData.name}
                  📧 Email: ${formData.email}
                  📞 Phone: ${formData.phone}
                  📍 Location: ${formData.location}
                  🏢 Construction Type: ${formData.constructionType}
                  📐 Project Size: ${formData.projectSize}
                  💰 Estimated Budget: ${formData.budget}
                  ⏳ Expected Timeline: ${formData.timeline}
                  📝 Additional Queries: ${formData.additionalQueries}
                  📣 Heard About Us From: ${formData.howDidYouHearAboutUs}

                  ⛏️ Reminder: Every inquiry is a new foundation for a lasting relationship.
                  Kindly connect with them at the earliest!

                  🏡 "At KK Builder, we don't just construct buildings, we create dreams in concrete."

                  Warm regards,  
                  Team KK Builder, Erode`
    };

    return transporter.sendMail(mailOptions);
};

const sendConfirmationEmail = (formData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.emailUser,
          pass: config.emailPass,
        },
    });

    const mailOptions = {
        from: config.emailUser,
        to: formData.email,
        subject: 'Thank You for Contacting KK Builder, Erode!',
        text: `🏡 Thank You for Choosing KK Builder, Erode!

Hello ${formData.name},

Greetings from KK Builder, Erode! 🏗️✨
We are thrilled to receive your inquiry. Your trust in us is the first brick in building something amazing together!

---

Here’s a summary of your request:

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📞 Phone: ${formData.phone}
📍 Location: ${formData.location}
🏢 Construction Type: ${formData.constructionType}
📐 Project Size: ${formData.projectSize}
💰 Budget: ${formData.budget}
⏳ Timeline: ${formData.timeline}
📝 Additional Queries: ${formData.additionalQueries}
📣 Heard About Us From: ${formData.howDidYouHearAboutUs}

---

🏆 Why KK Builder, Erode?
- 20+ Years of Trusted Excellence in Construction 🛠️
- Custom Residential & Commercial Projects 🏘️🏢
- Skilled Engineers & Modern Technology 🔧
- Transparent Process, Competitive Pricing 💬
- 100% Client Satisfaction Guarantee ✅

"From Blueprint to Reality — We Build Your Dreams!" 🏡✨

We will review your requirements and our expert team will reach out to you shortly.
Meanwhile, if you have any immediate questions, feel free to reply to this email.

---

🔗 Stay Connected:
📞 Phone: [Your company phone]
🌐 Website: [Your company website]
📍 Visit Us: Erode, Tamil Nadu

Thank you once again for choosing KK Builder, where Dreams are Designed, Built, and Delivered.

Best regards,  
Team KK Builder, Erode  
🏗️ Building Dreams, One Brick at a Time!`
    };

    return transporter.sendMail(mailOptions);
};

router.post('/send-email', async (req, res) => {
  try {
    const formData = req.body;

    await sendAdminEmail(formData);
    await sendConfirmationEmail(formData);

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email. Please try again later.' });
  }
});

module.exports = router;
