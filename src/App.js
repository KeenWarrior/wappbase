import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
const ENDPOINT = "https://fierce-citadel-75064.herokuapp.com/";

function App() {
  const [response, setResponse] = useState("");
  const [messages, setMessages] = useState([]);

  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [socket, setSocket] = useState();

  return (
    <React.Fragment>
      <button
        onClick={function () {
          const socketVar = socketIOClient(ENDPOINT);
          setSocket(socketVar);

          socketVar.on("connect", (data) => {
            setResponse("connected");
          });

          socketVar.on("message", (payload) => {
            console.log(payload);
          });

        }}
      >
        {response ? response : "Click me"}
      </button>

      <input value={text} onChange={function(event){
        setText(event.target.value);
      }}></input>
      <button onClick={function(){
        socket.emit("message", {text});
      }}>Send</button>
    </React.Fragment>
  );
}

export default App;
