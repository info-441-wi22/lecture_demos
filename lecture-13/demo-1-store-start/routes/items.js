import mongoose from "mongoose";
import express from 'express';
var router = express.Router();

main().catch(err => console.log(err));

let Item;

async function main() {
  //Run mongo db locally with a command like:
  // Windows: 
  //    mongod.exe --dbpath="c:\code\mongodbData\testdb"
  // Mac: 
  //    brew services start mongodb-community@5.0
  await mongoose.connect('mongodb://localhost:27017/store');
  console.log("connected to mongodb");

  //TODO: Add schemas and models
}


// get json data for all users
router.get('/', async function(req, res, next) {
  res.json([]);
});

router.post('/saveCart', async function(req, res, next) {
  res.json({status: "success"})
})


router.get('/getCart', async function(req, res, next) {
  res.json([])
})



export default router;
