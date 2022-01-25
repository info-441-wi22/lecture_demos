import express from 'express';
import {promises as fs} from "fs"
var router = express.Router();

/* GET users listing. */
router.get('/getPterosaurs', async function(req, res, next) {
  const data = await fs.readFile("data/pterosaur.json")
  const dataString = data.toString()
  let pterosaurInfo = JSON.parse(dataString)

  let filteredPterosaurInfo = pterosaurInfo.filter(onePterosaur => {
      if(onePterosaur.img && onePterosaur.img != ""){
        return true;
      } else {
          return false
      }
  })

  res.json(filteredPterosaurInfo);
});

export default router;
