import './Register.scss';
import { auth, storage, db } from './../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: any) {
        e.preventDefault()
        const userName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            
            const storageRef = ref(storage, userName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed", null,   
                () => { setError(true); }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName: userName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName: userName,
                            email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate('/');
                    });
                },
            );
        } catch (err) {
            setError(true);
        }
    }


    return (
        <div className="register-container">
            <div className="register-wrapper">
                <h1 className="app-tittle">AppChat</h1>
                <h3 className="page">Register</h3>
                <form onSubmit={ handleSubmit } className="form">
                    <div className="form-input-wrapper">
                        <label className='label' htmlFor="name">Name</label>
                        <input className='form-input' type="text" id="name"/>
                    </div>
                    <div className="form-input-wrapper">
                        <label className='label' htmlFor="email">Email</label>
                        <input className='form-input' type="email" id="email"/>
                    </div>
                    <div className="form-input-wrapper">
                        <label className='label' htmlFor="password">Password</label>
                        <input className='form-input' type="password" id="password"/>
                    </div>
                    <div className='file-input-wrapper'>
                        <label htmlFor="file">
                            <img className='file-svg' src="src/assets/file-plus-alt-1-svgrepo-com.svg" alt="" />
                            <span>Add an avatar</span>
                        </label>
                        <input className='file-input' type="file" id="file"/>
                    </div>
                    <button className='signup-btn'>Sign up</button>
                </form>
                <div>
                    <p>Already have an account? <Link className='login-link' to={ '/login' }>Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register