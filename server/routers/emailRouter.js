import { Router } from "express";
import nodemailer from "nodemailer";
import db from "../databases/connection.js";
import crypto from "crypto"
const router = Router();


router.post('/contact', async (req, res) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: "ventsi_mandatory@outlook.com",
            pass: "mandatory123",
        },
    });

    let info = await transporter.sendMail({
        from: `<${req.body.email}>`,
        to: 'CEO <ventsi_mandatory@outlook.com>',
        subject: `${req.body.subject}`,
        text: `${req.body.text}`,
    })

    res.status(200).send();
});


const cypherKey = crypto.createHash('sha256').update('ShoesKey').digest()
const initVector = "a2xhcgAAAAAAAAAA"

export function decrypt(text) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', cypherKey, initVector)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final("utf-8");
    return dec;
}

router.post('/forgotPass', async (req, res) => {
    try {

        let transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secure: false,
            auth: {
                user: "dannymandatorytwo@outlook.com",
                pass: "PasswordForMandatory",
            },
        });

        const userFound = await db.get("SELECT * FROM users WHERE email = ?", [req.body.email])

        let info = await transporter.sendMail({
            from: "Mandatory2 Support <dannymandatorytwo@outlook.com>",
            to: `<${req.body.email}>`,
            subject: "Forgotten password",
            text: `Your forgotten password is: ${decrypt(userFound.password)}`,
        });
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.status(200).send();
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
});

export default router