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

  //Add schemas and models
  const itemSchema = new mongoose.Schema({
    name: String,
    price: Number
  })
  Item = mongoose.model('Item', itemSchema)
}


// get json data for all items
router.get('/', async function(req, res, next) {
  let allItems = await Item.find()
  res.json(allItems);
});

router.post('/saveCart', async function(req, res, next) {
  // body looks like this:
  //[{"itemId":"6217d6fdfecdc9ba998584cb","itemCount":"1"},{"itemId":"6217d757fecdc9ba998584cc","itemCount":"2"}]
  let cartInfo = req.body
  console.log("saving cart infor into session: ", cartInfo)
  req.session.cartInfo = JSON.stringify(cartInfo)
  console.log("session info is now: ", req.session)
  
  res.json({status: "success"})
})

router.get('/getCart', async function(req, res, next) {
  let cartInfo = req.session.cartInfo
  if(!cartInfo){
    res.json([])
    return
  }

  let cartInfoJson = JSON.parse(cartInfo)

  // look up all cart items in the database
  let cartItemsIds = cartInfoJson.map(cartItem => cartItem.itemId)
  // load just those items from the database
  let itemsInfo = await Item.find().where('_id').in(cartItemsIds).exec()

  //combine the cart info with the items info

  // make the itemsInfo look-upable by the id
  let itemsInfoById = {}
  itemsInfo.forEach(itemInfo => {
    itemsInfoById[itemInfo._id] = itemInfo
  })

  // take the cartInfoJson, and to each item, add the name and price
  let combinedCartInfo = cartInfoJson.map(cartItem => {
    cartItem["price"] = itemsInfoById[cartItem.itemId].price
    cartItem["name"] = itemsInfoById[cartItem.itemId].name
    return cartItem
  })

  res.json(combinedCartInfo)
})



export default router;
