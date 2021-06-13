import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {signIn, signInWithGoogle, signInWithGitHub} from '../helpers/auth'

export default class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            error: null,
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    async handleSubmit(event){
        event.preventDefault()
        this.setState({error: ''})
        try{
            await signIn(this.state.email, this.state.password)
        }catch(error){
            this.setState({error: error.message})
        }
    }
    async googleSignIn(){
      try{
        await signInWithGoogle()
      }catch(error){
        this.setState({error:error.message})
      }
    }
    async githubSignIn(){
      try{
        await signInWithGitHub()
      }catch(error){
        this.setState({error: error.message})
      }
    }
    render(){
      return(
        <div>
      <form
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <h1>
          Login to
          <Link to="/">
            Chatty
          </Link>
        </h1>
        <p>
          Fill in the form below to login to your account.
        </p>
        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
        </div>
        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
            type="password"
          />
        </div>
        <div className='form-group'>
          {this.state.error ?(
            <p className="text-danger">{this.state.error}</p>
          ):null}
          <button className='btn btn-primary px-5' type='submit'>Login</button>
        </div>
        <p>You can also login with any of these services</p>
        <button className='btn btn-danger mr-2' type='button' onClick={this.googleSignIn}>
          Sign in with Google
        </button>
        <button className='btn btn-danger mr-2' type='button' onClick={this.githubSignIn}>
          Sign in with Github
        </button>
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
      )
    }
}