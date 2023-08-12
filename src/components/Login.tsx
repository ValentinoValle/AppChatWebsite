import './Login.scss'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault()
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/'); 
    } catch (err) {
      setError(true);
    }
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="app-tittle">AppChat</h1>
        <h3 className="page">Login</h3>
        <form className="form" onSubmit={ handleSubmit } >
          <div className="form-input-wrapper">
            <label className='label' htmlFor="email">Email</label>
            <input className='form-input' type="email" name="email" id="email" />
          </div>
          <div className="form-input-wrapper">
            <label className='label' htmlFor="password">Password</label>
            <input className='form-input' type="password" name="password" id="password" />
          </div>
          <button className='submit-btn' type="submit">Sign In</button>
          {error && <span className='error-msg'>Email or password incorrect</span>}
        </form>
        <div>
          <p>Dont have an account? <Link className='register-link' to={ '/register' }>Register</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login