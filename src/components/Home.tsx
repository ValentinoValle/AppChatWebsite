import './Home.scss'
import Chat from "./homeComponents/Chat";
import Sidebar from "./homeComponents/Sidebar";

function Home() {

    return (
        <div className='home-container'>
            <div className='home-wrapper'>
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
}

export default Home