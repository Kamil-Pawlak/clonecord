import React, { useState } from 'react';
import SideBar from './Sidebar';
import Channelspanel from './ChannelsPanel';
import MainArea from './MainArea';
import {Channel} from '../types/channel';

const Layout = () => {

    const [activeChannel, setActiveChannel] = useState<Channel | null>(null);
    return (
        <div className="flex h-screen">
            <SideBar servers={[{ id: '1', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", title: "placeholder" }
                , { id: '2', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", title: "placeholder" }
                , { id: '3', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", title: "placeholder" }
                , { id: '4', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", title: "placeholder" }
                , { id: '5', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", title: "placeholder" }
            ]}></SideBar>
            <Channelspanel
            activeChannel={activeChannel}
            onChannelSelect={setActiveChannel}
            />
            <MainArea channel={activeChannel} />

        </div>
    )
}

export default Layout