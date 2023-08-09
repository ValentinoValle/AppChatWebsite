import './Messages.scss'
import Message from "./Message";
import { useChat } from '../../context/ChatContext';
import { useEffect, useState } from 'react';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

function Messages() {
    const [messages, setMessages] = useState<DocumentData | undefined>([]);
    const data = useChat().data;

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        })
        return () => { unsub() };
    }, [data.chatId])

    return (
        <div className="messages-wrapper">
            { messages!.map((m: any) => (
                <Message message={ m } key={ m.id } />
            )) }
        </div>
    );
}

export default Messages