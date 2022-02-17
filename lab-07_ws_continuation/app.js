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
    // added code
    allWebSockets[myWebsocketNum] = {
        socket: ws,
        name: myWebsocketNum
    };
    console.log("websocket connection made, #" + myWebsocketNum)
    socketCounter++

    ws.on('message', msg => {
        // parse the json string that we sent from the client side
        const msgJson = JSON.parse(msg);
        if(msgJson.action == "sendMessage"){
            const myName = allWebSockets[myWebsocketNum].name;
            // We want to broadcast the message to all our active websockets so we can use this handy for loop -> of Object.entries()
            // Key: socketNum Value: socketMsg
            for (const [socketNum, socketMsg] of Object.entries(allWebSockets)) {
              // broadcast that message to all active websockets
              socketMsg.socket.send(myName + ": " + msgJson.value);
            }
        } else if(msgJson.action == "updateName"){
            // update the name
            allWebSockets[myWebsocketNum].name = msgJson.value; 
        }
    })

    ws.on('close', () => {
        delete allWebSockets[socketCounter]; // remove person from the array
        console.log("websocket " + myWebsocketNum + " has disconnected")
    })
})

app.listen(3000, () => {
    console.log("Example app listening at http://localhost:3000")
})

