const nodemailer = require('nodemailer');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jayson.lubowitz@ethereal.email',
        pass: 'wXgGEFNaXztUyRfsRy'
    }
});

async function sendEmail(name, email, message) {
    try {
        const info = await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: "adnanmuhammad4393@gmail.com, cyberkozhi0@gmail.com",
            subject: "New Contact Form Submission",
            text: message,
            html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`,
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error('Failed to send email');
    }
}

module.exports = { sendEmail };
