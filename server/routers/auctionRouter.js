import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";

router.get("/auctions", async (req, res) => {
    const auction = await db.all("SELECT * FROM auction");
    res.send({ auction });
    console.log(auction);
});

router.get("/auctions/:id", async (req, res) => {
    id = req.params.id
    const shoes = await db.all("SELECT * FROM shoes WHERE forAuction = 1 AND id = ?", [id]);
    res.send({ shoes });
    console.log(shoes);
});

router.post("/auctions", async (req, res) => {
    if (!req.body.brand || !req.body.name || !req.body.model || !req.body.colorway || !req.body.quantity || !req.body.size || !req.body.price) {
        return res.status(400).send({ message: "Missing inforamtion" });
    }
    await db.run("INSERT INTO shoes(brand, name, model, colorway, quantity, size, price, forAuction) VALUES (?, ?, ?, ?, ?, ?, ?, 1)", [req.body.brand, req.body.name, req.body.model, req.body.colorway, req.body.quantity, req.body.size, req.body.price]);
    const result = await db.run("INSERT INTO auction(description, bid, endDate) VALUES(?, ?, ?)", [req.body.description, req.body.bid, req.body.endDate])
    const auctionID = result.lastID;
    await db.run("INSERT INTO auction_item(model, forAuction, size, auctioneer, auctionID) VALUES(?, 1, ?, ?, ?)", [req.body.model, req.body.size, req.body.username, auctionID])
    res.send({ message: "Shoe added successfully" });
});

router.put("/auctions/:id", async (req, res) => {
    const updateID = req.params.id;
    await db.all("UPDATE auction SET bid = ?, bidUser = ? WHERE id = ?", [req.body.bid, req.body.bidUser, updateID]);
    res.send({ message: "Shoe updated successfully" });
});

router.delete("/auctions/:id", async (req, res) => {
    const updateID = req.params.id;
    await db.all("DELETE FROM auctions WHERE id = ?", [updateID]);
    res.send({ message: "Shoe deleted successfully" });
});

export default router;