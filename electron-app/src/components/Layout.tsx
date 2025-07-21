import React, { useState } from 'react';
import SideBar from './Sidebar';
import ChannelsPanel from './ChannelsPanel';
import MainArea from './MainArea';
import { Channel } from '../types/channel';
import { Server } from '../types/server';
import CreateServerModal from './CreateServerModal';
import FriendsPanel from './FriendsPannel';

const Layout = () => {

    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
    const [selectedServer, setSelectedServer] = useState<Server | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (


        <div className="flex h-screen">
            {isModalOpen && <CreateServerModal setIsModalOpen={setIsModalOpen} />}
            <SideBar
                selectedServer={selectedServer}
                onServerSelect={setSelectedServer}
                setIsModalOpen={setIsModalOpen} />
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