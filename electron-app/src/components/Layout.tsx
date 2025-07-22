import { useState } from 'react';
import SideBar from './Sidebar';
import ChannelsPanel from './ChannelsPanel';
import MainArea from './MainArea';
import { Channel } from '../types/channel';
import { Server } from '../types/server';
import FriendsPanel from './FriendsPannel';

const Layout = () => {

    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
    const [selectedServer, setSelectedServer] = useState<Server | null>(null);
    return (


        <div className="flex h-screen">
            {/* Sidebar with servers and channels */}
            <SideBar
                selectedServer={selectedServer}
                onServerSelect={setSelectedServer}/>
            {selectedServer === null ? <FriendsPanel /> : <ChannelsPanel
                activeChannel={activeChannel}
                onChannelSelect={setActiveChannel}
                server={selectedServer}
            />}
            <MainArea channel={activeChannel} />
        </div>
    )
}

export default Layout