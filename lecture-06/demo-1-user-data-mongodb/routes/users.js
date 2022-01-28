import express from 'express';
import {promises as fs} from "fs"
import mongoose from "mongoose"
var router = express.Router();

// Connet to the mongodb database
dbConnect().catch(err => console.log(err))

let User;

async function dbConnect() {
  await mongoose.connect("mongodb://localhost:27017/info_upload")
  console.log("connected to the database!")

  const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    favorite_ice_cream: String
  })

  User = mongoose.model('User', userSchema)

  console.log("created db schemas and models")
}


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUserData', async function(req, res, next) {
  try{
    console.log(req.body)

    const newUser = new User({
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
  let allUsers = await User.find()

  res.type("json")
  res.send(allUsers)
})

export default router;
