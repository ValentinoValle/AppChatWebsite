import './HowToUse.scss';
import { Link } from 'react-router-dom';

function HowToUse() {

    return (
        <div className="howToUse-container">
            <div className='howToUse-wrapper'>
                <h2 className='howToUse-tittle'>How To Use</h2>
                <p className='instructions'>In AppChat you can chat with any user that is registered in the app, to do this simply search for a user in the searchbar below your profile picture, click them, and start chatting!</p>
                <Link className='close-btn' to={'/register'}>
                    <img src="src/assets/cross-svgrepo-com.svg" alt="" />
                </Link>
            </div>
        </div>
    )
}

export default HowToUse