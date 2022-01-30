import sqlite3 from 'sqlite3'
const sqlite3v = sqlite3.verbose()
import express from 'express';
var router = express.Router();


//initialize db:
let db = new sqlite3v.Database(':memory:', (err) => {
  if(err) {
    return console.error(err.message)
  }
  console.log("Connected to the in-memory sqlite database")
})

//initialize the tables
db.serialize(() => {
  db.run('CREATE TABLE people(first_name text, last_name text)')
  .run(`INSERT INTO people(first_name, last_name)
        VALUES("Kyle", "Thayer"),
              ("Kyle", "Chandler"),
              ("Jaimie", "Jin"),
              ("Bryan", "Phan")`)

  .run('CREATE TABLE secret_table(message text)')
  .run(`INSERT INTO secret_table(message)
        VALUES('The password for Kyle is: "pa55w0rd"'),
              ('The treasure is hidden on the 5th floor'),
              ('Operation treadstone has been shut down')
  `)
})

// Demo sql injection attack
//source code: SELECT * FROM people WHERE first_name = "${nameSearch}"
//what I want: SELECT * FROM people WHERE first_name = "Kyle" OR 1 = 1 --"
//what my "nameSearch" should be:                       Kyle" OR 1 = 1 --

router.get('/person', function(req, res, next) {
  let nameSearch = req.query.nameSearch
  nameSearch = nameSearch ? nameSearch : ""

  //To fix this, do:
//db.all(`SELECT * FROM people WHERE first_name = ?`, nameSearch, (err, allRows) => {
  db.all(`SELECT * FROM people WHERE first_name = "${nameSearch}"`, (err, allRows) => {
    if(err) {
      console.log("db error: " + err)
      res.send("db error" + err)
    }
    if(!allRows){
      return "";
    }
    let matchingPeople = allRows.map(row => `${row.first_name} ${row.last_name}`).join("\n")
    res.send(matchingPeople);
  })  
});


export default router;
