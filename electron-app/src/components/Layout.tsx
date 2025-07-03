import SideBar from './Sidebar';
import Channelspanel from './ChannelsPanel';
import MainArea from './MainArea';
import { FaReact } from 'react-icons/fa';

const Layout = () => {
    return (
        <div className="flex h-screen">
            <SideBar servers={[{ id: '1', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", title: "placeholder" }
                , { id: '2', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", title: "placeholder" }
                , { id: '3', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", title: "placeholder" }
                , { id: '4', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", title: "placeholder" }
                , { id: '5', icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", title: "placeholder" }
            ]}></SideBar>
            <Channelspanel></Channelspanel>
            <MainArea></MainArea>

        </div>
    )
}

export default Layout