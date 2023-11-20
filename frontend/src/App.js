import logo from './Components/logo512.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <img src={logo} className='App-logo' alt="logo"/>
      </div>
      <div className="footer">
        <p>Compete to know who know the most things about dinosaurs !</p>
      </div>
    </div>
  );
}

export default App;
