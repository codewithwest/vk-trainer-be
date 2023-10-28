import express, { json, urlencoded } from "express";
import { db_connection, live_url, local_url } from "../auth/connection.js";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import { InsertVelocityTrainerRegistrationData } from "../const/velocity_trainer_functions.js";

const velocity_db = "velocity_trainer"
const velocity_collection = "velocity_data"
// Define router route
var velocity_knight_trainer_routes = express.Router()
// Connect to the database
var get_db_connection = new db_connection(live_url, velocity_db, velocity_collection)
// get the desired database collection
var target_db_connection = await get_db_connection.getCollection()
// Base route
// export { velocity_knight_trainer_routes }
velocity_knight_trainer_routes.get('/', async (req, res, next) => {
    let datalist = await get_db_connection.listDatabases()
    // let coll = await get_db_connection.collection('velocity_users').find().toArray()
    res.send({
        status: 'Active',
        response: 'We live but not Here /velocity_knight_trainer',
    })
})

velocity_knight_trainer_routes.get('/velocity_knight_trainer', async (req, res, next) => {
    // let datalist = await get_db_connection.listDatabases()
    // let coll = await get_db_connection.collection('velocity_users').find().toArray()
    res.send({
        status: 'Active',
        response: 'The server is in a healthy state On new Repo'
    })
})

velocity_knight_trainer_routes.post('/velocity_knight_trainer/register', async (req, res) => {
    try {
        console.table(req.body)
        const {
            reg_user_name,
            reg_email,
            reg_con_password } = req.body

        // check if user already exists
        const userEmail = await target_db_connection.findOne({ email: reg_email })
        const userName = await target_db_connection.findOne({ username: reg_user_name })
        if (userEmail && userName) return res.send({ failure: 'Username and email Exists Login Instead' })
        else if (userEmail) return res.send({ failure: 'Email Exists Login Instead' })
        else if (userName) return res.send({ failure: 'Username Exists Login Instead' })
        else {
            const encryptedPassword = await bcrypt.hash(reg_con_password, 15);
            await InsertVelocityTrainerRegistrationData(target_db_connection, reg_email, '', '', reg_user_name, encryptedPassword)
            res.send({ success: 'Account succefully created !! <br> Proceed To Login' })
        }
    }
    catch (error) { console.log(error) }
})
velocity_knight_trainer_routes.post('/velocity_knight_trainer/login', async (req, res, next) => {
    try {
        console.log(req.body)
        const { login_email, login_password } = req.body
        if (!(login_email && login_password)) res.send({ failure: "All input is required" })
        else {
            // Finds user email
            const user = await target_db_connection.findOne({ email: login_email });
            //    Sets user id to sesssion
            // Assigns user data to sessions
            if (user && (await bcrypt.compare(login_password, user.password))) {
                req.session.userid = user.username
                req.session.user = user
                jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
                    if (err) console.log(err)
                    else {
                        console.log(token)
                        res.json({ token: token })
                    }
                });
                // res.json({ token }) console.log(token) req.session.save()  console.log(req.session) res.send({ success: 'Login Successfull', token: token })
            } else {
                return res.send({ failure: 'Incorrect Email or Password' })
            }
        }
    } catch (err) { console.log(err) }
})

velocity_knight_trainer_routes.get('/velocity_knight_trainer/update', (req, res) => {
    //verify the JWT token generated for the user
    try {
        const {
            rupdate_username,
            update_email,
            fullName } = req.body

    }
    catch (error) { console.log(error) }


});


const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];
    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.send({ 403: 'Forbidden' })
    }
}

velocity_knight_trainer_routes.get('/velocity_knight_trainer/data', checkToken, (req, res) => {
    //verify the JWT token generated for the user
    console.log(req.token)
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.send({ 403: 'Forbidden' });
        } else {
            //If token is successfully verified, we can send the autorized data 
            res.json({
                message: 'Successful log in',
                authorizedData
            });
            console.log('success: Connected to protected route');
        }
    })
});

export { velocity_knight_trainer_routes, get_db_connection }