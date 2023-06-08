const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function connectToDB() {
    try{
        await client.connect();
        console.log('Connected to MongoDB');
    }catch (error) {
        console.error('Failed to connect Mongo', error);
    }

}

connectToDB();

module.exports = client;