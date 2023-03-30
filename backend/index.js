const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const formsRouter = require('./routes/forms');
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use('/api', formsRouter);

app.listen(3001, () => {
  console.log('server runs');
});
