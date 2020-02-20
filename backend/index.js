const express = require("express");
const app = express();
// app is an express request handler, but socket.io requires an http.Server instance, so we need to create that
const server = app.listen(5000, () => console.log("listening on port 5000"));
const io = require("socket.io").listen(server);

io.on("connection", socket => {    
    console.log("new user connected!");

    // listen for when a client sends a new message
    socket.on("message", data => {
        // emit to all sockets connected to the server that there was a new message
        console.log(data);
        io.sockets.emit("message", data);
    })

    socket.on("disconnect", () => console.log("user disconnected"));
})
