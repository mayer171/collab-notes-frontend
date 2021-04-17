import React, { Component } from 'react'
import MainNote from './components/Note';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Header from './components/Header'
import './App.css';

let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'heroku url here'
}


 export default class App extends Component{
   constructor(props) {
     super(props)
     this.state = {
       currentUser: '',
       isAuthenticated: false,
     }
   }
  render(){
    return (
    <div className="App">
      <Header />
      <SignIn />
      <MainNote />
    </div>
  );}
}


//<SignIn />
//<SignUp />