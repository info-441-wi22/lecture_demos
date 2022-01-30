import express from 'express';
import {promises as fs} from "fs"
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUserData', async function(req, res, next) {
  try{
    console.log(req.body)

    const newUser = new req.db.User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      favorite_ice_cream: req.body.favorite_ice_cream
    })
    await newUser.save()

    res.send("added data");
  } catch(error){
    res.send("error info:" + error)
  }

});

router.get('/getUsers', async function(req, res, next) {
  let allUsers = await req.db.User.find()

  res.type("json")
  res.send(allUsers)
})

export default router;
