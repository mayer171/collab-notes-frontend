import MainNote from './components/mainNote';
import SignIn from './components/SignUp'
import SignUp from './components/SignIn'
import Header from './components/Header'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <SignIn />
      <SignUp />
      <MainNote />
    </div>
  );
}

export default App;
