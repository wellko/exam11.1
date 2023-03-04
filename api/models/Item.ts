import mongoose, {Types} from "mongoose";
import {Item} from "../types";
import User from "./User";
import Category from "./Category";

const Schema = mongoose.Schema;
const ItemSchema = new Schema<Item>({
    title: {
        type: String,
        required: true
    },
    description: {
        required: true,
        type: String,
    },
    price: {
        type: Number,
        min: [1, 'Must be at least 1or more']
    },
    image: {
        required: true,
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Category.findById(value),
            message: 'Category not found!',
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User not found!',
        }
    }
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;