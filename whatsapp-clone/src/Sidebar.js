import React from 'react'; 
import "./Sidebar.css"; 
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge'; 
import ChatIcon from '@mui/icons-material/Chat';
import { Avatar, IconButton} from '@mui/material'; 
import { SearchOutlined } from '@mui/icons-material'; 
import SidebarChat from './SidebarChat';
function Sidebar() {
    return (
      <div className="sidebar"> 
       <div className='sidebar__header'> 
       <Avatar src='Pic_Vijay.jpeg' alt='vijay'/>
         <div className='sidebar__headerRight'> 
           <IconButton>
             <DonutLargeIcon />
           </IconButton> 
           <IconButton>
             <ChatIcon /> 
           </IconButton> 
           <IconButton>
             <MoreVertIcon />
           </IconButton>
         </div>
       </div> 

       <div className='sidebar__search'> 
           <div className='sidebar__searchContainer'>
              <SearchOutlined />  
              <input type="text" placeholder='Search or start new chat' />
           </div>
       </div> 
       <div className='sidebar__chats'>
         <SidebarChat /> 
         <SidebarChat /> 
         <SidebarChat /> 
       </div>
      </div>
    );
  }
   
  export default Sidebar; 
// import React from 'react';
// import "./Sidebar.css";
// import ChatIcon from '@mui/icons-material/Chat';
// import DonutLargeIcon from '@mui/icons-material/DonutLarge';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { Avatar, IconButton } from '@material-ui/core';
// import { SearchOutlined } from '@mui/icons-material';
// import SidebarChat from "./SidebarChat";

// function Sidebar(){
//     return (
//         <div className="sidebar">
//             {/* <h1> I am a Sidebar </h1> */}
//             <div className='sidebar__header'>
//                 <Avatar src='Pic_Vijay.jpeg' alt="pawan" />
//                 {/* <img src='{pic.jpg}'/> */}
//                 <div className='sidebar__headerRight'>
//                    <IconButton>
//                        <DonutLargeIcon />
//                    </IconButton>
//                    <IconButton>
//                        <ChatIcon />
//                    </IconButton>
//                    <IconButton>
//                        <MoreVertIcon />
//                    </IconButton>
//                 </div>
//             </div>
//             <div className='sidebar__search'>
//                 <div className='sidebar__searchContainer'>
//                     <SearchOutlined />
//                     <input placeholder='search or start new chat' type="text" />    
//                 </div>
//             </div>
//             <div className='sidebar__chats'>
//                 <SidebarChat />
//                 <SidebarChat />
//                 <SidebarChat />
//             </div>
//         </div>
//     )
// }

// export default Sidebar;