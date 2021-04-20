import React, { Component } from 'react'
import SignIn from './components//SignInPage/SignIn'
import SignUp from './components/SignInPage/SignUp'
import SignInHeader from './components/SignInPage/SignInHeader'
import './App.css';


let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:3003'
} else {
  baseUrl = 'heroku url here'
}

 export default class SignInPage extends Component{
   constructor(props) {
     super(props)
     this.state = {
       isAuthenticated: '',
       currentUser: '',
       signUpState: '',
     }
   }
   setGlobalUser = (isLoggedIn, username) => {
     this.setState({
       isAuthenticated: isLoggedIn,
       currentUser: username
     })
    }
    
  render(){
    return (
    <div className="SignInPage">
      <SignInHeader />
      <SignIn 
        setUser = {this.setGlobalUser}
        signUpState = {this.state.signUpState}
      />
      <SignUp 
        setUser = {this.setGlobalUser}
        signUpState = {this.state.signUpState}
      />
    </div>
  );}
}


//<SignIn />
//<SignUp />