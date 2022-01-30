import mongoose from "mongoose"

// Connet to the mongodb database
dbConnect().catch(err => console.log(err))

let db = {}

async function dbConnect() {
  await mongoose.connect("mongodb://localhost:27017/info_upload")
  console.log("connected to the database!")

  const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    favorite_ice_cream: String
  })

  db.User = mongoose.model('User', userSchema)

  console.log("created db schemas and models")
}

export default db;