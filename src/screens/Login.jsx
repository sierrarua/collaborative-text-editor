import React, { Component } from 'react'
import {DocumentList} from './index'

export default class Login extends Component {
  state = {mode: true}

  onChange = (field) => (e) => this.setState({[field]: e.target.value})
  onToggleMode = () => this.setState({mode: !this.state.mode})

  onLogin = () => {
    const {username, password} = this.state
    const {socket, navigate} = this.props

    socket.emit('login', {username, password}, (res) => {
      navigate(DocumentList)
    })
  }

  onRegister = () => {
    const {username, password, password2, name} = this.state
    const {socket, navigate} = this.props

    // TODO: if(password !== password2) return this.setState({validation:'Passwords not the same'})

    socket.emit('register', {username, password, name}, (res) => {
      navigate(DocumentList)
    })
  }

  render() {
    if(this.state.mode) {
      return (<div>
        <h2>Login</h2>
        <label htmlFor="username">Username</label><input id="username" onChange={this.onChange('username')} value={this.state.username}/><br/>
        <label htmlFor="password">Password</label><input id="password" onChange={this.onChange('password')} value={this.state.password}/><br/>
        <button onClick={this.onLogin}>Login</button>
        <button onClick={this.onToggleMode}>Register</button>
      </div>)
    } else {
      return (<div>
        <h2>Register</h2>
        <label htmlFor="name">Name</label><input id="name" onChange={this.onChange('name')} value={this.state.name}/><br/>
        <label htmlFor="username">Username</label><input id="username" onChange={this.onChange('username')} value={this.state.username}/><br/>
        <label htmlFor="password">Password</label><input id="password" onChange={this.onChange('password')} value={this.state.password}/><br/>
        <label htmlFor="password2">Retype Password</label><input id="password2" onChange={this.onChange('password2')} value={this.state.password2}/><br/>
        <button onClick={this.onRegister}>Register</button>
        <button onClick={this.onToggleMode}>Cancel</button>
      </div>)
    }
  }
}
