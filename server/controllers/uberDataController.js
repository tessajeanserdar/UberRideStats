"use strict";
const connection = require('../db.js');
const uberMethods = require('../lib');
const _ = require('lodash');
const config = require('../../config');
const client_id = config.client_id;
const client_secret = config.client_secret;
const server_token = config.server_token;
const pusherAppId = config.appId;
const pusherKey = config.pusherKey;
const pusherSecret = config.pusherSecret;
const uber = uberMethods.UberInit(client_id,client_secret,server_token);
const Pusher = require('pusher');
  

const logInUser = function(req, res) {
     var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places']);
     res.send(url);
}

const authenticateUser = function(req, res) {
    uber.authorization({
      authorization_code: req.query.code
    }, function(err, access_token, refresh_token) {
      if (err) {
        res.send(err);
      } else {
        res.redirect('http://localhost:3000/#/totals');
      }
    });
}

const pusher = new Pusher({
  appId: pusherAppId,
  key: pusherKey,
  secret: pusherSecret,
  encrypted: true
});  

const formatValsforInsert = function(data,currentUser){
  return _.map(data, function(item){
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
}

const writeUserDataToMySQL = function(res,values){
  let sql = "INSERT IGNORE INTO ridestats (username,rider_id,distance,request_time,start_time,latitude,city,longitude,end_time,request_id,product_id) VALUES ?";
   connection.query(sql, [values], function(err) {
       if (err) {
         res.send(err);
       }
   });
}

const fetchAndPushCurrentData = function(res,currentUser){
  let userData = {}
  let sql = "select username,count(request_id) as total_rides,sum(distance) as total_distance,sum((end_time-start_time)/60/60/24) as total_hours_ride,sum((start_time-request_time)/60/60/24) as total_hours_wait from ridestats where username =? group by 1;"
  connection.query(sql, [currentUser.username], function(err,userMainHistory) {
     if (err) {
       res.send(err);
     } else {
       userData.userOverview = userMainHistory;
       let sql = "select name,image,count(request_id) as total_rides,sum(distance) as total_distance,sum((end_time-start_time)/60/60/24) as total_hours_ride,sum((start_time-request_time)/60/60/24) as total_hours_wait from ridestats r join productNames p on r.product_id = p.product_id where username =? and r.product_id is not null group by 1,2 having total_rides > 1;"
       connection.query(sql, [currentUser.username], function(err,userProductHistory) {
          if (err) {
            res.send(err);
          } else {
            userData.productHistory = userProductHistory;
            pusher.trigger('test_channel', 'my_event', {
              "message": userData
            });
          }
       });
     }
  });
}

const getUserHistory = function(req, res) {

  uber.user.getProfile(function (err, res) {
    if (err) {
      res.send(err);
    } else {
      const currentUser = res;
      currentUser.username = currentUser.first_name + ' ' + currentUser.last_name;
      getAndProcessData(currentUser,pusher,res)
    }
  });  
}
 
const getAndProcessData = function (currentUser,pusher,res) {
 const writeCurrentAndFetchNext = function (error, response) {
   let wroteSoFar = response.offset + response.limit;
   if (wroteSoFar >= response.count + response.limit) {
      return;
   } else {
     let values = formatValsforInsert(response.history,currentUser);
     writeUserDataToMySQL(res,values);
     fetchAndPushCurrentData(res,currentUser);
     process.nextTick(function(){
       fetchUberHistoryData(response.offset+response.limit,response.limit,writeCurrentAndFetchNext)
     })
   }      
 }
 const fetchUberHistoryData = function (offset,limit,func) {
   uber.user.getHistory(offset, limit, function(err, result) {
     if (err) {
       res.send(err);
     } else {
       func(null,result);
     } 
   });
 }

 fetchUberHistoryData(0,50,writeCurrentAndFetchNext);
}

module.exports = {
  logInUser: logInUser,
  authenticateUser : authenticateUser,
  getUserHistory : getUserHistory
}



