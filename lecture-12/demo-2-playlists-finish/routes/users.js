import mongoose from "mongoose";
import express from 'express';
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

router.post('/playlists', async function(req, res, next){
  let userID = req.body.userID
  let title = req.body.title
  let songs = req.body.songs

  let newPlaylist = new req.db.Playlist({
    title: title,
    songs: songs,
    user: userID
  })

  await newPlaylist.save()
  res.json({status: "success"})

})

router.get('/playlists', async function(req, res, next){
  let userID = req.query.userID
  let userPlaylists = await req.db.Playlist.find({user: userID})
  res.json(userPlaylists)
})

export default router;
