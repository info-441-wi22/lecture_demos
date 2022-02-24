import mongoose from "mongoose";
import express from 'express';
import usersPlaylistRouter from './users/playlists.js';
var router = express.Router();

// Add a user
router.post('/', async function(req, res, next) {
  let username = req.body.name
  let newUser = new req.db.User({
    username: username,
    favorite_bands: []
  })
  let response = await newUser.save()
  res.json({status: "success"});
});

// get json data for all users
router.get('/', async function(req, res, next) {
  let allUsers = await req.db.User.find()
  res.json(allUsers);
});

router.delete('/', async function(req, res, next) {
  let userID = req.body.userID
  await req.db.User.deleteOne({_id: userID})
  await req.db.Playlist.deleteMany({user: userID})
  res.json({status: "success"})
})

router.post('/addBand', async function(req, res, next){
  let userID = req.body.userID
  let bandToAdd = req.body.band
  let user = await req.db.User.findById(userID)
  if(!user.favorite_bands.includes(bandToAdd)){
    user.favorite_bands.push(bandToAdd)
  }
  await user.save()
  res.json({status: "success"})
})


router.use('/playlists', usersPlaylistRouter);

export default router;
