const connection = require('../db.js');
const uberMethods = require('../lib');
const _ = require('lodash');
const config = require('../../config');
const client_id = config.client_id;
const client_secret = config.client_secret;
const server_token = config.server_token;
const uber = uberMethods.UberInit(client_id,client_secret,server_token);

console.log(uber)
module.exports = {
   logInUser : function(req, res) {
     var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
     console.log(url);
     res.send(url);
   },
   authenticateUser : function(req, res) {
    uber.authorization({
      authorization_code: req.query.code
    }, function(err, access_token, refresh_token) {
      if (err) {
        console.error(err);
      } else {
        res.redirect('http://localhost:3000/#/totals');
      }
    });
  },
  getUserHistory : function(req, res) {
    var currentUser;
    uber.user.getProfile(function (err, res) {
      if (err) {
        console.log(err);
      } else {
        currentUser = res;
        currentUser.username = currentUser.first_name + ' ' + currentUser.last_name;
      }
    });

    function writeDatatoCSV(error, response) {
      var wroteSoFar = response.offset + response.limit;
      if (response.offset + response.limit >= response.count + response.limit) {
         var sql = "select count(request_id) as total_rides,sum(distance) as total_distance,sum((end_time-start_time)/60/60/24) as total_hours_ride,sum((start_time-request_time)/60/60/24) as total_hours_wait from ridestats where username =?"
         connection.query(sql, [currentUser.username], function(err,userHistory) {
            if (err) {
              throw err;
            } else {
              res.send(userHistory);
            }
         });
      } else {

        console.log(Math.floor((response.count - response.offset)/50), "calls remaining")
        var values = _.map(response.history, function(item){
             return [
              currentUser.username,
              currentUser.rider_id,
              item.distance,
              item.request_time,
              item.start_time,
              item.start_city.latitude,
              item.start_city.display_name,
              item.start_city.longitude,
              item.end_time,
              item.request_id,
              item.product_id
             ]
        })

        var sql = "INSERT IGNORE INTO ridestats (username,rider_id,distance,request_time,start_time,latitude,city,longitude,end_time,request_id,product_id) VALUES ?";
        connection.query(sql, [values], function(err) {
            if (err) {
              throw err;
            }
        });
        process.nextTick(function(){
          fetchData(response.offset+response.limit,response.limit,writeDatatoCSV)
        })
      }      
    }
    var fetchData = function (offset,limit,func) {
      uber.user.getHistory(offset, limit, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          func(null,result);
        } 
      });
    };
    fetchData(0,50,writeDatatoCSV);
  }
}