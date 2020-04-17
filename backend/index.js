const express = require("express");
const app = express();
// app is an express request handler, but socket.io requires an http.Server instance, so we need to create that
const server = app.listen(5000, () => console.log("listening on port 5000"));
const io = require("socket.io").listen(server);

let listOfRooms = [];

function findIfRoomExists(room){
    for (let i = 0; i < listOfRooms.length; i++){
        if (listOfRooms[i].name === room) return listOfRooms[i];
    }
    return null;
}

io.on("connection", socket => {    
    console.log("new user connected!");

    // create a new namespace with user input or join if namespace already exists
    socket.on("join", data => {
        /*
        const room = findIfRoomExists(data.name);
        if (room){
            const nsp = room.room;
            nsp.emit("exist", {message: `${data.name} already exists`})
            return;
        }*/

        socket.join(data.name);
        socket.emit("welcome", {name: data.name})
        /*
        const nsp = io.of(data.name);
        nsp.emit("welcome", {message: `welcome to ${data.name} chat room`, name: data.name})
        listOfRooms.push({name: data.name, room: nsp});
        */
    })

    // maybe do nsp.emit and nsp.on
    // listen for when a client sends a new message
    socket.on("message", data => {
        // emit to all sockets connected to the server room that there was a new message
        console.log(data);
        //io.sockets.in(data.name).emit("message", data);
        //socket.to(data.name).emit("message", data)
        io.in(data.name).emit("message", data);
    })

    socket.on("disconnect", () => {
        console.log("user disconnected");
        // remove the socket from the room

    });
})
