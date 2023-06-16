const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

const connectToDB = () => {
  return mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const initializeDatabase = async () => {
    try {
        const collections = ['estates', 'houses', 'rents', 'tenants', 'chat', 'admin'];
    
        for (const collection of collections) {
          const collectionExists = await mongoose.connection.db.listCollections({ name: collection }).hasNext();
    
          if (!collectionExists) {
            await mongoose.connection.db.createCollection(collection);
            console.log(`Collection ${collection} created`);
          } else {
            console.log(`Collection ${collection} already exists`);
          }
        }
    
        console.log('Database initialized');
      } catch (error) {
        console.error('Failed to initialize database', error);
      }
    };
module.exports = {
  connectToDB,
  initializeDatabase,
};