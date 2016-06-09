const uberController = require ('./controllers/uberDataController');
module.exports = function(app, express){
  app.get('/v1/login', uberController.logInUser);
  app.get('/v1/callback', uberController.authenticateUser);
  app.get('/v1/history',uberController.getUserHistory);
}