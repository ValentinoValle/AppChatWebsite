import './Navbar.scss'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { useSidebar } from '../../context/SidebarContext';
import crossLogo from '../../assets/cross-svgrepo-com.svg'

function Navbar() {
    const currentUser = useAuth();
    const dispatch = useChat().dispatch;
    const toggleVisibility = useSidebar().toggleVisibility;

    const userSignOut = (auth: any) => {
        signOut(auth);
        dispatch({ type: 'SIGN_OUT' });
    }

    return (
        <div className="navbar-wrapper">
            <div className="user-info">
                <img className='profile-img' src={ currentUser!.photoURL! } alt="" />
                <span className='user-name'>{ currentUser!.displayName }</span>
            </div>
            <button className='logout-btn' onClick={() => userSignOut(auth)}>Logout</button>
            <button className='close-sidebar-btn' onClick={() => toggleVisibility()}>
                <img src={crossLogo} alt="" />
            </button>
        </div>
    );
}

export default Navbar