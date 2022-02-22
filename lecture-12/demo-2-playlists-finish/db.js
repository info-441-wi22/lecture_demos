import mongoose from "mongoose"

// Connet to the mongodb database
dbConnect().catch(err => console.log(err))

let db = {}

async function dbConnect() {
  // Use your Atlas mongodb connection or
  // run mongo db locally with a command like: 
  // Windows: 
  //    mongod.exe --dbpath="C:\data\441db"
  // Mac: 
  //    brew services start mongodb-community@5.0
  await mongoose.connect("mongodb://localhost:27017/playlists")
  console.log("connected to the database!")

  //TODO: set up DB schemas and models
  const userSchema = new mongoose.Schema({
    username: String,
    favorite_bands: [String]
  })
  db.User = mongoose.model("User", userSchema)

  const playlistSchema = new mongoose.Schema({
    title: String,
    songs: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  })
  db.Playlist = mongoose.model("Playlist", playlistSchema)

  console.log("created db schemas and models")
}

export default db;