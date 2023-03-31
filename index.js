// to load anything in dotenv in env var
require('dotenv').config();

const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 3001;

//to use req.body
app.use(express.json());
app.use(cors())

//Available Routes
app.use('/', require('./routes/video'))

app.listen(port, () => {
    console.log(`Invoice backend listening on port http://localhost:${port}`)
  })
  