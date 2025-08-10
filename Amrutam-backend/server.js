// server.js
// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

// Or more explicitly:
app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the ingredient routes
const ingredientRouter = require('./routes/ingredientRoutes');
app.use('/api/ingredients', ingredientRouter);
const authRouter = require('./routes/authRoutes'); // <-- ADD THIS
app.use('/api/auth', authRouter); // <-- ADD THIS

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Database');
    // Start listening for requests only after the DB connection is successful
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
module.exports=app