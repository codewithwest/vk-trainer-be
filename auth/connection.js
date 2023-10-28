
import mongodb from 'mongodb'
const { MongoClient } = mongodb
// import { mongoose } from "mongoose";

import * as dotenv from 'dotenv';
dotenv.config();

const live_url = process.env.MONGO_DB_LIVE_URL
const local_url = process.env.MONGO_DB_LOCAL_URL

class db_connection {
    constructor(db_url, db_target, db_collection) {
        this.db_url = db_url
        this.db_target = db_target
        this.db_collection = db_collection
    }


    async connectDB() {
        console.log('This is the db url: ' + this.db_url)
        let client = new MongoClient(this.db_url)
        await client.connect()
        return client

    }

    async listDatabases() {
        let client = await this.connectDB()       // let client = await this.connectDB()
        // client.createCollection('velocity_trainer')
        let databasesList = await client.db().admin().listDatabases()
        console.log("Databases:")
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));

        await client.close()
        console.log('Done with connection...')
        return databasesList.databases
    }
    async getCollections() {
        let client = await this.connectDB()
        this.createCollection(db.db_collection)
        let collections = await client.db(this.db_target)
            .listCollections()
            .toArray()
        client.close()
        return collections
    }
    async getCollection() {
        let client = await this.connectDB()
        var myDb = client.db(this.db_target)
        let myCollection = myDb.collection(this.db_collection)
        return myCollection
    }
    async listCollectionValues() {
        let client = await this.connectDB()
        var myDb = client.db(this.db_target)
        let myCollection = myDb.collection(String(this.db_collection))
        let cll = await myCollection.find().toArray()
        return cll
    }
    async dropCollection(get_collection_function) {
        // get_collection_function.drop()
    }
    async createCollection(new_collection_name) {
        dbo.createCollection(new_collection_name, function (err, res) {
            if (err) throw err;
            console.log("Collection created!");
            db.close();
        });
    }
    exit(kill_collection) {
        kill_collection.close()
    }
}

export {
    db_connection,
    live_url,
    local_url,
}






