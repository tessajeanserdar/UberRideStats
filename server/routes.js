var uberController = require ('./controllers/uberDataController');

module.exports = function(app, express){
  app.get('/api/login', uberController.logInUser);
  app.get('/api/callback', uberController.authenticateUser);
  app.get('/api/history',uberController.getUserHistory);
}