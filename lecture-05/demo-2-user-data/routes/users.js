import express from 'express';
import {promises as fs} from "fs"
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addUserData', async function(req, res, next) {
  console.log(req.body)

  await fs.writeFile("data/userData.json", JSON.stringify(req.body))
});

export default router;
