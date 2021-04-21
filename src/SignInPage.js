import React, { Component } from 'react'
import SignIn from './components//SignInPage/SignIn'
import SignUp from './components/SignInPage/SignUp'
import SignInHeader from './components/SignInPage/SignInHeader'
import './App.css';


export default class SignInPage extends Component{
  constructor(props) {
    super(props)
    this.state = {
      inSignUpState: true,
    }
  }
  

  toggleSignIn = (currentBool) => {
    if(currentBool === true){
      this.setState({
        inSignUpState: false
      })
    } else {
      this.setState({
        inSignUpState: true
    })
  }
}
  
render(){
  return (
  <div className="SignInPage">
    <SignInHeader 
      signInState = {this.state.inSignUpState}
      toggleSignIn = {this.toggleSignIn}
    />
    
      {this.state.inSignUpState 
      ?<SignUp 
        setUser = {this.props.setUser}  
      />
      :<SignIn 
        setUser = {this.props.setUser}  
      />
      }
    
  </div>
);}
}
