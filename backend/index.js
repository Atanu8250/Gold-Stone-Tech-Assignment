const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

app.get('/', async (req, res) => {
     res.status(200).send('Home page..');
})


app.listen(process.env.PORT || 8080, async () => {
     try {
          console.log('Server connected successfully.');
          console.log('⏳ DB Connecting...');
          await connectDB;
          console.log('✅ DB Connected');
     } catch (error) {
          console.log('❌ error:', error);
     }
})
