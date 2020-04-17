import React from "react";
import io_client from "socket.io-client"

let socket;

class Room extends React.Component{
    constructor(){
        super();
    
        this.state = {
          messageList: [],
          message:"",
        }
      }
    
      componentDidMount(){
        const {name} = this.props.match.params;

        // make connection between this client and the server (which is active on port 5000)
        socket = io_client("http://localhost:5000");

        // allow this socket to join the room
        socket.emit("join", {name});
    
        // when receiv welcome, then has joined room, so redirect
        socket.on("welcome", data => {
          console.log(data);
          //this.props.history.push(`/room/${data.name}`)
        })

        // listen for when the server sends a new message that some client sent
        socket.on("message", data => {
          console.log(data);
          // update the message list to include the new message 
          this.setState(prevState => {
            const messageList = prevState.messageList.push(data.message);
            return messageList;
          })
        })
      }
    
      onChange = evt => {
        this.setState({[evt.target.id]:evt.target.value});
      }
    
      sendMsg = evt => {
        evt.preventDefault();
        const {name} = this.props.match.params;
        const newMsg = this.state.message;
      
        // emit message for all users to see this new message
        if (newMsg) socket.emit("message", {message: newMsg, name});
    
        // clear chatbox
        this.setState({message: ""})
      }
    
    render(){
        const {messageList} = this.state;
        const {name} = this.props.match.params;

        return(
            <div>
                <h1 className="title">Welcome to {name} chat room :)</h1>
                <div className="chat">
                {
                    messageList.length > 0 ? messageList.map((msg, indx) => 
                    <div className="message">
                        <p key={indx}>{msg}</p>
                    </div>) : null
                }
                </div>
                <input className="messageText" type="text" id="message" value={this.state.message} onChange={this.onChange}/>
                <button className="btn" onClick={this.sendMsg}>Send</button>
            </div>
        )
    }
}

export default Room;