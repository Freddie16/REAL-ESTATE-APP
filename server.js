const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { connectToDB, initializeDatabase } = require('./db');
// Load environment variables
dotenv.config();

// //connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })

//     .then( () => console.log('Connected to MongoDB'))
//     .catch( (err) => console.error('Mongo connection error:', err));

// // Create Express application
const app = express();
const port = process.env.PORT || 3000;

connectToDB()
  .then( () => {
    initializeDatabase()
      .then(() => {
        app.listen(port, () => {
          console.log(`Server is listening on port ${port}`);
        });
      })
      .catch((error) => {
        console.error('Failed to initialize the database', error);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  })

// Set up middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
const adminRoutes = require('./routes/admin');
const tenantRoutes = require('./routes/tenants');
const rentRoutes = require('./routes/rents');
const chatRoutes = require('./routes/chat');
const estateRoutes = require('./routes/estates');
//const houseRoutes = require('./routes/houses');



app.use('/admin', adminRoutes);
app.use('/tenants', tenantRoutes);
app.use('/rents', rentRoutes);
app.use('/chat', chatRoutes);
app.use('/estates', estateRoutes);
//app.use('/houses', houseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});


