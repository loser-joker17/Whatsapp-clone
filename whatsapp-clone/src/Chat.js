import { AttachFile, MoreVert, SearchOutlined } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import "./Chat.css";
import axios from './axios';

function Chat({ messages }){

    const [input, setInput]= useState('');

    const sendMessage = async (e) =>{
        e.preventDefault();

        await axios.post('/messages/new/',{
            message : input,
            name: "Vijay",
            timestamp: "Just now!",
            received :true
        });

        setInput('');
    };

    return <div className="chat">
        {/* <h1>I am Chat Bar</h1>    */}
            <div className="chat__header">
                <Avatar />
                <div className="chat__headerInfo">
                    <h3>Vikas</h3>
                    <p>Last seen at ...</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                {messages.map((message)=>(
                    <p className={`chat__message ${message.received && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {message.timestamp}
                    </span>
                </p>
                ))}
                
                {/* <p className="chat__message chat__receiver">
                    <span className="chat__name">Vikas</span>
                    This is a message 
                    <span className="chat__timestamp">
                        {new Date().toUTCString()}
                    </span>
                </p> */}
            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>
}

export default Chat;