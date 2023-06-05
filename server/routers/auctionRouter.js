import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";
import multer from "multer";
import path from "path";


router.get("/auctions", async (req, res) => {
    const auction = await db.all("SELECT * FROM auction_items INNER JOIN shoes ON auction_items.shoeID = shoes.id INNER JOIN auctions ON auction_items.auctionID = auctions.id INNER JOIN photos ON shoes.id = photos.shoeID WHERE auctions.status = 'Active' GROUP BY shoes.id");
    res.send( auction );
});

router.get("/admin/auctions", async (req, res) => {
    const auction = await db.all("SELECT * FROM auction_items INNER JOIN shoes ON auction_items.shoeID = shoes.id INNER JOIN auctions ON auction_items.auctionID = auctions.id INNER JOIN photos ON shoes.id = photos.shoeID GROUP BY shoes.id ");
    res.send( auction );
});

router.get("auctioneer/auctions/:username/", async (req, res) => {
    const auctioneer = req.params.username
    const auction = await db.all("SELECT * FROM auction_items INNER JOIN shoes ON auction_items.shoeID = shoes.id INNER JOIN auctions ON auction_items.auctionID = auctions.id INNER JOIN photos ON shoes.id = photos.shoeID WHERE auctions.auctioneer = ? GROUP BY shoes.id ", [auctioneer]);
    res.send( auction );
});


router.get("/auctions/:id", async (req, res) => {
    const id = req.params.id
    const auction = await db.get("SELECT * FROM auctions INNER JOIN auction_items ON auction_items.auctionID = auctions.id INNER JOIN shoes ON auction_items.shoeID = shoes.id  WHERE auctions.id = ? GROUP BY shoes.id", [id]);
    console.log(auction);
    const photos = await db.all("SELECT photoLocation FROM photos WHERE shoeID = ?", auction.shoeID);
    res.send({ auction, photos });
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

router.post("/auctions", upload.array('file'), async (req, res) => {
    if (!req.body.brand || !req.body.name || !req.body.model || !req.body.colorway || !req.body.size) {
        return res.status(400).send({ message: "Missing inforamtion" });
    }
    const shoeResult = await db.run("INSERT INTO shoes(brand, name, model, colorway, quantity, size, forAuction) VALUES (?, ?, ?, ?, 1, ?, 1)", [req.body.brand, req.body.name, req.body.model, req.body.colorway, req.body.size]);
    const auctionResult = await db.run("INSERT INTO auctions(description, bid, endDate, status) VALUES(?, ?, ?, 'Awaiting Approval')", [req.body.description, req.body.bid, req.body.endDate])
    const shoeID = shoeResult.lastID
    const auctionID = auctionResult.lastID
    await db.run("INSERT INTO auction_items(shoeID, auctioneer, auctionID) VALUES(?, ?, ?)", [shoeID, req.body.username, auctionID])

    for(const file of req.files)
    {
        await db.run("INSERT INTO photos(shoeID, forAuction, photoLocation) VALUES (?, 1, ?)", [shoeID, file.path]) 
    }

    res.send({ message: "Auction created successfully" });
});

router.put("/auctions/:id", async (req, res) => {
    const updateID = req.params.id;
    const status = req.query.status
    if(!status)
    {
        await db.run("UPDATE auctions SET bid = ?, bidUser = ? WHERE id = ?", [req.body.bid, req.body.bidUser, updateID]);
    }
    else
    {   
        await db.run("UPDATE auctions SET status = ? WHERE id = ?", [status, updateID]);
    }
    res.send({ message: "Shoe updated successfully" });
});


router.delete("/auctions/:id", async (req, res) => {
    const updateID = req.params.id;
    await db.all("DELETE FROM auctions WHERE id = ?", [updateID]);
    res.send({ message: "Shoe deleted successfully" });
});

export default router;