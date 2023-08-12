import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import './Input.scss'
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

function Input() {
    const [text, setText] = useState('');
    const [img, setImg] = useState<File | null>(null);

    const currentUser = useAuth();
    const data = useChat().data;

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuidv4());
            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on("state_changed", null,   
                () => { null }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateDoc(doc(db, 'chats', data.chatId), {
                            messages: arrayUnion({
                                id: uuidv4(),
                                text,
                                senderId: currentUser!.uid,
                                time: Timestamp.now(),
                                image: downloadURL
                            })
                        })
                    });
                },
            );
        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderId: currentUser!.uid,
                    time: Timestamp.now(),
                })
            })
        }

        await updateDoc(doc(db, 'userChats', currentUser!.uid), {
            [data.chatId + '.lastMessage']: { text },
            [data.chatId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
            [data.chatId + '.lastMessage']: { text },
            [data.chatId + '.date']: serverTimestamp(),
        });

        setText('');
        setImg(null);
    }

    return (
        <div className="input-wrapper">
            <div className='text-input-wrapper'>
                <input onKeyDown={ (e) => e.key == 'Enter' ? handleSend() : null } onChange={ (e) => setText(e.target.value) } className='chat-input' value={text} type="text" placeholder='Message'/>
                <img onClick={ handleSend } className='send-icon' src="src/assets/send-alt-1-svgrepo-com.svg" alt="" />
            </div>
            <input onChange={ (e) => setImg(e.target.files![0]) } className='file-input' type="file" id="send-file" />
            <label className='send-file' htmlFor="send-file">
                <img className='file-icon' src="src/assets/file-plus-alt-1-svgrepo-com-white.svg" alt="" />
            </label>
        </div>
    );
}

export default Input