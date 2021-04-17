import React from 'react'
import MainNote from './components/Note';
import SignIn from './components/SignUp'
import SignUp from './components/SignIn'
import Header from './components/Header'
import './App.css';

let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'heroku url here'
}


 export default function App(){
  
    return (
    <div className="App">
      <Header />
      <SignIn />
      <SignUp />
      <MainNote />
    </div>
  );
}


