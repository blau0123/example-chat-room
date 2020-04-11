import React from "react";
import io_client from "socket.io-client"

let socket;

class Home extends React.Component{
    constructor(){
        super();
        this.state = {
            roomName:""
        }
    }

    componentDidMount(){
        // make connection between this client and the server (which is active on port 5000)
        socket = io_client("http://localhost:5000");

        // when receiv welcome, then has joined room, so redirect
        socket.on("welcome", data => {
            console.log(data);
            this.props.history.push(`/room/${data.name}`)
        })
    }

    onChange = evt => this.setState({[evt.target.id]: evt.target.value});

    onClick = evt => {
        const {roomName} = this.state;

        // tell socket to create new channel
        socket.emit("join", {name: roomName});
    }

    render(){
        return(
            <div>
                <input onChange={this.onChange} id="roomName" value={this.state.roomName} />
                <button onClick={this.onClick}>Enter</button>
            </div>
        )
    }
}

export default Home;