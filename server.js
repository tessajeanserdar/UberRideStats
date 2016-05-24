var Uber = require('node-uber');
var express = require('express');
var request = require('request');
var connection = require('./db');
var _ = require('lodash');
// var cors = require('cors');


var app = express();
app.use(express.static('public'));
// app.use(cors());
app.listen(process.env.PORT || 3000)


var uber = new Uber({
  client_id: 'qfa9685JhoyhkXKToPtOo5ViSHufieac',
  client_secret: '1Ib94U_m02pgWZnL_jmYheKik5t80ytI3eVg32o5',
  server_token: '8dVsmxZH9Xe8KRPBUONd4s4dsyYpgXZf_70Fegpa',
  // redirect_uri: 'https://hidden-sea-86580.herokuapp.com/api/callback',
  redirect_uri: 'http://localhost:3000/api/callback',
  name: 'RideStats.me',
  language: 'en_US', // optional, defaults to en_US
  // sandbox: true // optional, defaults to false
});

app.get('/', function(req, res) {
  res.send("hello from your uber project")
});

app.get('/api/login', function(req, res) {
  var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
  res.redirect(url);
});

app.get('/api/callback', function(req, res) {
    uber.authorization({
      authorization_code: req.query.code
    }, function(err, access_token, refresh_token) {
      if (err) {
        console.error(err);
      } else {
        res.redirect('/api/history');
      }
    });
});


app.get('/api/history', function(req, res) {

  res.send("user history!")
  // var currentUser;
  // uber.user.getProfile(function (err, res) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     currentUser = res;
  //     currentUser.username = currentUser.first_name + ' ' + currentUser.last_name;
  //   }
  // });

  // function writeDatatoCSV(error, response) {
  //   if (response.offset + response.limit >= response.count) {
  //      var sql = "select count(request_id) as total_rides,sum(distance) as total_distance,sum((end_time-start_time)/60/60/24) as total_hours_ride,sum((start_time-request_time)/60/60/24) as total_hours_wait from ridestats where username =?"
  //      console.log("going to get the users data from the DB")
  //      console.log(sql)
  //      connection.query(sql, [currentUser.username], function(err,userHistory) {
  //         if (err) {
  //           throw err;
  //         } else {
  //           console.log(userHistory)
  //           res.send(userHistory)
  //         }
  //      });
  //   } else {
  //     console.log(Math.floor((response.count - response.offset)/50), "calls remaining")
  //     var values = _.map(response.history, function(item){
  //          return [
  //           currentUser.username,
  //           currentUser.rider_id,
  //           item.distance,
  //           item.request_time,
  //           item.start_time,
  //           item.start_city.latitude,
  //           item.start_city.display_name,
  //           item.start_city.longitude,
  //           item.end_time,
  //           item.request_id,
  //           item.product_id
  //          ]
  //     })
  //     var sql = "INSERT IGNORE INTO ridestats (username,rider_id,distance,request_time,start_time,latitude,city,longitude,end_time,request_id,product_id) VALUES ?";
  //     connection.query(sql, [values], function(err) {
  //         if (err) {
  //           throw err;
  //         }
  //     });
  //     process.nextTick(function(){
  //       fetchData(response.offset+response.limit,response.limit,writeDatatoCSV)
  //     })
  //   }      
  // }
  // var fetchData = function (offset,limit,func) {
  //   uber.user.getHistory(offset, limit, function(err, result) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       func(null,result);
  //     } 
  //   });
  // };

  // fetchData(0,50,writeDatatoCSV);

});
