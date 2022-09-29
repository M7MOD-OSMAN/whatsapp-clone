import React from 'react'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import ChatIcon from '@mui/icons-material/Chat'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { Avatar, IconButton } from '@mui/material'
import SidebarChat from './SidebarChat'
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar src='' />
        <div className='sidebar_headerRight'>
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
      <div className='sidebar-search'>
        <div className='sidebar-searchContainer'>
          <SearchOutlinedIcon style={{ color: 'gray' }} />
          <input type='text' placeholder='search...' />
        </div>
      </div>
      <div className='sidebar-chats'>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  )
}

export default Sidebar
