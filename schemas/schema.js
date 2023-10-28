// Call the required module
import { Schema as _Schema, model } from 'mongoose';
// Assign The Schema to match up with mongo

var Schema = _Schema;
// Define the schema
var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: { type: String },
    posts: []
},
    { timestamps: true })
// Assign the schema to const variable  
var User = model('users', userSchema);
// Export the Schema
export default User;
