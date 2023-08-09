import './Message.scss'
import { useAuth } from "../../context/AuthContext";
import { useEffect, useRef } from 'react';

function Message( { message }: any ) {

    const currentUser = useAuth();
    
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])

    return (
        <>
        {message.text && <div ref={ref} className='msg-wrapper'>
            <div className={`img-wrapper ${message.senderId == currentUser!.uid ? 'sender' : 'reciever'}`}>
                {message.image && <img className='sent-img' src={message.image} alt="image" />}
            </div>
            <div className={`msg ${message.senderId == currentUser!.uid ? 'sender' : 'reciever'}`}>
                <p className='msg-text'>{ message.text }</p>
            </div>
        </div>}
        </>
    );
}

export default Message