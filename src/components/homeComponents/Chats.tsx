import './Chats.scss'
import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore'
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { useChat } from '../../context/ChatContext';

function Chats() {

    const [chats, setChats] = useState<DocumentData | undefined>([]);

    const currentUser = useAuth();
    const dispatch = useChat().dispatch;

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser!.uid), (doc) => {
                setChats(doc.data());
            });
    
            return () => {
                unsub();
            };
        }
        
        currentUser?.uid && getChats()
    }, [currentUser!.uid])
    
    const handleSelect = (userInfo: any) => {
        dispatch({ type: 'CHANGE_USER', payload: userInfo })
    }

    return (
        <div className='users-wrapper'>
            <h2>Chats</h2>
            { Object.entries(chats!).sort((a, b) => b[1].date - a[1].date).map((chat) => (
                <div className='user' key={ chat[0] } onClick={ () => handleSelect(chat[1].userInfo) }>
                    <img className='user-img' src={ chat[1].userInfo.photoURL } alt="" />
                    <div>
                        <span className="user-name">{ chat[1].userInfo.displayName }</span>
                        <p className='last-msg'>{ chat[1].lastMessage?.text }</p>
                    </div>
                </div>
            )) }
        </div>
    );
}

export default Chats