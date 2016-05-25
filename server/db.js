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

// create table IF NOT EXISTS ridestats (
//    username VARCHAR(100) NOT NULL,
//    rider_id VARCHAR(250) NOT NULL,
//    distance FLOAT,
//    request_time INT,
//    start_time INT,
//    latitude FLOAT,
//    city VARCHAR(100),
//    longitude FLOAT,
//    end_time INT,
//    request_id VARCHAR(250),
//    product_id VARCHAR(250),
//    PRIMARY KEY (request_id)
// );

module.exports = con;