import express from 'express';
var router = express.Router();


//initialize db:

//initialize the tables

router.get('/person', function(req, res, next) {
  let matchingPeople = "TODO: look up people in the database"
  res.send(matchingPeople);
});


export default router;
