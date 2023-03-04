import mongoose, {HydratedDocument} from "mongoose";
import {CategoryType} from "../types";

const Schema = mongoose.Schema;
const CategorySchema = new Schema<CategoryType>({
    name: {
        type: String,
        validate: {
            validator: async function (this: HydratedDocument<CategoryType>, name: string): Promise<boolean> {
                if (!this.isModified('username')) return true;
                const category: HydratedDocument<CategoryType> | null = await Category.findOne({name});
                return !Boolean(category);
            }
    }
}});

const Category = mongoose.model('Category', CategorySchema);

export default Category;