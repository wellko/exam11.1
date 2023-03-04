import mongoose from "mongoose";
import config from "./config";
import Category from "./models/Category";
import User from "./models/User";
import Item from "./models/Item";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    try {
        await db.dropCollection('categories');
        await db.dropCollection('users');
        await db.dropCollection('items');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [cat1, cat2, cat3, cat4] = await Category.create({
            name: "Drinks",
        }, {
            name: "Food",
        },
        {
            name: "Clothes",
        },
        {
            name: "Furniture",
        },);

    const [user1, user2] = await User.create({
        password: "123",
        token: "sometoken",
        username: "Lesha",
        displayName: "Aleksey I",
        phoneNumber: "556565656"
    }, {
        password: "123",
        token: "sometoken12",
        username: "Vasya",
        displayName: "Vasiliy v",
        phoneNumber: "558585858"
    });

    await Item.create(
        {
            title: 'Carrot',
            description: "Very tasty and fresh",
            price: 100,
            image: "images/2f8b9e0c-03d8-4478-94ee-fc478c2674e8.jpeg",
            category: cat2._id,
            user: user1._id,
        },
    {
        title: 'pepper',
            description: "Very hot by carefull",
        price: 120,
        image: "images/fab0eb0f-92c0-4532-a66a-ca52754a352c.jpg",
        category: cat2._id,
        user: user1._id,
    },
    {
        title: 'Ice cream',
        description: "Very tasty",
        price: 50,
        image: "images/230a25d1-0679-4fc0-9e33-6ab6b29bed15.jpeg",
        category: cat2._id,
        user: user2._id,
    },
        {
            title: 'Coca-Cola',
            description: "so cold and nice",
            price: 102,
            image: "images/86aae441-e848-4d5c-8a5c-282355f90f84.jpeg",
            category: cat1._id,
            user: user1._id,
        },
        {
            title: "Fanta",
            description: "like real orange",
            price: 100,
            image: "images/fdbbb9de-080a-448e-a515-fc0a2cc121ba.jpeg",
            category: cat1._id,
            user: user1._id,
        },
        {
            title: "chair",
            description: "got it from my grandpa",
            price: 600,
            image: "images/c67cdaa0-0220-4871-855e-e86055292491.jpg",
            category: cat4._id,
            user: user2._id,
        },
        {
            title: "jacket",
            description: "second-hand like new",
            price: 1800,
            image: "images/2e8d3f1a-c54b-47a0-a34b-28ba4ecf6b9c.jpeg",
            category: cat3._id,
            user: user1._id,
        }

    )
    await db.close();
};

run().catch(console.error);