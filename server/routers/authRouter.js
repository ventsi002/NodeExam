import { Router, json } from "express"
const router = Router()
import nodemailer from "nodemailer";

import crypto from "crypto"
import db from "../databases/connection.js"

const cypherKey = crypto.createHash('sha256').update('ShoesKey').digest()
const initVector = "a2xhcgAAAAAAAAAA"
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', cypherKey, initVector)
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final("hex");
    return crypted
}

export function decrypt(text) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', cypherKey, initVector)
    let dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final("utf-8");
    return dec;
}

router.post("/auth/signup", async (req, res) => {
    const userFound = await db.get("SELECT * FROM users WHERE username = ?", [req.body.username])
    if (userFound) {
        return res.status(400).send({ message: "User exists" })
    }

    if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.address) {
        return res.status(400).send({ message: "Form not completed" });
    }
    const password = encrypt(req.body.password);
    await db.run("INSERT INTO users(username, password, firstName, lastName, email, address, role) VALUES (?, ?, ?, ?, ?, ?, 1);", [req.body.username, password, req.body.firstName, req.body.lastName, req.body.email, req.body.address]);
    res.send({ message: "User created successfully" });
});

router.put("/role", async (req, res) => {
    await db.all("UPDATE users SET role = ?", [req.body.role])
    res.send({ message: "User role updated successfully" });
});

router.post("/auth/login", async (req, res) => {
    const userFound = await db.get("SELECT * FROM users WHERE username = ?", [req.body.username])
    if (userFound) {
        const passwordsMatch = req.body.password === decrypt(userFound.password)
        if (passwordsMatch) {
            const role = await db.get("SELECT roles.role FROM roles JOIN users ON users.role = roles.id WHERE users.username = ?", [req.body.username]);
            req.session.username = userFound.username;
            req.session.role = role.role;
            res.send(role);
        }
        else {
            res.status(400).send({ message: "Wrong password!" })
        }
    }
    else {
        res.status(400).send({ message: "No user with this username or password" })
    }
})

router.get("/auth/logout", (req, res) => {
    req.session.destroy()
    res.status(200).send({ message: "See you soon" })
})


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