import  * as fs from 'fs'
import dateFormat from 'dateFormat'
import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.type('html')
  let fileContents = fs.readFileSync("index.html")
  res.send(fileContents)
})

app.get('/style.css', (req, res) => {
  res.type('css')
  let fileContents = fs.readFileSync("style.css")
  res.send(fileContents)
})

app.get('/index.js', (req, res) => {
  res.type('js')
  let fileContents = fs.readFileSync("index.js")
  res.send(fileContents)
})

app.get('/api/getTime', (req, res) => {
  let day = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
  res.type("txt")
  res.send(day)
})

app.listen(3000, () => {
  console.log('Example app listening at http://localhost:3000')
})
