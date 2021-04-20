import React, { Component } from 'react'
import MainNote from './components/Note';
import SignInPage from './SignInPage'
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
       isLoggedIn: false,
       currentUser: '',
     }
   }
   setGlobalUser = (bool, username) => {
     this.setState({
       isLoggedIn: bool,
       currentUser: username
     })
    }
    
  render(){
    const isLoggedIn = this.state.isLoggedIn
    return (
    <div className="App">
      {isLoggedIn 
      ?
        <div>
        <Header />
        <MainNote />
        </div>
      :<SignInPage 
      setUser={this.setGlobalUser}
    />
      }
    </div>
  );}
}


