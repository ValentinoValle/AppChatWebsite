import './Sidebar.scss'
import Navbar from "./Navbar";
import Search from './Search';
import Chats from './Chats';
import { useSidebar } from '../../context/SidebarContext';

function Sidebar() {

    const visibility = useSidebar().visibility;

    return (
        <div className="sidebar" data-visible={visibility}>
            <Navbar />
            <Search />
            <Chats />
        </div>
    );
}

export default Sidebar