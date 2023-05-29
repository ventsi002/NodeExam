import { Router } from "express";
const router = Router();
import db from "../databases/connection.js";
import multer from "multer";
import path from "path";

router.get("/shoes", async (req, res) => {
    const shoes = await db.all("SELECT * FROM photos INNER JOIN shoes ON shoes.id = photos.shoeID WHERE shoes.forAuction = 0 GROUP BY shoes.id");
    res.send( shoes );
});

router.get("/shoes/:id", async (req, res) => {
    const id = req.params.id
    const model = req.query.model
    const shoe = await db.get("SELECT * FROM shoes WHERE shoes.id = ? LIMIT 1", [id]);
    const sizes = await db.all("SELECT id, size, quantity FROM shoes WHERE forAuction = 0 AND model = ?", [model]);
    const photos = await db.all("SELECT photoLocation FROM photos WHERE forAuction = 0 AND shoeID = ? GROUP BY photos.photoLocation", [id]);
    res.send({ shoe, sizes, photos });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../client/public/images/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage })

router.post("/shoes", upload.array('file'), async (req, res) => {
    if (!req.body.brand || !req.body.name || !req.body.model || !req.body.colorway || !req.body.quantity || !req.body.size || !req.body.price) {
        return res.status(400).send({ message: "Missing inforamtion" })
    }
    const sizes = req.body.size.split(", ")
    let id;
    for(const size of sizes)
    {
        const result = await db.run("INSERT INTO shoes(brand, name, model, colorway, quantity, size, price, forAuction) VALUES (?, ?, ?, ?, ?, ?, ?, 0)", [req.body.brand, req.body.name, req.body.model, req.body.colorway, req.body.quantity, size, req.body.price]) 
        id = result.lastID
    }    
    for(const file of req.files)
    {
        await db.run("INSERT INTO photos(shoeID, forAuction, photoLocation) VALUES (?, 0, ?)", [id, file.path]) 
    }
    
    res.send({ message: "Shoe added successfully" });
});

router.put("/shoes/:id", async (req, res) => {
    const updateModel = req.params.id;
    await db.run("UPDATE shoes SET brand = ?, name = ?, model = ?, colorway = ?, quantity = ?, price = ? WHERE id = ? AND forAuction = 0", [req.body.brand, req.body.name, req.body.model, req.body.colorway, req.body.quantity, req.body.price, updateModel, req.body.size]);
    res.send({ message: "Shoe updated successfully" });
});

router.delete("/shoes/:id", async (req, res) => {
    const updateModel = req.params.id;
    await db.all("DELETE FROM shoes WHERE id = ? AND forAuction = 0", [updateModel]);
    res.send({ message: "Shoe deleted successfully" });
});

router.post("/orders", async (req,res) =>
{
    console.log(req.body);
    await db.run("INSERT INTO orders(username, shoeID, status) VALUES (?, ?, 'Pending')", [req.body.username, req.body.id])
    res.send({message: "created order"})
})

router.get("/orders", async(req, res) =>
{
    const orders = await db.all("SELECT * FROM orders INNER JOIN shoes ON orders.shoeID = shoes.id")
    res.send( orders )
})

router.get("/orders/:username", async (req,res) =>
{
    const username = req.params.username
    const orders = await db.all("SELECT * FROM orders INNER JOIN shoes ON orders.shoeID = shoes.id WHERE username = ?", [username])
    res.send(orders)
})

router.put("/orders/:id", async (req,res) =>
{
    const id = req.params.id
    await db.run("UPDATE orders SET status = ? WHERE id = ?", [req.body.status, id])
    res.send({message: "Order status updated to " + req.body.status})
})

export default router;