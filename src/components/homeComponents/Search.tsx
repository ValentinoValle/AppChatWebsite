import './Search.scss'
import { useState } from 'react';
import { DocumentData, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';

function Search() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<DocumentData | null>(null);
  const [err, setErr] = useState(false);
  
  const currentUser = useAuth();
  const dispatch = useChat().dispatch;

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('displayName', '==', username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(true);
    };
  };

  const handleKey = (e: any) => {
    e.code === 'Enter' && handleSearch();
  }; 


  const handleSelect = async () => {
    if (currentUser!.uid == user!.uid) { return; }
    
    const combinedId = 
      currentUser!.uid > user!.uid
        ? currentUser!.uid + user!.uid
        : user!.uid + currentUser!.uid; 
  
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });
      
        await updateDoc(doc(db, 'userChats', currentUser!.uid), {
          [combinedId + '.userInfo']: {
            uid: user!.uid,
            displayName: user!.displayName,
            photoURL: user!.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        }); 

        await updateDoc(doc(db, 'userChats', user!.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser!.uid,
            displayName: currentUser!.displayName,
            photoURL: currentUser!.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        }); 
      }
      dispatch({ type: 'CHANGE_USER', payload: user})

    } catch (error) { };

    setUser(null);
    setUsername('');
  }

  return (
    <div className='searchbar'>
      <div className='searchbar-container'>
        <input 
        className='searchbar-input'
        onKeyDown={ handleKey }
        onChange={ (e) => setUsername(e.target.value) } 
        aria-label="search" 
        type="search" 
        id="search" 
        placeholder="Search User"
        value={ username }
        />
      </div>
      { err && <span>User not found</span> }
      { user && currentUser!.uid != user!.uid && <div className='user-search' onClick={ handleSelect }>
        <img className='user-img' src={ user.photoURL } alt="" />
        <div>
          <span className="user-name">{ user.displayName }</span>
        </div>
      </div> }
    </div>
  );
}

export default Search