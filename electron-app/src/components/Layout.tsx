import React, { useState } from 'react';
import SideBar from './Sidebar';
import ChannelsPanel from './ChannelsPanel';
import MainArea from './MainArea';
import {Channel} from '../types/channel';
import {Server} from '../types/server';

const Layout = () => {

    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
    const [selectedServer, setSelectedServer] = useState<Server | null>(null);
    return (
        <div className="flex h-screen">
            <SideBar
            selectedServer={selectedServer}
            onServerSelect={setSelectedServer}/>
            <ChannelsPanel
            activeChannel={activeChannel}
            onChannelSelect={setActiveChannel}
            serverId={selectedServer?.id}
            />
            <MainArea channel={activeChannel} />

        </div>
    )
}

export default Layout