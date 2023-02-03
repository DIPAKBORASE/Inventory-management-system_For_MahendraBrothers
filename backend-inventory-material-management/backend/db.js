var mysql = require('mysql');
var cors = require('cors')
const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "damahe",
  password: "damahe123"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
  app.route('/api/auth', require('./routes/auth'))

  app.listen(port, () => {
    console.log(`inventory management system Webapp listening on port ${port}`)
})
});