const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose')
// Load environment variables
dotenv.config();

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  userNewUrlParser: true,
  useUnifiedTopology: true,
})

    .then( () => console.log('Connected to MongoDB'))
    .catch( (err) => console.error('Mongo connection error:', err));

// Create Express application
const app = express();

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



app.use('/admin', adminRoutes);
app.use('/tenants', tenantRoutes);
app.use('/rents', rentRoutes);
app.use('/chat', chatRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});