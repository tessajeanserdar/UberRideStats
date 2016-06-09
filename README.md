##About
UberRideStats allows a user to view their Uber history seeing total rides,time, distance and view data by ride type.


##Getting started
To develop locally, just clone the repo down to your machine:

```
git clone https://github.com/tessajeanserdar/UberRideStats.git
```

Next navigate to the root of the repository and run an npm install.  (if you don't have node yet you'll need to get node.js first, probably through brew).

```
npm install
```

You will need to get both Uber API and Pusher keys. Once you have those you can create your own config.js file in your root directory which required by uberDataController.js. Here is on way you could set up your config.js.

```
const config = {};
config.client_id ='YOUR_UBER_CLIENT_ID';
config.client_secret = 'YOUR_UBER_CLIENT_SECRET';
config.server_token =  'YOUR_UBER_SERVER_TOKEN';
config.appId = 'YOUR_PUSHER_APPID';
config.pusherKey = 'YOUR_PUSHER_KEY';
config.pusherSecret =  'YOUR_PUSHER_SECRET';

module.exports = config;
```
