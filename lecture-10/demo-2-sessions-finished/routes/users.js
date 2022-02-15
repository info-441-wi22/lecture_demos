import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let session = req.session
  if(session.userid){
    res.send('respond with a resource for the user: ' + session.userid);
  } else {
    res.send('ERROR: You must be logged in to see this information!')
  }
});

router.post("/login", function(req, res, next) {
  let session = req.session

  if(session.userid){
    res.send("Error: You are already logged in as " + session.userid)
    return
  }

  //check username and password
  if(req.body.username == "kylethayer" && req.body.password == "asdasd"){
    session.userid = "kylethayer"
    console.log(session)
    res.send("you logged in")
  } else if(req.body.username == "anotheruser" && req.body.password == "pwd"){
    session.userid = "anotheruser"
    console.log(session)
    res.send("you logged in")
  } else { 
    //not start session
    req.session.destroy()
    res.send("wrong login info")
  }
})

router.post("/logout", function(req, res, next) {
  req.session.destroy()
  res.send("you are logged out")
})

export default router;
