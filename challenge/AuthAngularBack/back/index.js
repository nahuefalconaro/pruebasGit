const express = require('express')
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config()
const app = express();
const port = process.env.PORT

dbConnection();

//lectura y parseo d body
app.use(express.json())

app.use(express.static('public'))
//cors
app.use(cors());

//rutas
app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})