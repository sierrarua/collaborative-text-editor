import React, {Component} from 'react'
import io from 'socket.io-client'
import {
  Login,
  Connecting
} from './screens'

export default class App extends Component {

  state = {
    connecting: true,
    screen: Login
  }

  componentDidMount() {
    this.socket = io('http://localhost:1337')
    this.socket.on('connect', () => this.setState({connecting: null}))
    this.socket.on('disconnect', () => this.setState({connecting: true}))
  }

  navigate = (screen, options) => {
    this.setState({screen, options})
  }

  render() {
    const {navigate, socket, state} = this

    return React.createElement(
      state.connecting ? Connecting : state.screen,
      {socket, navigate, options: state.options})
  }
}
