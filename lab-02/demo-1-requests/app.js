// TO DO: Get the path of the url passed in
// TO DO: Get the query parameters of the url passed in
// TO DO: Get the url of the request
const express = require('express');
const app = express()


app.get('*', (req, res) => {
    console.log(req.query)
    let query = req.query
    console.log(query.hello);
    console.log(query.hi);
    res.type('txt')
    res.send('you requested the url: ' + req.url)
})


app.listen(3000, () => {
    console.log('Example app listening at http://localhost:3000')
  })