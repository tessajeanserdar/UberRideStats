const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "ridestats"
});


con.connect(function(err){
  if(err){
    console.log('Error connecting to Db');
    return;
  }
});


module.exports = con;