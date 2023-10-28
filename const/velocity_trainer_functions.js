import VelocityTrainerUser from "../schemas/velocity_trainer_schema.js";

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
export async function InsertVelocityTrainerRegistrationData(usedCollection, user_email, user_firstName, user_lastName, user_userName, user_password) {
    const user = new VelocityTrainerUser({
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