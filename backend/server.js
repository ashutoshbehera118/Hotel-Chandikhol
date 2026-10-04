const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

// Serve the Hotel Chandikhol frontend
app.use(express.static(path.join(__dirname, "..")));

// Create email transporter
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test email connection
transporter.verify((error, success) => {
    if (error) {
        console.error("Email configuration error:");
        console.error(error.message);
    } else {
        console.log("Email server is ready.");
    }
});

// Contact form API
app.post("/api/contact", async (req, res) => {

    try {

        const {
            name,
            phone,
            email,
            subject,
            message
        } = req.body;

        // Check required fields
        if (!name || !phone || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields."
            });
        }

        // Basic email validation
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        // Email sent to owner
        const mailOptions = {

            from: `"Hotel Chandikhol Website" <${process.env.EMAIL_USER}>`,

            to: process.env.OWNER_EMAIL,

            replyTo: email,

            subject:
                subject
                    ? `Hotel Chandikhol Contact: ${subject}`
                    : "New Contact Message - Hotel Chandikhol",

            text: `
New Contact Message
===================

Name: ${name}

Phone: ${phone}

Email: ${email}

Subject: ${subject || "Not provided"}

Message:
${message}

===================
Sent from Hotel Chandikhol website.
            `
        };

        await transporter.sendMail(mailOptions);

        console.log("Contact email sent from:", email);

        res.status(200).json({
            success: true,
            message:
                "Thank you! Your message has been sent successfully."
        });

    } catch (error) {

        console.error("Email sending error:");
        console.error(error);

        res.status(500).json({
            success: false,
            message:
                "Sorry, your message could not be sent. Please try again later."
        });
    }
});

// Start server
app.listen(PORT, () => {

    console.log("----------------------------------");
    console.log(`Hotel Chandikhol server running`);
    console.log(`http://localhost:${PORT}`);
    console.log("----------------------------------");

});