import fs from 'fs'
import express from 'express'
import enableWs from 'express-ws'

const app = express()
enableWs(app)

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/index.html")
})

let allWebSockets = [];
let socketCounter = 1;

app.ws('/socket', (ws, res) => {
    let myWebsocketNum = socketCounter
    console.log("websocket connection made, #" + myWebsocketNum)
    ws.send("You just connected as user #: " + myWebsocketNum)
    socketCounter++
    allWebSockets.push(ws)

    ws.on('message', msg => {
        console.log("socket " + myWebsocketNum  + " got message: ", msg)
        allWebSockets.forEach( socket => {
            socket.send(myWebsocketNum + ": " + msg)
        })
    })

    ws.on('close', () => {
        //TODO: remove person from the array
        console.log("websocket " + myWebsocketNum + " has disconnected")
    })

})


app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})