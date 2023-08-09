import { useChat } from '../../context/ChatContext';
import { useSidebar } from '../../context/SidebarContext';
import './Chat.scss'
import Input from './Input';
import Messages from './Messages';

function Chat() {
    const data = useChat().data;
    const toggleVisibility = useSidebar().toggleVisibility;

    return (
        <div className="chat">
            <div className="chat-info">
                <button onClick={ () => toggleVisibility() } className='hmbg-menu'><img src="src/assets/hamburger-menu-svgrepo-com.svg" alt="" /></button>
                <img className='user-profile-img' src={data.user.photoURL} alt="" />
                <span>{ data.user.displayName }</span>
                <span className='app-tittle'>AppChat</span>
            </div>
            <div className='chat-messages'>
                <Messages />
                <Input />
            </div>
        </div>
    );
}

export default Chat