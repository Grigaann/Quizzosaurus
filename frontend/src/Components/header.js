import trice from '../images/trice.png';
import './header.css';

export default function Header() {
    return (
        <header className='header'>
          <ul>
            <img src={trice} className="trice" alt="logo" />
            <h2 id="title">Quizzosaurus</h2>
            <li><a href='/profile'><strong>Profile</strong></a></li>
            <li><a href='/'><strong>ScoreBoard</strong></a></li>
            <li><a href='/'><strong>Quiz</strong></a></li>
            <li><a href='/'><strong>About us</strong></a></li>
            <li><a href='/'><strong>Home</strong></a></li>
          </ul>
        </header>
    );
}
  