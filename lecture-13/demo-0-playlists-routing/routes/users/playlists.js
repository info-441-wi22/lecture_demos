import express from 'express';
var router = express.Router();

router.post('/', async function(req, res, next){
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
  
  router.get('/', async function(req, res, next){
    let userID = req.query.userID
    let userPlaylists = await req.db.Playlist.find({user: userID})
    res.json(userPlaylists)
  })
  

export default router;
