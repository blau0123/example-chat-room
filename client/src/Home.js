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
    }

    onChange = evt => this.setState({[evt.target.id]: evt.target.value});

    onClick = evt => {
        const {roomName} = this.state;

        // tell socket to create new channel
        this.props.history.push(`/room/${roomName}`)
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