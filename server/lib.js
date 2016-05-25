const config = require('../.config')
const Uber = require('node-uber');

exports.UberInit = function(client_id,client_secret,server_token){
  return new Uber({
  client_id: 'qfa9685JhoyhkXKToPtOo5ViSHufieac',
  client_secret: '1Ib94U_m02pgWZnL_jmYheKik5t80ytI3eVg32o5',
  server_token: '8dVsmxZH9Xe8KRPBUONd4s4dsyYpgXZf_70Fegpa',
  // redirect_uri: 'https://hidden-sea-86580.herokuapp.com/api/callback',
  redirect_uri: 'http://localhost:3000/api/callback',
  name: 'RideStats.me',
  language: 'en_US', // optional, defaults to en_US
  // sandbox: true // optional, defaults to false
});
}