import './App.css'; 
import "./Sidebar.js"
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import { useEffect, useState } from 'react'; 
import Pusher from 'pusher-js';  
import axios from './axios';

function App() {  
  const [messages, setMessages] = useState([]); 
  useEffect(() => { 
    axios.get("/messages/sync").then(response => {
      // console.log(response.data) 
      setMessages(response.data); 
    }); 
  },[]); 
  useEffect(() => {
    const pusher = new Pusher('a6ea09578dbe46deaf84', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      //alert(JSON.stringify(newMessage)); 
      setMessages([...messages,newMessage]); 
    }); 

    return () => {
      channel.unbind_all(); 
      channel.unsubscribe(); 
    }; 
  },[messages]);

  return (
    <div className="app">
      <div className='app__body'>
        <Sidebar />
        <Chat messages={messages} /> 
      </div>
    </div>
  );
}
export default App; 

// import './App.css';
// import Sidebar from './Sidebar';
// import Chat from './Chat';
// import { useEffect, useState } from 'react';
// import Pusher from 'pusher-js';
// import axios from "./axios";

// function App() {
//     const [messages, setMessages] = useState([]);

//     useEffect(function(){
//         axios.get('/messages/sync')
//         .then(response => {
//           console.log(response.data);
//           setMessages(response.data);
//         });
//     },[]);

//     useEffect(function(){
//       const pusher = new Pusher('86aec1aa67be13c68d8e', {
//         cluster: 'mt1'
//       });
  
//       const channel = pusher.subscribe('messages');
//       channel.bind('inserted', function(newMessage) {
//         // alert(JSON.stringify(newMessage));
//         setMessages([...messages,newMessage]);
//       });
//       return function(){
//         channel.unbind_all();
//         channel.unsubscribe();
//       };

//     },[messages]);

//     console.log(messages);

//   return (
//     <div className="app">
//       {/* <h1> Lets build a MERN Whatsapp clone </h1> */}
//       <div className='app__body'>
//         <Sidebar />
//         <Chat messages={messages}/>
//       </div>
      
//     </div>
//   );
// }

// export default App;
