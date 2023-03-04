import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../multer";
import Item from "../models/Item";

const itemsRouter = express.Router();

itemsRouter.post('/', imagesUpload.single('image'), auth, async (req, res) => {
    const user = (req as RequestWithUser).user;
    const ItemData = {
        image: req.file ? req.file.filename : null,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        user: user._id,
        price: parseInt(req.body.price)
    }
    const item = new Item(ItemData);
    try {
        await item.save();
        return res.send(item);
    } catch (error) {
        return res.status(400).send(error);
    }
})

itemsRouter.get('/:id', async (req, res) => {
    try {
        const items = await Item.find({_id: req.params.id}).populate('user', 'displayName phoneNumber')
        return res.send(items);
    } catch {
        return res.sendStatus(500);
    }
})

itemsRouter.get('/', async (req, res) => {
    const queryCategory = req.query.category as string;
    let findParams = {};
    if (queryCategory) {
        findParams = {category: queryCategory};
    }

    try {
        const items = await Item.find(findParams);
        return res.send(items);
    } catch {
        return res.sendStatus(500);
    }
})

itemsRouter.delete('/:id', auth, async (req, res) => {
    const user = (req as RequestWithUser).user;
    try {
        const item = await Item.findOne({_id: req.params.id}) as Item
        if (item.user.toString() === user._id.toString()){
            await Item.deleteOne(item);
            return res.send(item);
        }
        return res.status(403).send({error: "no permission"})
    }catch {
        return res.sendStatus(500);
    }
});

export default itemsRouter;