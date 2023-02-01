const { MongoClient } = require('mongodb');


class Mongo {

    async connectDB(collection_params) {
        return new Promise(async (resolve, reject) => {
            try {
                console.log("initialise client");
                const url = 'mongodb://localhost:27017';
                const client = new MongoClient(url);
                await client.connect();
                const db_mongo = client.db('admin');
                 const collection = db_mongo.collection(collection_params);
                resolve(collection);
            } catch (err) {
                console.log("Error", err);
                reject(err);
            }
        });
    }
}

module.exports = Mongo