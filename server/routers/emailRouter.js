import { Router } from "express";
import nodemailer from "nodemailer";
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
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Send a response to the client
    res.status(200).send();
});

router.post('/forgotPass', async (req, res) => {
    try {
        //let testAccount = await nodemailer.createTestAccount();

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