const connectMongoose = require('./db');
var cors = require('cors')
connectMongoose();

const express = require('express')
const app = express()
const port = 5000
app.use(cors())
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log(`VEM Webapp listening on port ${port}`)
})