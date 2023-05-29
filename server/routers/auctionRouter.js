import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";
import multer from "multer";
import path from "path";


router.get("/auctions", async (req, res) => {
    const auction = await db.all("SELECT * FROM auction_items INNER JOIN shoes ON auction_items.shoeID = shoes.id");
    res.send( auction );
    console.log(auction);
});

router.get("/auctions/:id", async (req, res) => {
    id = req.params.id
    const shoes = await db.all("SELECT * FROM shoes WHERE forAuction = 1 AND id = ?", [id]);
    res.send({ shoes });
    //console.log(shoes);
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/auction-images/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })

router.post("/auctions", async (req, res) => {
    if (!req.body.brand || !req.body.name || !req.body.model || !req.body.colorway || !req.body.quantity || !req.body.size || !req.body.price) {
        return res.status(400).send({ message: "Missing inforamtion" });
    }
    const shoeResult = await db.run("INSERT INTO shoes(brand, name, model, colorway, quantity, size, price, forAuction) VALUES (?, ?, ?, ?, ?, ?, ?, 1)", [req.body.brand, req.body.name, req.body.model, req.body.colorway, req.body.quantity, req.body.size, req.body.price]);
    const auctionResult = await db.run("INSERT INTO auction(description, bid, endDate) VALUES(?, ?, ?)", [req.body.description, req.body.bid, req.body.endDate])
    const shoeID = shoeResult.lastID
    const auctionID = auctionResult.lastID
    await db.run("INSERT INTO auction_item(shoeID, auctioneer, auctionID) VALUES(?, ?, ?)", [shoeID, req.body.username, auctionID])

    for(const file of req.files)
    {
        await db.run("INSERT INTO photos(shoeID, forAuction, photoLocation) VALUES (?, 0, ?)", [shoeID, file.path]) 
    }

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