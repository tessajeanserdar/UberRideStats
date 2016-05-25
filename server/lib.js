const Uber = require('node-uber');

exports.UberInit = function(client_id,client_secret,server_token){
  return new Uber({
  client_id: client_id,
  client_secret: client_secret,
  server_token: server_token,
  // redirect_uri: 'https://hidden-sea-86580.herokuapp.com/api/callback',
  redirect_uri: 'http://localhost:3000/api/callback',
  name: 'RideStats.me',
  language: 'en_US'
});
}