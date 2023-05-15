import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/shoes", async (req, res) => {
    const shoes = await db.all("SELECT * FROM shoes");
    res.send({ shoes });
    console.log(shoes);
});

router.post("/shoes", async (req, res) => {
    if (!req.body.brand || !req.body.name || !req.body.model || !req.body.colorway || !req.body.quantity || !req.body.size || !req.body.price) {
        return res.status(400).send({ message: "Missing inforamtion" });
    }
    await db.run("INSERT INTO shoes(brand, name, model, colorway, quantity, size, price, forAuction) VALUES (?, ?, ?, ?, ?, ?, ?, 0)", [req.body.brand, req.body.name, req.body.model, req.body.colorway, req.body.quantity, req.body.size, req.body.price]);
    res.send({ message: "Shoe added successfully" });
});

router.put("/shoes/:model", async (req, res) => {
    const updateModel = req.params.model;
    await db.all("UPDATE shoes SET brand = ?, name = ?, model = ?, colorway = ?, quantity = ?, size = ?, price = ? WHERE model = ?", [req.body.brand, req.body.name, req.body.model, req.body.colorway, req.body.quantity, req.body.size, req.body.price, updateModel]);
    res.send({ message: "Shoe updated successfully" });
});

router.delete("/shoes/:model", async (req, res) => {
    const updateModel = req.params.model;
    await db.all("DELETE FROM shoes WHERE model = ?", [updateModel]);
    res.send({ message: "Shoe deleted successfully" });
});

export default router;