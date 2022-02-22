import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let session = req.session
  if(session.isAuthenticated){
    res.send('respond with a resource for the user name: ' + session.account.name + 
    " and username: " + session.account.username);
  } else {
    res.send('ERROR: You must be logged in to see this information!')
  }
});


export default router;
