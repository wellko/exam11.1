import express from "express";
import Category from "../models/Category";

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        return res.send(categories);
    } catch {
        return res.sendStatus(500);
    }
})

export default categoriesRouter;