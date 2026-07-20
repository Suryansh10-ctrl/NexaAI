import dotenv from "dotenv";
dotenv.config();


import { google } from "googleapis";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
service: "gmail",
auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

    transporter.verify()
    .then(() => {console.log("Email tranporter ready to send emails")})
    .catch((err) => {
        console.log(err.message)
    })

export async function sendEmail({ to, subject, html, text }) {



    const info = await transporter.sendMail({
        from: process.env.GOOGLE_USER,
        to,
        subject,
        text,
        html,
    });

    console.log(info)
}