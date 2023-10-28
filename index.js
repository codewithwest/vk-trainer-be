import express, { json, urlencoded } from "express";
import path, { dirname, join, resolve } from "path";
import cookieParser from "cookie-parser";
import sessions from 'express-session';
import fs from 'fs';
import dotenv from "dotenv"
import { db_connection, live_url, local_url } from './auth/connection.js'
import { fileURLToPath } from "url";
import { AddUserPost, InsertRegistrationData } from "./const/functions.js";
import bodyParser from "body-parser";
import MongoStore from "connect-mongo";
import pkg from 'cors';
var cors = pkg;
// import { e } from "cors";
import { name } from "ejs";
import { Console } from "console";
import { get_db_connection, velocity_knight_trainer_routes } from "./routes/velocty_knight_trainer_routes.js";
// const router = (global.router = (express.Router()));

dotenv.config()
const app = express()
// const router = express.Router()
// var session
const PORT = process.env.PORT;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
const oneHour = 1000 * 60 * 60
app.set('trust proxy', 1)
//
// app.use(express.bodyParser());
app.use(cors());
//session middleware
app.use(sessions({
    secret: "KazenoyōnihayakuMorinoyōnishizukaHinoyōniseifukushitekudasaiYamanoyōnianteifhrgfgrfrty84fwir767",
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: oneHour
    },
    store: MongoStore.create({
        mongoUrl: live_url,
        ttl: 14 * 24 * 60 * 60,
        autoRemove: 'native'
    }),//YOUR MONGODB URL
    resave: false,
    httpOnly: false
}));



// Session Checker
// Get the folder full url
const __filename = fileURLToPath(import.meta.url)
// Assign in to __dirname
const __dirname = dirname(__filename)
app.use(bodyParser.json())
app.set('view engine', 'ejs');
// parsing the incoming data
app.use(express.json());
app.use(urlencoded({ extended: true }));


//serving public file
// app.use("/static", express.static(path.join(__dirname, "client", "static")));
// app.use(express.static(path.join(__dirname, "client", "static", "css")));

// cookie parser middleware
// a
app.use("/", express.static(join(__dirname)));

app.use(cookieParser());
// var session;


// app.get('/user/account/delete', async (req, res) => {
//     const user = await myCollection.findOneAndDelete({ username: req.session.userid });
//     req.session.destroy()
//     res.redirect('/')
// });
// app.post('/auth/login', async (req, res) => {
//
// });


// app.post('/user/post', async (req, res) => {
//     const { post_index, post_user_name, post_body, post_date } = req.body
//     if (!(post_index, post_user_name, post_body)) req.sendStatus(400)
//     else {
//         await AddUserPost(myCollection, post_user_name, post_body)
//         res.sendStatus(200)
//     }
// })
// app.post('/user/index/post', async (req, res) => {
//     const { post_user_name } = req.body
//     const users_posts = await myCollection.find().toArray()
//     let allPosts = []
//     users_posts.forEach((e) => {
//         allPosts.push(e.posts)
//     })
//     res.send(allPosts)
// })

// app.post('/user/current/theme', (req, res) => {
//     const { dark_theme } = req.body
//     req.session.theme = dark_theme
//     console.log(req.session.theme)
//     res.send(req.session.theme)

// })
// app.get('/user/current/theme', (req, res) => {
//     if (req.session.theme) res.send(req.session.theme)
//     else res.send(!req.session.theme)
// })

// app.post('/user/current/posts', async (req, res) => {
//     if (req.session.userid) {
//         const { post_get_by_user } = req.body
//         const user_posts = await myCollection.findOne({ username: post_get_by_user })
//         res.send(user_posts.posts)
//     }
// })

app.use(velocity_knight_trainer_routes)


app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`)
});

async function main() {
    // Get The Data from the database
    // const collectionData = await myCollection.find().toArray()
    // Register User data into database
    // }
    // await InsertRegistrationData(myCollection, 'babe@gmail.com', 'Babe', 'West', 'babe', 'West1327')
    // console.log(await LoginData(myCollection, 'west@gmail.com'))
    // DeleteUserData(myCollection, 'babe@gmail.com')
    // AddUserPost(myCollection, 'jonas', "Hey You")
    // IncrementPostLikes(myCollection, "Hey You")
    // IncrementPostDisLikes(myCollection, "Hey You")
    // DeleteUserPost(myCollection, 'west@gmail.com','I love  babe')
    // AddPostComment(myCollection, 'Hey you')
    // DeletePostComment(myCollection, 'I love you')
    // IncrementCommentLikes(myCollection, 'I love you')
    // console.log(myCollection.find({posts:{"user_post.comments":{likes}}}).toArray())
    // main().catch(console.error);
}
// app.get('/theme', (req, res) => {
//     res.send({ theme: true });
// })
export default app;