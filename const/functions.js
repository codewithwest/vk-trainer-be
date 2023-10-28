import User from "../schemas/schema.js";

/**
 * 
 * @param {MongoDbCollection} usedCollection  collection connected to from the database
 * @param {String} user_email email used to look up the object in the collection
 * @param {String} user_firstName takes in the users first name
 * @param {String} user_lastName takes in the users last name
 * @param {String} user_userName email used to look up the object in the collection
 * @param {String} user_password email used to look up the object in the collection
 * @returns return User Data Schema in object format {}
 */
export async function InsertRegistrationData(usedCollection, user_email, user_firstName, user_lastName, user_userName, user_password) {
    const user = new User({
        email: user_email,
        fullName: user_firstName + " " + user_lastName,
        username: user_userName,
        password: user_password,

    });
    // console.log(user)
    let checkEmail = await usedCollection.find({ email: user.email }).toArray()
    if (checkEmail.length == 1) {
        //  If User Email Exist return the exits message to /Register
        console.log('Exists')
        return user
    } else if (checkEmail.length > 1) {
        for (let obj in checkEmail) {
            if (obj > 0) {
                await usedCollection.deleteOne(checkEmail[obj])
            }
        }
        console.log('Done Deleting Duplicates')
    } else {
        // Re-Route to /Login 
        await usedCollection.insertOne(user)
        console.log(user)
        return user
    }

}
/**
 * 
 * @param {MongoDbCollection} usedCollection  collection connected to from the database
 * @param {String} user_email email used to look up the object in the collection
 * @returns return User Data Schema in object format {}
 */
export async function LoginData(usedCollection, user_email) {
    // console.log(user)
    let checkEmail = await usedCollection.find({ email: user_email }).toArray()
    if (checkEmail.length > 0) {
        return checkEmail[0]
    }
    return false
}
/**
 * 
 * @param {MongoDbCollection} usedCollection  collection connected to from the database
 * @param {String} user_email email used to look up the object in the collection
 * 
 * Finds the object in the collection and deletes it
 */
export async function DeleteUserData(usedCollection, user_email) {
    let checkEmail = await usedCollection.find({ email: user_email }).toArray()
    for (let obj in checkEmail) {
        await usedCollection.deleteOne(checkEmail[obj])
        checkEmail.pop()

    }
    return checkEmail
}
/**
 * 
 * @param {MongoDbCollection} usedCollection collection connected to from the database
 * @param {String} user_name username used to look up the object in the collection
 * @param {String} user_post adds post to the the post list with the matching email
 
*/
export async function AddUserPost(usedCollection, user_name, user_post) {
    var myQuery = { username: user_name }
    // Post to Add
    var newValues = {
        $addToSet: { "posts": { "user_post": user_post, likes: 0, dislikes: 0, comments: [] } },
    }
    await usedCollection.updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");

    });
    var posted = await usedCollection.findOne(myQuery)

    return posted.posts[0]
}
/**
 * 
 * @param {MongoDbCollection} collection connected to from the database
 * @param {String} user_post post to increment likes on used to look up the object in the collection
 * 
 * Uses the given post value to increment the likes on the post
 */
export async function IncrementPostLikes(usedCollection, user_post) {
    var myQuery = { "posts.user_post": user_post }

    // Post to Add
    var newValues = { $inc: { "posts.$.likes": 1 } }
    // false , 
    // true
    await usedCollection.updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
    var postedLikes = await usedCollection.find(myQuery).toArray()

    return postedLikes[0].posts[0]
}
/**
 * 
 * @param {MongoDbCollection} collection connected to from the database
 * @param {String} user_post post to decrement likes on used to look up the object in the collection
 * 
 * Uses the given post value to decrement the likes on the post
 */
export async function IncrementPostDisLikes(usedCollection, user_post) {
    var myQuery = { "posts.user_post": user_post }
    // Post to Add
    var newValues = { $inc: { "posts.$.dislikes": 1 } }
    await usedCollection.updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
    var postedDislikes = await usedCollection.find(myQuery).toArray()


    return postedDislikes[0].posts[0]
}
/**
 * 
 * @param {MongoDbCollection} usedCollection collection connected to from the database
 * @param {String} user_email email used to look up the object in the collection
 * @param {String} user_post deletes post to the the post list with the matching email
 */
export async function DeleteUserPost(usedCollection, user_email, user_post) {
    var myQuery = { email: user_email };
    // Post to Add
    var newValues = { $pull: { posts: { user_post: user_post } } };
    await usedCollection.updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        console.log("1 post deleted");
        db.close();
    });

}
export async function AddPostComment(usedCollection, user_post) {
    var myQuery = { "posts.user_post": user_post };
    // Post to Add
    var newValues = {
        $addToSet: { "posts.$.comments": { "comment": user_post, likes: 0, dislikes: 0,/*comments:[]*/ } },

    }
    await usedCollection.updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
    var commentPost = await usedCollection.find(myQuery).toArray()


    return commentPost[0].posts[0].comments[0]
}
export async function DeletePostComment(usedCollection, user_post) {
    var myQuery = { "posts.user_post": user_post };
    // Post to Add
    var newValues = {
        $pull: { "posts.$.comments": { "comment": user_post, likes: 0, dislikes: 0,/*comments:[]*/ } },
    }
    await usedCollection.updateOne(myQuery, newValues, (err, res) => {
        if (err) throw err;
        console.log(res);
        db.close();
    });
}
/**
 * 
 * @param {MongoDbCollection} collection connected to from the database
 * @param {String} user_post post to increment likes on used to look up the object in the collection
 * 
 * Uses the given post value to increment the likes on the post
 */
export async function IncrementCommentLikes(usedCollection, user_post) {
    var myQuery = { "posts.comments.comment": user_post }
    console.log(await usedCollection.find(myQuery).toArray())
    // Post to Add
    var newValues = { $inc: { "posts.comments.$.likes": 1 } }
    await usedCollection.updateOne(myQuery, newValues, false, true, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
}
/**
 * 
 * @param {MongoDbCollection} collection connected to from the database
 * @param {String} user_post post to decrement likes on used to look up the object in the collection
 * 
 * Uses the given post value to decrement the likes on the post
 */
export async function IncrementCommentDisLikes(usedCollection, user_post) {
    var myQuery = { "posts.user_post": user_post }
    // Post to Add
    var newValues = { $inc: { "posts.$.dislikes": 1 } }
    await usedCollection.updateOne(myQuery, newValues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
}
