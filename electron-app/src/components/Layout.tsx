import SideBar from './Sidebar';
import Channelspannel from './ChannelsPannel';
import MainArea from './MainArea';

const Layout = () => {
    return (
        <div className="flex h-screen">
            <SideBar></SideBar>
            <Channelspannel></Channelspannel>
            <MainArea></MainArea>

        </div>
    )
}

export default Layout