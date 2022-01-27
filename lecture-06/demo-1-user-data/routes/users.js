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

router.get('/getUsers', async function(req, res, next) {
  let userData = await fs.readFile("data/userData.json")
  res.type("json")
  res.send(userData)
})

export default router;
