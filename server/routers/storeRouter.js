import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";
import multer from "multer";
import path from "path";

router.get("/shoes", async (req, res) => {
    const shoes = await db.all("SELECT * FROM shoes WHERE forAuction = 0");
    res.send({ shoes });
    console.log(shoes);
});

router.get("/shoes/:model", async (req, res) => {
    const model = req.params.model
    const shoes = await db.all("SELECT * FROM shoes WHERE forAuction = 0 AND model = ?", [model]);
    res.send({ shoes });
    console.log(shoes);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../storeImages")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })

router.post("/shoes", upload.array('file'), async (req, res) => {
    if (!req.body.brand || !req.body.name || !req.body.model || !req.body.colorway || !req.body.quantity || !req.body.size || !req.body.price) {
        return res.status(400).send({ message: "Missing inforamtion" });
    }
    await db.run("INSERT INTO shoes(brand, name, model, colorway, quantity, size, price, forAuction) VALUES (?, ?, ?, ?, ?, ?, ?, 0)", [req.body.brand, req.body.name, req.body.model, req.body.colorway, req.body.quantity, req.body.size, req.body.price]);
    res.send({ message: "Shoe added successfully" });
});

router.put("/shoes/:model", async (req, res) => {
    const updateModel = req.params.model;
    await db.all("UPDATE shoes SET brand = ?, name = ?, model = ?, colorway = ?, quantity = ?, price = ? WHERE model = ? AND forAuction = 0 AND size = ?", [req.body.brand, req.body.name, req.body.model, req.body.colorway, req.body.quantity, req.body.price, updateModel, req.body.size]);
    res.send({ message: "Shoe updated successfully" });
});

router.delete("/shoes/:model", async (req, res) => {
    const updateModel = req.params.model;
    await db.all("DELETE FROM shoes WHERE model = ? AND forAuction = 0", [updateModel]);
    res.send({ message: "Shoe deleted successfully" });
});

export default router;