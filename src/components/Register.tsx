import './Register.scss';
import { auth, storage, db } from './../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    
    interface AuthError {
        code: string,
        message: string
    }

    const [error, setError] = useState<AuthError | null>(null);
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
                (err) => { 
                    setError({
                        code: err.code,
                        message: err.message
                    });
                }, 
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
        } catch (err: any) {
            setError({
                code: err.code,
                message: err.message
            });
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
                    {error && error.code == 'auth/weak-password' && <span className='error-msg'>Password should be at least 6 characters</span>}
                    {error && error.code == 'auth/email-already-in-use' && <span className='error-msg'>Email already registered</span>}
                    {error && error.code == 'auth/invalid-email' && <span className='error-msg'>Invalid email</span>}
                </form>
                <div>
                    <p>See <Link className='howtouse-link' to={ '/howtouse' }>How to use</Link></p>
                    <p>Already have an account? <Link className='login-link' to={ '/login' }>Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Register